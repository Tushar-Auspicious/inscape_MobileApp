import notifee from "@notifee/react-native"; // Import Notifee
import Slider from "@react-native-community/slider";
import React, { FC, useEffect, useRef, useState } from "react";
import { usePlayerContext } from "../Context/PlayerContext";
import {
  ActivityIndicator,
  AppState,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import Player, {
  Event,
  State,
  useActiveTrack,
  useIsPlaying,
  useProgress,
  useTrackPlayerEvents,
} from "react-native-track-player";
import { postData } from "../APIService/api";
import ENDPOINTS from "../APIService/endPoints";
import ICONS from "../Assets/icons";
import COLORS from "../Utilities/Colors";
import {
  audioItem,
  downloadFile,
  formatPlayerSeconds,
  saveDownloadedAudio,
} from "../Utilities/Helpers";
import { verticalScale } from "../Utilities/Metrics";
import CustomIcon from "./CustomIcon";

export const useStopPlaybackOnBackground = () => {
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState !== "active") Player.stop();
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => subscription.remove();
  }, []);
};

const TrackPlayer: FC<{
  trackData: audioItem;
  isTrackLoaded?: boolean;
  isDownload?: boolean;
  // We'll keep these props for backward compatibility but use context internally
  handlePreviousTrack?: () => void;
  handleNextTrack?: () => void;
  handleShuffle?: () => void;
  isNextTrackAvailable?: boolean;
  isPreviousTrackAvailable?: boolean;
  shuffleMode?: boolean;
}> = ({
  trackData,
  isTrackLoaded = true,
  isDownload = true,
  // Optional props with fallbacks to context
  handleNextTrack: propHandleNextTrack,
  handlePreviousTrack: propHandlePreviousTrack,
  handleShuffle: propHandleShuffle,
  isNextTrackAvailable: propIsNextTrackAvailable,
  isPreviousTrackAvailable: propIsPreviousTrackAvailable,
  shuffleMode: propShuffleMode = false,
}) => {
  // Use player context
  const {
    skipToNext,
    skipToPrevious,
    toggleShuffle,
    isShuffleEnabled,
    seekTo,
    playPause,
  } = usePlayerContext();
  const { playing } = useIsPlaying();
  const track = useActiveTrack();
  const { position, duration, buffered } = useProgress();

  const [downloading, setDownloading] = useState(false);
  const [playHistoryTracked, setPlayHistoryTracked] = useState(false);
  const trackIdRef = useRef<string | null>(null);
  const [isBuffering, setIsBuffering] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    const fileUrl = track?.url;

    if (!fileUrl) {
      setDownloading(false);
      Toast.show({
        type: "error",
        text1: "Download Failed",
        text2: "Something went wrong",
      });
      return;
    }

    // Extract file extension from URL or default to .mp3
    const urlParts = fileUrl.split(".");
    const extension =
      urlParts.length > 1 ? urlParts.pop()?.toLowerCase() : "mp3";
    const supportedExtensions = ["mp3", "wav", "m4a"]; // Add more if needed
    const fileExt = supportedExtensions.includes(extension!)
      ? extension
      : "mp3";
    const fileName = `${track?.title}.${fileExt}`;

    // Handle notifications based on platform
    try {
      // Request notification permission (iOS)
      await notifee.requestPermission();

      // Create a notification channel (Android) or get iOS options
      let channelId = "";
      let iosOptions = {};

      if (Platform.OS === "android") {
        channelId = await notifee.createChannel({
          id: "download",
          name: "Download Channel",
        });
      } else {
        // iOS specific options
        iosOptions = {
          sound: "default",
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
        };
      }

      // Display initial notification
      const notificationId = await notifee.displayNotification({
        title: "Downloading Audio",
        body: `Starting download for ${track?.title}`,
        android: {
          channelId,
          progress: { max: 100, current: 0 },
          smallIcon: "ic_launcher",
          pressAction: { id: "default" },
        },
        ios: iosOptions,
      });

      try {
        const filePath = await downloadFile(fileUrl, fileName, (progress) => {
          // Update notification progress
          notifee.displayNotification({
            id: notificationId,
            title: "Downloading Audio",
            body:
              Platform.OS === "ios"
                ? `Downloading ${track?.title} (${progress}%)`
                : `Downloading ${track?.title}`,
            android: {
              channelId,
              progress: { max: 100, current: Number(progress) },
            },
            ios: iosOptions,
          });
        });

        if (filePath) {
          // Success notification
          await notifee.displayNotification({
            id: notificationId,
            title: "Download Complete",
            body: `${track?.title} downloaded successfully!`,
            android: { channelId },
            ios: iosOptions,
          });

          if (Platform.OS === "android") {
            Toast.show({
              type: "success",
              text1: "Download Successful",
              text2: `${track?.title} has been downloaded`,
            });
          }

          const normalizedPath =
            Platform.OS === "android" && !filePath.startsWith("file://")
              ? `file://${filePath}`
              : filePath;

          await saveDownloadedAudio(trackData, normalizedPath);
        } else {
          throw new Error("Download failed - no file path returned");
        }
      } catch (error) {
        // Failure notification
        await notifee.displayNotification({
          id: notificationId,
          title: "Download Failed",
          body: `Error downloading ${track?.title}`,
          android: { channelId },
          ios: iosOptions,
        });

        Toast.show({
          type: "error",
          text1: "Download Failed",
          text2:
            error instanceof Error ? error.message : "Unknown error occurred",
        });

        console.error("Download error:", error);
      } finally {
        setTimeout(() => notifee.cancelNotification(notificationId), 3000);
      }
    } catch (error) {
      console.error("Notification error:", error);
      Toast.show({
        type: "error",
        text1: "Notification Error",
        text2: "Could not show download notifications",
      });
    }

    setDownloading(false);
  };

  // Track play history when user plays a track
  const trackPlayHistory = async () => {
    // Get the track ID
    const trackId = trackData.id;

    // Only track if we have a track ID and haven't tracked this session yet
    if (trackId && !playHistoryTracked && trackId !== trackIdRef.current) {
      try {
        await postData(ENDPOINTS.audioHistory, {
          type: "LISTEN",
          audio_id: trackId,
        });
        console.log("Play history tracked for track ID:", trackId);
        setPlayHistoryTracked(true);
        trackIdRef.current = trackId;
      } catch (error) {
        console.log("Error tracking play history:", error);
      }
    }
  };

  useTrackPlayerEvents([Event.PlaybackState], async (event) => {
    if (event.state === State.Ended) {
      Player.seekTo(0);
      Player.pause();
    } else if (event.state === State.Buffering) {
      setIsBuffering(true);
    } else if (event.state === State.Ready) {
      setIsBuffering(false);
    } else if (event.state === State.Playing) {
      // Track play history when the track starts playing
      trackPlayHistory();
    }
  });

  // Reset play history tracking when track changes
  useEffect(() => {
    setPlayHistoryTracked(false);
  }, [trackData.id]);

  // // Make sure the track data is properly set in the player for the MiniPlayer
  // useEffect(() => {
  //   const updateTrackMetadata = async () => {
  //     try {
  //       const currentTrack = await Player.getActiveTrack();

  //       // If the track is already loaded but metadata might be missing
  //       if (currentTrack && currentTrack.id === trackData.id) {
  //         // Update metadata if needed
  //         await Player.updateMetadataForTrack(currentTrack.id, {
  //           artwork: trackData.artwork,
  //           artist: trackData.collectionName || "Unknown",
  //           album: trackData.collectionName || "Unknown",
  //           title: trackData.title,
  //         });
  //       }
  //     } catch (error) {
  //       console.log("Error updating track metadata:", error);
  //     }
  //   };

  //   updateTrackMetadata();
  // }, [trackData]);

  return (
    <View style={{ width: "100%" }}>
      <Slider
        style={styles.container}
        value={position}
        minimumValue={0}
        maximumValue={Platform.OS === "android" ? duration : buffered}
        thumbTintColor={COLORS.darkNavyBlue}
        minimumTrackTintColor={COLORS.darkNavyBlue}
        maximumTrackTintColor={COLORS.lightNavyBlue}
        onSlidingComplete={Player.seekTo}
      />
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{formatPlayerSeconds(position)}</Text>
        <Text style={styles.labelText}>
          {formatPlayerSeconds(Platform.OS === "android" ? duration : duration)}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={handleShuffle}
          style={{
            padding: 5,
            backgroundColor: shuffleMode ? COLORS.darkNavyBlue : "transparent",
            borderRadius: 20,
          }}
        >
          <CustomIcon
            Icon={ICONS.shuffleIcon}
            height={24}
            width={24}
            style={{ color: shuffleMode ? COLORS.white : undefined }}
          />
        </TouchableOpacity>
        <CustomIcon
          onPress={handlePreviousTrack}
          Icon={ICONS.playPreviousIcon}
          height={24}
          width={24}
          disabled={!isPreviousTrackAvailable}
        />
        <TouchableOpacity
          disabled={!isTrackLoaded}
          onPress={() => {
            if (!playing) {
              // Track play history when user manually plays
              trackPlayHistory();
            }
            playing ? Player.pause() : Player.play();
          }}
          style={{
            backgroundColor: COLORS.navyBlue,
            height: 39,
            width: 39,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            opacity: isBuffering ? 0.6 : 1,
          }}
        >
          <CustomIcon
            onPress={() => {
              if (!playing) {
                // Track play history when user manually plays
                trackPlayHistory();
              }
              playing ? Player.pause() : Player.play();
            }}
            disabled={!isTrackLoaded}
            Icon={playing ? ICONS.pauseIcon : ICONS.playIcon}
            height={14}
            width={14}
          />
        </TouchableOpacity>
        <CustomIcon
          onPress={handleNextTrack}
          Icon={ICONS.playNextIcon}
          height={24}
          width={24}
          disabled={!isNextTrackAvailable}
        />
        {downloading ? (
          <ActivityIndicator size={"small"} color={COLORS.white} />
        ) : (
          <TouchableOpacity
            disabled={!isTrackLoaded}
            style={{ opacity: isTrackLoaded ? 1 : 0.5 }}
          >
            <CustomIcon
              onPress={
                isTrackLoaded
                  ? handleDownload
                  : () => {
                      if (!isTrackLoaded) {
                        Toast.show({
                          type: "info",
                          text1: "Track not ready",
                          text2: "Please wait for the track to load completely",
                          position: "bottom",
                        });
                      }
                    }
              }
              Icon={ICONS.downloadIcon}
              height={24}
              width={24}
              disabled={!isTrackLoaded || !isDownload}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TrackPlayer;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: "100%",
    marginTop: verticalScale(10),
    flexDirection: "row",
  },
  labelContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelText: {
    color: "white",
    fontVariant: ["tabular-nums"],
  },
});

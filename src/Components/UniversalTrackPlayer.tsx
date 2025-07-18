import notifee, { EventType } from "@notifee/react-native"; // Import Notifee
import Slider from "@react-native-community/slider";
import React, { FC, useEffect, useState } from "react";
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { useActiveTrack, useProgress } from "react-native-track-player";
import { postData } from "../APIService/api";
import ENDPOINTS from "../APIService/endPoints";
import ICONS from "../Assets/icons";
import { usePlayerContext } from "../Context/PlayerContext";
import COLORS from "../Utilities/Colors";
import {
  audioItem,
  downloadFile,
  formatPlayerSeconds,
  saveDownloadedAudio,
} from "../Utilities/Helpers";
import { verticalScale } from "../Utilities/Metrics";
import CustomIcon from "./CustomIcon";

interface UniversalTrackPlayerProps {
  trackData: audioItem;
  isTrackLoaded?: boolean;
  isDownload?: boolean;
}

const UniversalTrackPlayer: FC<UniversalTrackPlayerProps> = ({
  trackData,
  isTrackLoaded = true,
  isDownload = true,
}) => {
  // Use player context for universal controls
  const {
    isPlaying,
    playPause,
    skipToNext,
    skipToPrevious,
    toggleShuffle,
    isShuffleEnabled,
    seekTo,
    currentTrackIndex,
    currentTrackList,
  } = usePlayerContext();

  const progressWidth = useSharedValue(0);

  const track = useActiveTrack();
  const { position, duration } = useProgress();

  const [downloading, setDownloading] = useState(false);

  const [downloadProgress, setDownloadProgress] = useState(0);

  // Determine if next/previous tracks are available
  const isNextTrackAvailable = currentTrackIndex < currentTrackList.length - 1;
  const isPreviousTrackAvailable = currentTrackIndex > 0;

  // Animated style for progress bar
  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  // Track play history
  const trackPlayHistory = async () => {
    // Get the track ID
    const trackId = trackData.id;

    if (trackId) {
      try {
        await postData(ENDPOINTS.audioHistory, {
          type: "LISTEN",
          audio_id: trackId,
        });
        console.log("Play history tracked for track ID:", trackId);
      } catch (error) {
        console.log("Error tracking play history:", error);
      }
    }
  };

  // Handle download
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
        const filePathResult = await downloadFile(
          fileUrl,
          fileName,
          (progress) => {
            setDownloadProgress(Number(progress));

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
          }
        );

        if (filePathResult && filePathResult.path) {
          const normalizedPath =
            Platform.OS === "android" &&
            !filePathResult.path.startsWith("file://")
              ? `file://${filePathResult.path}`
              : filePathResult.path;

          await saveDownloadedAudio(trackData, normalizedPath);

          // Success notification
          await notifee.displayNotification({
            id: notificationId,
            title: "Download Complete",
            body:
              Platform.OS === "ios"
                ? `${track?.title} downloaded. Click the Library icon to play it.`
                : `${track?.title} downloaded. Click the Library icon to play it.`,
            android: {
              channelId,
              pressAction: {
                id: "open-downloaded-file",
                launchActivity: "default",
              },
            },
            ios: {
              ...iosOptions,
            },
          });

          // Set up a listener for notification press actions
          notifee.onForegroundEvent(({ type, detail }) => {
            if (
              type === EventType.PRESS &&
              detail.pressAction?.id === "open-downloaded-file"
            ) {
              Linking.openURL(normalizedPath)
                .then(() =>
                  console.log("Opened downloaded file:", normalizedPath)
                )
                .catch((err) =>
                  console.error("Failed to open downloaded file:", err)
                );
            }
          });

          if (Platform.OS === "android") {
            Toast.show({
              type: "success",
              text1: "Download Successful",
              text2: `${track?.title} has been downloaded`,
            });
          }
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
        // setTimeout(() => notifee.cancelNotification(notificationId), 3000);
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

  // Handle play/pause with history tracking
  const handlePlayPauseWithHistory = async () => {
    if (!isPlaying) {
      // Track play history when user manually plays
      trackPlayHistory();
    }
    await playPause();
  };

  useEffect(() => {
    if (downloading) {
      progressWidth.value = withRepeat(
        withSequence(
          withTiming(100, { duration: 1000 }),
          withTiming(0, { duration: 1000 })
        ),
        -1
      );
    } else {
      progressWidth.value = withTiming(0);
    }
  }, [downloading]);

  useEffect(() => {
    progressWidth.value = withTiming(downloadProgress, { duration: 200 });
  }, [downloadProgress]);

  return (
    <View style={{ width: "100%" }}>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor={COLORS.navyBlue}
        maximumTrackTintColor={COLORS.darkGrey}
        thumbTintColor={COLORS.navyBlue}
        onSlidingComplete={seekTo}
      />

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatPlayerSeconds(position)}</Text>
        <Text style={styles.timeText}>{formatPlayerSeconds(duration)}</Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={toggleShuffle}
          style={{
            padding: 5,
            backgroundColor: isShuffleEnabled
              ? COLORS.darkNavyBlue
              : "transparent",
            borderRadius: 20,
          }}
        >
          <CustomIcon
            Icon={ICONS.shuffleIcon}
            height={24}
            width={24}
            style={{ color: isShuffleEnabled ? COLORS.white : undefined }}
          />
        </TouchableOpacity>

        <CustomIcon
          onPress={skipToPrevious}
          Icon={ICONS.playPreviousIcon}
          height={24}
          width={24}
          disabled={!isPreviousTrackAvailable}
        />

        <TouchableOpacity
          disabled={!isTrackLoaded}
          onPress={handlePlayPauseWithHistory}
          style={styles.playButton}
        >
          <CustomIcon
            onPress={handlePlayPauseWithHistory}
            disabled={!isTrackLoaded}
            Icon={isPlaying ? ICONS.pauseIcon : ICONS.playIcon}
            height={14}
            width={14}
          />
        </TouchableOpacity>

        <CustomIcon
          onPress={skipToNext}
          Icon={ICONS.playNextIcon}
          height={24}
          width={24}
          disabled={!isNextTrackAvailable}
        />

        <View style={styles.downloadContainer}>
          {downloading && (
            <View style={styles.progressBarBackground}>
              <Animated.View
                style={[styles.progressBar, animatedProgressStyle]}
              />
            </View>
          )}
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
            height={22}
            width={22}
            disabled={!isTrackLoaded || !isDownload}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(10),
  },
  timeText: {
    color: COLORS.white,
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playButton: {
    backgroundColor: COLORS.navyBlue,
    height: 39,
    width: 39,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  downloadContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  downloadButton: {
    padding: 5,
    alignItems: "center",
  },
  progressBarBackground: {
    height: 4,
    width: 24, // Match icon width
    backgroundColor: COLORS.darkGrey,
    borderRadius: 2,
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.navyBlue,
    borderRadius: 2,
  },
});

export default UniversalTrackPlayer;

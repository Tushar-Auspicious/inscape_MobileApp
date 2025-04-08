import notifee from "@notifee/react-native"; // Import Notifee
import Slider from "@react-native-community/slider";
import React, { FC, useEffect, useState } from "react";
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
  handlePreviousTrack: () => void;
  handleNextTrack: () => void;
  handleShuffle: () => void;
  isNextTrackAvailable: boolean;
  isPreviousTrackAvailable: boolean;
  trackData: audioItem;
  isTrackLoaded?: boolean;
  shuffleMode?: boolean;
  isDownload?: boolean;
}> = ({
  handleNextTrack,
  handlePreviousTrack,
  handleShuffle,
  isNextTrackAvailable,
  isPreviousTrackAvailable,
  trackData,
  isTrackLoaded = true,
  shuffleMode = false,
  isDownload = true,
}) => {
  const { playing } = useIsPlaying();
  const track = useActiveTrack();
  const { position, duration, buffered } = useProgress();

  const [downloading, setDownloading] = useState(false);

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
    if (Platform.OS !== "web") {
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

            await saveDownloadedAudio(trackData);
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
    } else {
      // Web platform - simpler download process without notifications
      try {
        const filePath = await downloadFile(fileUrl, fileName, (progress) => {
          console.log(`Download progress: ${progress}%`);
        });

        if (filePath) {
          Toast.show({
            type: "success",
            text1: "Download Successful",
            text2: `${track?.title} has been downloaded`,
          });
          await saveDownloadedAudio(trackData);
        } else {
          throw new Error("Download failed - no file path returned");
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Download Failed",
          text2:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
        console.error("Download error:", error);
      }
    }

    setDownloading(false);
  };

  useTrackPlayerEvents([Event.PlaybackState], async (event) => {
    if (event.state === State.Ended) {
      Player.seekTo(0);
      Player.pause();
    }
  });

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
          onPress={playing ? Player.pause : Player.play}
          style={{
            backgroundColor: COLORS.navyBlue,
            padding: 15,
            borderRadius: 100,
          }}
        >
          <CustomIcon
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

import notifee from "@notifee/react-native"; // Import Notifee
import Slider from "@react-native-community/slider";
import React, { FC, useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
  saveDownloadedAudio,
} from "../Utilities/Helpers";
import { verticalScale } from "../Utilities/Metrics";
import CustomIcon from "./CustomIcon";
import Share from "react-native-share";
import RNFS from "react-native-fs";
import { useAppSelector } from "../Redux/store";
import { getLocalStorageData } from "../Utilities/Storage";
import STORAGE_KEYS from "../Utilities/Constants";

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
  isNextTrackAvailable: boolean;
  isPreviousTrackAvailable: boolean;
  trackData: audioItem;
}> = ({
  handleNextTrack,
  handlePreviousTrack,
  isNextTrackAvailable,
  isPreviousTrackAvailable,
  trackData,
}) => {
  const { playing } = useIsPlaying();
  const track = useActiveTrack();
  const { position, duration, buffered } = useProgress();

  const [downloading, setDownloading] = useState(false);
  const formatPlayerSeconds = useCallback((time: number) => {
    return new Date(time * 1000)
      .toISOString()
      .slice(time >= 3600 ? 11 : 14, 19);
  }, []);

  const handleDownload = async () => {
    setDownloading(true);
    const fileUrl = track?.url;

    if (!fileUrl) {
      setDownloading(false);
      Toast.show({
        type: "error",
        text1: "Download Failed",
        text2: "No audio URL provided",
      });
      return;
    }

    // Extract file extension from URL or default to .mp3
    const urlParts = fileUrl.split(".");
    const extension =
      urlParts.length > 1 ? urlParts.pop()?.toLowerCase() : "mp3";
    const supportedExtensions = ["mp3", "wav"]; // Add more if needed
    const fileExt = supportedExtensions.includes(extension!)
      ? extension
      : "mp3";
    const fileName = `${track?.title}.${fileExt}`;

    // Handle notifications based on platform
    if (Platform.OS !== "web") {
      try {
        // Request notification permission (iOS)
        await notifee.requestPermission();

        // Create a notification channel (Android)
        const channelId = await notifee.createChannel({
          id: "download",
          name: "Download Channel",
        });

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
        });

        try {
          const filePath = await downloadFile(fileUrl, fileName, (progress) => {
            // Update notification progress
            notifee.displayNotification({
              id: notificationId,
              title: "Downloading Audio",
              body: `Downloading ${track?.title}`,
              android: {
                channelId,
                progress: { max: 100, current: Number(progress) },
              },
            });
          });

          if (filePath) {
            // Success notification
            await notifee.displayNotification({
              id: notificationId,
              title: "Download Complete",
              body: `${track?.title} downloaded successfully!`,
              android: { channelId },
            });

            Toast.show({
              type: "success",
              text1: "Download Successful",
              text2: `${track?.title} has been downloaded`,
            });

            console.log("Downloaded file path:", filePath);
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

  const ShareAudioFile = async () => {
    const audioUrl = encodeURI(trackData?.url); // Replace with actual audio file URL
    // Extract file extension from URL or default to .mp3
    const urlParts = audioUrl.split(".");
    const extension =
      urlParts.length > 1 ? urlParts.pop()?.toLowerCase() : "mp3";
    const supportedExtensions = ["mp3", "wav"]; // Add more if needed
    const fileExt = supportedExtensions.includes(extension!)
      ? extension
      : "mp3";
    const fileName = `${track?.title}.${fileExt}`;

    const token = await getLocalStorageData(STORAGE_KEYS.token);

    try {
      // Determine the save path on iOS
      const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      // Check if the file already exists
      const fileExists = await RNFS.exists(downloadDest);
      if (fileExists) {
        Alert.alert("Download", "File already exists at this location.");
        return;
      }

      // Download the file
      const downloadResult = await RNFS.downloadFile({
        fromUrl: audioUrl,
        toFile: downloadDest,
        begin: (res) => {
          console.log("Download has begun");
        },
        headers: {
          Authorization: `Bearer ${token} `, // Example with a Bearer token
          // Or other authentication headers
        },
        progress: (res) => {
          console.log(
            "Download progress:",
            res.bytesWritten / res.contentLength
          );
        },
      }).promise;

      if (downloadResult.statusCode === 200) {
        Alert.alert("Download Successful", `File saved to ${downloadDest}`);
        console.log("File downloaded successfully to:", downloadDest);
      } else {
        Alert.alert(
          "Download Failed",
          `Status code: ${downloadResult.statusCode}`
        );
        console.error("Download failed with status:", downloadResult);
      }
    } catch (error: any) {
      Alert.alert("Download Error", error.message);
      console.error("Download error:", error);
    }
  };

  useTrackPlayerEvents([Event.PlaybackState], async (event) => {
    if (event.state === State.Ended) {
      Player.seekTo(0);
      Player.pause();
    }
  });

  // // Listen for track completion or end of queue
  // useTrackPlayerEvents(
  //   [Event.PlaybackActiveTrackChanged, Event.PlaybackQueueEnded],
  //   async (event) => {
  //     const queue = await Player.getQueue();
  //     const currentTrackIndex = await Player.getActiveTrackIndex();

  //     if (
  //       event.type === Event.PlaybackQueueEnded ||
  //       (event.type === Event.PlaybackActiveTrackChanged &&
  //         currentTrackIndex === queue.length - 1)
  //     ) {
  //       // Stop player and seek to the beginning of the current track
  //       await Player.stop();
  //       if (currentTrackIndex !== null && queue[currentTrackIndex!]) {
  //         await Player.seekTo(0);
  //       }
  //     }
  //   }
  // );

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
        <CustomIcon Icon={ICONS.shuffleIcon} height={24} width={24} />
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
          <CustomIcon
            onPress={Platform.OS === "ios" ? ShareAudioFile : handleDownload}
            Icon={ICONS.downloadIcon}
            height={24}
            width={24}
          />
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

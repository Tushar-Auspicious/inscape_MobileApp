import Slider from "@react-native-community/slider";
import React, { FC, useCallback, useEffect, useState } from "react";
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
import { downloadFile } from "../Utilities/Helpers";
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
}> = ({ handleNextTrack, handlePreviousTrack }) => {
  const { playing } = useIsPlaying();
  const track = useActiveTrack();
  const { position, duration, buffered } = useProgress();

  const [downloading, setDownloading] = useState(false);

  const formatPlayerSeconds = useCallback((time: number) => {
    return new Date(time * 1000).toISOString().slice(14, 19);
  }, []);

  const handleDownload = async () => {
    setDownloading(true);
    const fileUrl = track?.url; // Replace with actual URL
    const fileName = `${track?.title}.mp3`; // File name to save

    if (fileUrl) {
      const filePath = await downloadFile(fileUrl, fileName);
      if (filePath) {
        Toast.show({
          type: "success",
          text1: "Download Successfull",
        });
        console.log("Downloaded file path:", filePath);
        setDownloading(false);
      }
    }
  };

  useTrackPlayerEvents([Event.PlaybackState], async (event) => {
    if (event.state === State.Ended) {
      Player.seekTo(0);
      Player.pause();
    }
  });

  // Listen for track completion or end of queue
  useTrackPlayerEvents(
    [Event.PlaybackActiveTrackChanged, Event.PlaybackQueueEnded],
    async (event) => {
      const queue = await Player.getQueue();
      const currentTrackIndex = await Player.getActiveTrackIndex();

      if (
        event.type === Event.PlaybackQueueEnded ||
        (event.type === Event.PlaybackActiveTrackChanged &&
          currentTrackIndex === queue.length - 1)
      ) {
        // Stop player and seek to the beginning of the current track
        await Player.stop();
        if (currentTrackIndex !== null && queue[currentTrackIndex!]) {
          await Player.seekTo(0);
        }
      }
    }
  );

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
          {formatPlayerSeconds(Platform.OS === "android" ? duration : buffered)}
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
        />
        {downloading ? (
          <ActivityIndicator size={"small"} color={COLORS.white} />
        ) : (
          <CustomIcon
            onPress={handleDownload}
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

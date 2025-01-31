import Slider from "@react-native-community/slider";
import React, { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Player, {
  Event,
  useActiveTrack,
  useIsPlaying,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import ICONS from "../Assets/icons";
import { QueueInitialTracksService } from "../PlayerServices/QueueInitialTrackService";
import { SetupService } from "../PlayerServices/SetupService";
import COLORS from "../Utilities/Colors";
import { verticalScale } from "../Utilities/Metrics";
import CustomIcon from "./CustomIcon";
import { SafeAreaView } from "react-native-safe-area-context";

type TrackPLayerProps = {
  currentTrackName: string;
  currentTrackPath: string;
  nextTrackName?: string;
  nextTrackPath?: string;
  previousTrackName?: string;
  previousTrackPath?: string;
};

export function useSetupPlayer() {
  const [playerReady, setPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      await SetupService();
      if (unmounted) return;
      setPlayerReady(true);
      const queue = await Player.getQueue();
      if (unmounted) return;
      if (queue.length <= 0) {
        await QueueInitialTracksService();
      }
    })();
    return () => {
      unmounted = true;
    };
  }, []);
  return playerReady;
}

const TrackPlayer: FC<TrackPLayerProps> = ({
  previousTrackName,
  previousTrackPath,
  currentTrackName,
  currentTrackPath,
  nextTrackName,
  nextTrackPath,
}) => {
  const { playing, bufferingDuringPlay } = useIsPlaying();

  const [currentTrack, setCurrentTrack] = useState(currentTrackName);
  const { position, duration } = useProgress();

  const handleNextTrack = async () => {
    await Player.reset();
    await Player.add([
      {
        id: "nextTrack",
        url: nextTrackPath!,
        title: nextTrackName,
        artist: "Unknown",
      },
    ]);
    await Player.play();
  };

  const handlePreviousTrack = async () => {
    await Player.reset(); // Clear current track
    await Player.add([
      {
        id: "previousTrack",
        url: previousTrackPath!,
        title: previousTrackName,
        artist: "Unknown",
      },
    ]);
    await Player.play();
  };

  const formatSeconds = (time: number) =>
    new Date(time * 1000).toISOString().slice(14, 19);

  return (
    <View style={{ width: "100%" }}>
      <Slider
        style={styles.container}
        value={position}
        minimumValue={0}
        maximumValue={duration}
        thumbTintColor={COLORS.darkNavyBlue}
        minimumTrackTintColor={COLORS.darkNavyBlue}
        maximumTrackTintColor={COLORS.lightNavyBlue}
        onSlidingComplete={Player.seekTo}
      />
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{formatSeconds(position)}</Text>
        <Text style={styles.labelText}>
          {formatSeconds(Math.max(0, duration - position))}
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
        <CustomIcon Icon={ICONS.downloadIcon} height={24} width={24} />
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

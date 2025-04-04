import React, { FC, useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  Event,
  State,
  useActiveTrack,
  usePlaybackState,
  useTrackPlayerEvents,
} from "react-native-track-player";
import PlayerInstance from "react-native-track-player";
import ICONS from "../../Assets/icons";
import IMAGES from "../../Assets/images";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import { SetupService } from "../../PlayerServices/SetupService";
import { PlayerProps } from "../../Typings/route";
import { hp, verticalScale } from "../../Utilities/Metrics";
import styles from "./style";
import Toast from "react-native-toast-message";
import TrackPlayer from "../../Components/TrackPlayer";
import COLORS from "../../Utilities/Colors";
import { IMAGE_BASE_URL } from "@env";

export function useSetupPlayer() {
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        await SetupService();
        if (isMounted) {
          setPlayerReady(true);
        }
      } catch (error) {
        console.error("Player setup failed:", error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return playerReady;
}

const Player: FC<PlayerProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const isPlayerReady = useSetupPlayer();
  const track = useActiveTrack();
  const playbackState = usePlaybackState();

  const [currentTrackIndex, setCurrentTrackIndex] = useState(
    route.params?.currentTrackIndex || 0
  );
  const [isTrackLoading, setIsTrackLoading] = useState(false); // Renamed for clarity
  const [isTrackLoaded, setIsTrackLoaded] = useState(false); // Track fully loaded and playable
  const trackList = route.params?.trackList || [];
  const [isNextAvailable, setIsNextAvailable] = useState(false);
  const [isPreviousAvailable, setIsPreviousAvailable] = useState(false);

  // Update availability of next and previous tracks
  useEffect(() => {
    setIsNextAvailable(currentTrackIndex < trackList.length - 1);
    setIsPreviousAvailable(currentTrackIndex > 0);
  }, [currentTrackIndex, trackList]);

  // Load a track without playing it
  const loadTrack = useCallback(
    async (index: number) => {
      if (!isPlayerReady || index < 0 || index >= trackList.length) return;

      try {
        setIsTrackLoading(true); // Show loader while loading
        setIsTrackLoaded(false); // Reset loaded state
        setCurrentTrackIndex(index);

        const newTrack = trackList[index];
        console.log("Loading track:", newTrack.url);

        if (!newTrack.url || typeof newTrack.url !== "string") {
          throw new Error("Invalid track URL");
        }

        await PlayerInstance.reset();
        await PlayerInstance.add([newTrack]);
        setIsTrackLoaded(true); // Track is loaded and ready
      } catch (error: any) {
        console.error("Error loading track:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `Failed to load track: ${error.message}`,
        });
        setIsTrackLoaded(false);
      } finally {
        setIsTrackLoading(false); // Hide loader regardless of success/failure
      }
    },
    [isPlayerReady, trackList]
  );

  // Handle next track
  const handleNextTrack = useCallback(() => {
    if (isNextAvailable) {
      loadTrack(currentTrackIndex + 1);
    } else {
      Toast.show({
        type: "error",
        text1: "Sorry",
        text2: "No next track available",
      });
    }
  }, [currentTrackIndex, isNextAvailable, loadTrack]);

  // Handle previous track
  const handlePreviousTrack = useCallback(() => {
    if (isPreviousAvailable) {
      loadTrack(currentTrackIndex - 1);
    } else {
      Toast.show({
        type: "error",
        text1: "Sorry",
        text2: "No previous track available",
      });
    }
  }, [currentTrackIndex, isPreviousAvailable, loadTrack]);

  // Preload the initial track when player is ready
  useEffect(() => {
    if (isPlayerReady && trackList.length > 0 && !isTrackLoaded) {
      loadTrack(currentTrackIndex);
    }
  }, [isPlayerReady, currentTrackIndex, trackList, isTrackLoaded, loadTrack]);

  // Handle track end and queue management
  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackQueueEnded],
    async (event) => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack !== null
      ) {
        setIsTrackLoaded(true);
        console.log("Track loaded successfully");
      } else if (event.type === Event.PlaybackQueueEnded) {
        console.log("Playback queue ended");
        const queue = await PlayerInstance.getQueue();
        const activeTrackIndex = await PlayerInstance.getActiveTrackIndex();

        if (
          activeTrackIndex !== undefined &&
          activeTrackIndex < queue.length - 1
        ) {
          // Next track exists in queue, play it
          setCurrentTrackIndex(activeTrackIndex + 1);
          await PlayerInstance.skip(activeTrackIndex + 1);
          await PlayerInstance.play();
          console.log("Playing next track in queue");
        } else {
          // No next track, seek to 0 and pause
          await PlayerInstance.pause();
          await PlayerInstance.seekTo(0);
          console.log("No next track, paused at start");
        }
      }
    }
  );

  // Ensure playback state is correct
  useEffect(() => {
    const checkPlaybackState = async () => {
      const state = await PlayerInstance.getState();
      if (
        state === State.None &&
        isPlayerReady &&
        trackList.length > 0 &&
        !isTrackLoaded
      ) {
        loadTrack(currentTrackIndex);
      }
    };
    checkPlaybackState();
  }, [isPlayerReady, currentTrackIndex, trackList, isTrackLoaded, loadTrack]);

  // Show loader only while track is loading
  if (isTrackLoading || !isPlayerReady) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.darkBlue,
          alignItems: "center",
          justifyContent: "center",
          minHeight: hp(100),
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  // If no track is loaded yet but not loading, show placeholder or wait for load
  if (!track || !isTrackLoaded) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.darkBlue,
          alignItems: "center",
          justifyContent: "center",
          minHeight: hp(100),
        }}
      >
        <CustomText color={COLORS.white}>Loading track...</CustomText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ImageBackground
        source={{ uri: track?.artwork }}
        imageStyle={styles.imageStyle}
        style={styles.backgroundImage}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backButton, { top: insets.top + verticalScale(20) }]}
      >
        <CustomIcon Icon={ICONS.BackArrow} height={12} width={12} />
      </TouchableOpacity>
      <View style={[styles.playerCont, { bottom: insets.bottom }]}>
        <Image
          source={IMAGES.curvedView}
          style={styles.curvedImage}
          resizeMode="contain"
        />
        <View
          style={{ gap: verticalScale(4), marginBottom: verticalScale(15) }}
        >
          <CustomText color={COLORS.grey}>
            {trackList[currentTrackIndex].collectionName}
          </CustomText>
          <CustomText fontFamily="regular" type="title" color={COLORS.white}>
            {track.title}
          </CustomText>
        </View>
        <CustomText type="default" color={COLORS.darkGrey}>
          {trackList[currentTrackIndex].description}
        </CustomText>
        <TrackPlayer
          handleNextTrack={handleNextTrack}
          handlePreviousTrack={handlePreviousTrack}
          isNextTrackAvailable={isNextAvailable}
          isPreviousTrackAvailable={isPreviousAvailable}
          trackData={{
            artwork: track.artwork!,
            collectionName: trackList[currentTrackIndex].collectionName,
            title: track.title!,
            duration: trackList[currentTrackIndex].duration.toString(),
            description: trackList[currentTrackIndex].description,
            url: IMAGE_BASE_URL + track.url,
            level: trackList[currentTrackIndex].level,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Player;

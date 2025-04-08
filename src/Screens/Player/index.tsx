import React, { FC, useCallback, useEffect, useState } from "react";
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
import Toast from "react-native-toast-message";
import PlayerInstance, {
  Event,
  useActiveTrack,
  useTrackPlayerEvents,
} from "react-native-track-player";
import ICONS from "../../Assets/icons";
import IMAGES from "../../Assets/images";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import TrackPlayer from "../../Components/TrackPlayer";
import { SetupService } from "../../PlayerServices/SetupService";
import { PlayerProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { hp, verticalScale } from "../../Utilities/Metrics";
import styles from "./style";

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

  const { isFromLibrary } = route.params;

  const [currentTrackIndex, setCurrentTrackIndex] = useState(
    route.params?.currentTrackIndex || 0
  );

  const [isTrackLoading, setIsTrackLoading] = useState(false); // Renamed for clarity
  const [isTrackLoaded, setIsTrackLoaded] = useState(false); // Track fully loaded and playable
  const trackList: any = route.params?.trackList || [];
  const [isNextAvailable, setIsNextAvailable] = useState(false);
  const [isPreviousAvailable, setIsPreviousAvailable] = useState(false);
  const [shuffleMode, setShuffleMode] = useState(false);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

  // Update availability of next and previous tracks
  useEffect(() => {
    if (shuffleMode) {
      // In shuffle mode, we can always go next if there are unplayed tracks
      const currentShuffleIndex = shuffledIndices.indexOf(currentTrackIndex);
      setIsNextAvailable(currentShuffleIndex < shuffledIndices.length - 1);
      setIsPreviousAvailable(currentShuffleIndex > 0);
    } else {
      // Normal sequential mode
      setIsNextAvailable(currentTrackIndex < trackList.length - 1);
      setIsPreviousAvailable(currentTrackIndex > 0);
    }
  }, [currentTrackIndex, trackList, shuffleMode, shuffledIndices]);

  // Load a track without playing it
  const loadTrack = useCallback(
    async (index: number) => {
      if (!isPlayerReady || index < 0 || index >= trackList.length) return;

      try {
        setIsTrackLoading(true);
        setIsTrackLoaded(false);
        setCurrentTrackIndex(index);

        const newTrack = trackList[index];

        if (!newTrack || typeof newTrack !== "object") {
          throw new Error("Invalid track object");
        }

        // Validate required fields
        if (!newTrack.url || typeof newTrack.url !== "string") {
          throw new Error("Invalid or missing track URL");
        }
        if (!newTrack.id && !newTrack._id) {
          // Assign a temporary ID if not present
          newTrack.id = `track_${index}`;
        }

        // Create a sanitized track object
        const sanitizedTrack = {
          id: newTrack.id,
          url: newTrack.url,
          title: newTrack.title || "Unknown Track",
          artwork: newTrack.artwork || undefined,
          duration: newTrack.duration || 0,
        };

        await PlayerInstance.reset();
        await PlayerInstance.add([sanitizedTrack]); // Add the sanitized track
        setIsTrackLoaded(true);
      } catch (error: any) {
        console.error("Error loading track:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `Failed to load track: ${error.message}`,
        });
        setIsTrackLoaded(false);
      } finally {
        setIsTrackLoading(false);
      }
    },
    [isPlayerReady, trackList]
  );

  // const loadTrack = useCallback(
  //   async (index: number) => {
  //     if (!isPlayerReady || index < 0 || index >= trackList.length) return;

  //     try {
  //       setIsTrackLoading(true); // Show loader while loading
  //       setIsTrackLoaded(false); // Reset loaded state
  //       setCurrentTrackIndex(index);

  //       const newTrack = trackList[index];

  //       if (!newTrack.url || typeof newTrack.url !== "string") {
  //         throw new Error("Invalid track URL");
  //       }

  //       console.log("Loading track:", newTrack);

  //       await PlayerInstance.reset();
  //       await PlayerInstance.add([newTrack]);
  //       setIsTrackLoaded(true); // Track is loaded and ready
  //     } catch (error: any) {
  //       console.error("Error loading track:", error);
  //       Toast.show({
  //         type: "error",
  //         text1: "Error",
  //         text2: `Failed to load track: ${error.message}`,
  //       });
  //       setIsTrackLoaded(false);
  //     } finally {
  //       setIsTrackLoading(false); // Hide loader regardless of success/failure
  //     }
  //   },
  //   [isPlayerReady, trackList]
  // );

  // Handle next track

  const handleNextTrack = useCallback(() => {
    if (isNextAvailable) {
      if (shuffleMode) {
        // In shuffle mode, get the next track from shuffled indices
        const currentShuffleIndex = shuffledIndices.indexOf(currentTrackIndex);
        if (currentShuffleIndex < shuffledIndices.length - 1) {
          loadTrack(shuffledIndices[currentShuffleIndex + 1]);
        }
      } else {
        // Normal sequential mode
        loadTrack(currentTrackIndex + 1);
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Sorry",
        text2: "No next track available",
      });
    }
  }, [
    currentTrackIndex,
    isNextAvailable,
    loadTrack,
    shuffleMode,
    shuffledIndices,
  ]);

  // Handle previous track
  const handlePreviousTrack = useCallback(() => {
    if (isPreviousAvailable) {
      if (shuffleMode) {
        // In shuffle mode, get the previous track from shuffled indices
        const currentShuffleIndex = shuffledIndices.indexOf(currentTrackIndex);
        if (currentShuffleIndex > 0) {
          loadTrack(shuffledIndices[currentShuffleIndex - 1]);
        }
      } else {
        // Normal sequential mode
        loadTrack(currentTrackIndex - 1);
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Sorry",
        text2: "No previous track available",
      });
    }
  }, [
    currentTrackIndex,
    isPreviousAvailable,
    loadTrack,
    shuffleMode,
    shuffledIndices,
  ]);

  // Shuffle function to randomize track order
  const handleShuffle = useCallback(() => {
    // Toggle shuffle mode
    const newShuffleMode = !shuffleMode;
    setShuffleMode(newShuffleMode);

    if (newShuffleMode) {
      // Create a shuffled array of indices
      const indices = Array.from({ length: trackList.length }, (_, i) => i);

      // Fisher-Yates shuffle algorithm
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }

      // Make sure current track is first in the shuffled list
      const currentIndex = indices.indexOf(currentTrackIndex);
      if (currentIndex > 0) {
        indices.splice(currentIndex, 1);
        indices.unshift(currentTrackIndex);
      }

      setShuffledIndices(indices);

      Toast.show({
        type: "info",
        text1: "Shuffle On",
        text2: "Tracks will play in random order",
        position: "bottom",
      });
    } else {
      // Reset to sequential play
      setShuffledIndices([]);

      Toast.show({
        type: "info",
        text1: "Shuffle Off",
        text2: "Tracks will play in order",
        position: "bottom",
      });
    }
  }, [shuffleMode, trackList.length, currentTrackIndex]);

  // // Preload the initial track when player is ready
  useEffect(() => {
    if (isPlayerReady && trackList.length > 0 && !isTrackLoaded) {
      loadTrack(currentTrackIndex);
    }
  }, [isPlayerReady, currentTrackIndex, trackList, isTrackLoaded, loadTrack]);

  // // Handle track end and queue management
  useTrackPlayerEvents(
    [Event.PlaybackActiveTrackChanged, Event.PlaybackQueueEnded],
    async (event) => {
      if (
        event.type === Event.PlaybackActiveTrackChanged &&
        event.track !== null
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
      try {
        // Use a safer way to check if we need to load a track
        if (isPlayerReady && trackList.length > 0 && !isTrackLoaded) {
          loadTrack(currentTrackIndex);
        }
      } catch (error) {
        console.error("Error checking playback state:", error);
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

  // If no track is loaded yet but not loading, show the player UI with a loading indicator
  // This allows users to see the player UI while the track is loading
  if (!track) {
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText fontFamily="regular" type="title" color={COLORS.white}>
              {track.title}
            </CustomText>
            {!isTrackLoaded && (
              <View style={{ marginLeft: 10 }}>
                <ActivityIndicator size="small" color={COLORS.white} />
              </View>
            )}
          </View>
        </View>
        <CustomText type="default" color={COLORS.darkGrey}>
          {trackList[currentTrackIndex].description}
        </CustomText>
        <TrackPlayer
          handleNextTrack={handleNextTrack}
          handlePreviousTrack={handlePreviousTrack}
          handleShuffle={handleShuffle}
          isNextTrackAvailable={isNextAvailable}
          isPreviousTrackAvailable={isPreviousAvailable}
          isTrackLoaded={isTrackLoaded}
          shuffleMode={shuffleMode}
          trackData={{
            id: track.id,
            artwork: track.artwork!,
            collectionName: trackList[currentTrackIndex].collectionName,
            title: track.title!,
            duration: trackList[currentTrackIndex].duration.toString(),
            description: trackList[currentTrackIndex].description,
            url: track.url,
            level:
              typeof trackList[currentTrackIndex].level === "object"
                ? trackList[currentTrackIndex].level.name
                : trackList[currentTrackIndex].level,
          }}
          isDownload={!isFromLibrary}
        />
      </View>
    </SafeAreaView>
  );
};

export default Player;

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
import { usePlayerContext } from "../../Context/PlayerContext";
import Loader from "../../Components/Loader";
import UniversalTrackPlayer from "../../Components/UniversalTrackPlayer";
import { SetupService } from "../../PlayerServices/SetupService";
import { PlayerProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, hp, verticalScale } from "../../Utilities/Metrics";
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

  // Get player context
  const { loadTrack: contextLoadTrack } = usePlayerContext();

  const { isFromLibrary } = route.params;

  const [currentTrackIndex, setCurrentTrackIndex] = useState(
    route.params?.currentTrackIndex || 0
  );

  const [isTrackLoading, setIsTrackLoading] = useState(false); // Renamed for clarity
  const [isTrackLoaded, setIsTrackLoaded] = useState(false); // Track fully loaded and playable
  const [isImageLoading, setIsImageLoading] = useState(true); // Track background image loading state
  const [playbackError, setPlaybackError] = useState<string | null>(null); // Track playback errors
  const trackList: any = route.params?.trackList || [];

  // Load a track without playing it
  const loadTrack = useCallback(
    async (index: number) => {
      if (!isPlayerReady || index < 0 || index >= trackList.length) return;

      try {
        setIsTrackLoading(true);
        setIsTrackLoaded(false);
        setIsImageLoading(true); // Reset image loading state for new track
        setPlaybackError(null); // Reset any previous playback errors
        setCurrentTrackIndex(index);

        const newTrack = trackList[index];

        if (!newTrack || typeof newTrack !== "object") {
          throw new Error("Invalid track object");
        }

        // Validate required fields
        if (!newTrack.url || typeof newTrack.url !== "string") {
          throw new Error("Invalid or missing track URL");
        }

        // Create a sanitized track object
        const sanitizedTrack = {
          id: newTrack.id || newTrack._id || `track_${index}`,
          url: newTrack.url,
          title: newTrack.title || "Unknown Track",
          artist: newTrack.collectionName || "Unknown Artist",
          artwork: newTrack.artwork || undefined,
          duration: newTrack.duration || 0,
          description: newTrack.description || "",
        };

        // Use context's loadTrack instead of direct TrackPlayer manipulation
        await contextLoadTrack([sanitizedTrack], 0);
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
    [isPlayerReady, trackList, setIsImageLoading]
  );

  // Preload the initial track when player is ready
  useEffect(() => {
    if (isPlayerReady && trackList.length > 0) {
      // Sanitize the entire track list
      const sanitizedTrackList = trackList.map((track, idx) => ({
        id: track.id || `track_${idx}`,
        url: track.url,
        title: track.title || "Unknown Track",
        artist: track.collectionName || "Unknown Artist",
        artwork: track.artwork,
        duration: track.duration || 0,
        description: track.description || "",
        // Preserve original data
        ...track
      }));
      
      // Use the context's loadTrack function
      contextLoadTrack(sanitizedTrackList, currentTrackIndex);
      setIsTrackLoaded(true);
    }
  }, [
    isPlayerReady,
    currentTrackIndex,
    trackList,
    contextLoadTrack,
  ]);

  // // Handle track end and queue management
  useTrackPlayerEvents(
    [Event.PlaybackActiveTrackChanged, Event.PlaybackQueueEnded],
    async (event) => {
      if (
        event.type === Event.PlaybackActiveTrackChanged &&
        event.track !== null
      ) {
        setIsTrackLoaded(true);
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

  // Listen for playback errors
  useTrackPlayerEvents([Event.PlaybackError], (event) => {
    console.error("Playback error:", event);
    setPlaybackError(
      "Failed to play this track. The audio file might be corrupted or unavailable."
    );
  });

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
        setPlaybackError("Failed to load track. Please try again.");
      }
    };
    checkPlaybackState();
  }, [isPlayerReady, currentTrackIndex, trackList, isTrackLoaded]);

  // Show loader only while track is loading
  if (isTrackLoading || !isPlayerReady || !track) {
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
        <Loader />
      </SafeAreaView>
    );
  }

  // Show error message when playback fails
  if (playbackError) {
    return (
      <SafeAreaView
        style={[styles.container, { paddingBottom: insets.bottom }]}
      >
        <View style={styles.errorContainer}>
          <CustomText type="heading" style={styles.errorTitle}>
            Something Went Wrong
          </CustomText>
          <CustomText style={styles.errorMessage}>{playbackError}</CustomText>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setPlaybackError(null);
              loadTrack(currentTrackIndex);
            }}
          >
            <CustomText style={styles.retryButtonText}>Try Again</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: verticalScale(12),
              paddingHorizontal: horizontalScale(30),
              borderRadius: 25,
              borderWidth: 1,
              borderColor: COLORS.white,
            }}
            onPress={() => navigation.goBack()}
          >
            <CustomText style={styles.backButtonText}>Go Back</CustomText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ImageBackground
        source={{ uri: track?.artwork }}
        imageStyle={styles.imageStyle}
        style={[styles.backgroundImage, { opacity: isImageLoading ? 0 : 1 }]}
        onLoadStart={() => setIsImageLoading(true)}
        onLoad={() => setIsImageLoading(false)}
        onError={() => setIsImageLoading(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
      </ImageBackground>

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
            {trackList[currentTrackIndex]?.collectionName}
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
          {trackList[currentTrackIndex]?.description}
        </CustomText>
        <UniversalTrackPlayer
          trackData={{
            id: track.id,
            artwork: track.artwork!,
            collectionName: trackList[currentTrackIndex]?.collectionName,
            title: track.title!,
            duration: trackList[currentTrackIndex]?.duration.toString(),
            description: trackList[currentTrackIndex]?.description,
            url: track.url,
            level:
              typeof trackList[currentTrackIndex]?.level === "object"
                ? trackList[currentTrackIndex]?.level.name
                : trackList[currentTrackIndex]?.level,
          }}
          isTrackLoaded={isTrackLoaded}
          isDownload={!isFromLibrary}
        />
      </View>
    </SafeAreaView>
  );
};

export default Player;

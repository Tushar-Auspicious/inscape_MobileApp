// Player.tsx

import React, { FC, useEffect, useRef, useState } from "react"; // Import useRef
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
  useTrackPlayerEvents,
} from "react-native-track-player";
import ICONS from "../../Assets/icons";
import IMAGES from "../../Assets/images";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import Loader from "../../Components/Loader";
import UniversalTrackPlayer from "../../Components/UniversalTrackPlayer";
import { usePlayerContext } from "../../Context/PlayerContext";
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
          console.log("PlayerSetup: Player ready.");
        }
      } catch (error) {
        console.error("PlayerSetup: Player setup failed:", error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return playerReady;
}

const MIN_LOADING_DURATION = 1000; // milliseconds

const Player: FC<PlayerProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const isPlayerReady = useSetupPlayer();

  const {
    loadTrack: contextLoadTrack,
    currentTrackList,
    currentTrackIndex,
    playbackState,
    playbackError: contextPlaybackError,
  } = usePlayerContext();

  const isFromLibrary = route.params?.isFromLibrary || false;
  const track = useActiveTrack();

  const [isTrackLoading, setIsTrackLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [showForcedLoader, setShowForcedLoader] = useState(false); // New state for forced loader

  // Refs to manage loader timeout
  const loaderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loadingStartTimeRef = useRef<number | null>(null);

  const routeTrackList = route.params?.trackList || [];
  const routeInitialIndex = route.params?.currentTrackIndex || 0;

  const hasLoadedFromRoute = useRef(false);

  // Function to activate the loader with a minimum display time
  const activateForcedLoader = () => {
    setShowForcedLoader(true);
    loadingStartTimeRef.current = Date.now();
    // Clear any existing timeout
    if (loaderTimeoutRef.current) {
      clearTimeout(loaderTimeoutRef.current);
    }
  };

  // Function to deactivate the loader, respecting the minimum display time
  const deactivateForcedLoader = () => {
    if (loadingStartTimeRef.current === null) {
      // If no start time, just deactivate immediately
      setShowForcedLoader(false);
      return;
    }

    const elapsed = Date.now() - loadingStartTimeRef.current;
    if (elapsed < MIN_LOADING_DURATION) {
      // If not enough time has passed, set a timeout
      loaderTimeoutRef.current = setTimeout(() => {
        setShowForcedLoader(false);
        loadingStartTimeRef.current = null;
      }, MIN_LOADING_DURATION - elapsed);
    } else {
      // Enough time has passed, deactivate immediately
      setShowForcedLoader(false);
      loadingStartTimeRef.current = null;
    }
  };

  useEffect(() => {
    if (!isPlayerReady || routeTrackList.length === 0) {
      return;
    }

    const isRouteListDifferent =
      !currentTrackList ||
      currentTrackList.length === 0 ||
      JSON.stringify(currentTrackList.map((t) => t.id)) !==
        JSON.stringify(routeTrackList.map((t) => t.id));

    console.log(
      "Player.tsx useEffect: isRouteListDifferent =",
      isRouteListDifferent
    );
    console.log(
      "Player.tsx useEffect: hasLoadedFromRoute.current =",
      hasLoadedFromRoute.current
    );

    if (!hasLoadedFromRoute.current || isRouteListDifferent) {
      console.log(
        "Player.tsx useEffect: Triggering contextLoadTrack for initial/new route data"
      );
      setIsTrackLoading(true); // Always set true immediately
      setIsImageLoading(true);
      activateForcedLoader(); // Activate the forced loader
      contextLoadTrack(routeTrackList, routeInitialIndex);
      hasLoadedFromRoute.current = true;
    } else {
      // Align `isTrackLoading` with actual playback state if no new list is loaded
      if (
        playbackState === State.Buffering ||
        playbackState === State.Connecting
      ) {
        setIsTrackLoading(true);
      } else {
        setIsTrackLoading(false);
      }
      if (track?.artwork) {
        setIsImageLoading(false);
      }
      deactivateForcedLoader(); // Ensure forced loader is off if not a new list
    }
  }, [
    isPlayerReady,
    routeTrackList,
    routeInitialIndex,
    contextLoadTrack,
    currentTrackList,
    playbackState,
    track,
  ]);

  useTrackPlayerEvents(
    [Event.PlaybackState, Event.PlaybackActiveTrackChanged],
    (event) => {
      if (event.type === Event.PlaybackState) {
        console.log("Player: PlaybackState changed to", event.state);
        switch (event.state) {
          case State.Playing:
          case State.Paused:
          case State.Ready:
            setIsTrackLoading(false);
            deactivateForcedLoader(); // Deactivate forced loader when stable
            break;
          case State.Buffering:
          case State.Connecting:
            setIsTrackLoading(true);
            // Don't activate forced loader here, as it's handled by new list load
            break;
          case State.None:
          case State.Stopped:
          case State.Error:
            setIsTrackLoading(false);
            deactivateForcedLoader(); // Deactivate forced loader on stop/error
            break;
        }
      }
      if (
        event.type === Event.PlaybackActiveTrackChanged &&
        event.track !== null
      ) {
        setIsImageLoading(true); // Always trigger image loading for new track
        if (
          playbackState !== State.Buffering &&
          playbackState !== State.Connecting
        ) {
          setIsTrackLoading(false);
        }
      }
    }
  );

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
      }
    };
  }, []);

  // Show global loader if player isn't ready OR
  // if a track is actively loading/buffering AND no active track is yet available OR
  // if showForcedLoader is true (for new list loading)
  if (!isPlayerReady || (isTrackLoading && !track) || showForcedLoader) {
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

  if (contextPlaybackError) {
    return (
      <SafeAreaView
        style={[styles.container, { paddingBottom: insets.bottom }]}
      >
        <View style={styles.errorContainer}>
          <CustomText type="heading" style={styles.errorTitle}>
            Something Went Wrong
          </CustomText>
          <CustomText style={styles.errorMessage}>
            {contextPlaybackError}
          </CustomText>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              if (currentTrackList.length > 0) {
                setIsTrackLoading(true);
                contextLoadTrack(currentTrackList, currentTrackIndex);
              } else {
                navigation.goBack();
              }
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
              marginTop: verticalScale(10),
            }}
            onPress={() => navigation.goBack()}
          >
            <CustomText style={styles.backButtonText}>Go Back</CustomText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!track) {
    console.warn(
      "Player: No active track available, fallback loader. This should be rare if loading logic is correct."
    );
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

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ImageBackground
        source={{ uri: track?.artwork }}
        imageStyle={styles.imageStyle}
        style={[styles.backgroundImage, { opacity: isImageLoading ? 0 : 1 }]}
        onLoadStart={() => {
          if (track?.artwork) {
            setIsImageLoading(true);
          }
        }}
        onLoad={() => {
          setIsImageLoading(false);
        }}
        onError={(e) => {
          setIsImageLoading(false);
          console.warn(
            "ImageBackground: Error loading artwork for track:",
            track?.title,
            e.nativeEvent.error
          );
        }}
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
            {track?.collectionName || "Unknown Collection"}
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText fontFamily="regular" type="title" color={COLORS.white}>
              {track?.title || "Unknown Title"}
            </CustomText>
            {/* Show activity indicator only if actively buffering/connecting */}
            {isTrackLoading &&
              (playbackState === State.Buffering ||
                playbackState === State.Connecting) && (
                <View style={{ marginLeft: 10 }}>
                  <ActivityIndicator size="small" color={COLORS.white} />
                </View>
              )}
          </View>
        </View>
        <CustomText type="default" color={COLORS.darkGrey}>
          {track?.description || "No description available."}
        </CustomText>
        <UniversalTrackPlayer
          trackData={{
            id: track?.id,
            artwork: track?.artwork!,
            collectionName: track?.collectionName,
            title: track?.title!,
            duration: track?.duration?.toString()!,
            description: track?.description!,
            url: track?.url,
            level: track?.level,
          }}
          isTrackLoaded={
            !!track &&
            playbackState !== State.Buffering &&
            playbackState !== State.Connecting
          }
          isDownload={!isFromLibrary}
        />
      </View>
    </SafeAreaView>
  );
};

export default Player;

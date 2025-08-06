// PlayerContext.tsx

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import TrackPlayer, {
  Event,
  RepeatMode,
  Track as RNTPTrack,
  State,
  usePlaybackState,
  useTrackPlayerEvents,
} from "react-native-track-player";
import { postData } from "../APIService/api";
import ENDPOINTS from "../APIService/endPoints";
import { AppState, PermissionsAndroid, Platform } from "react-native";
import { SetupService } from "../PlayerServices/SetupService";

interface Track {
  id?: string;
  _id?: string;
  url: string;
  title: string;
  artwork?: string;
  duration: number; // Duration in seconds (number)
  description?: string;
  collectionName?: string;
  level?: string;
}

interface PlayerContextType {
  currentTrackList: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  isShuffleEnabled: boolean;
  repeatMode: RepeatMode;
  playbackError: string | null;
  playbackState: State;
  loadTrack: (tracks: Track[], index: number) => Promise<void>;
  playPause: () => Promise<void>;
  skipToNext: () => Promise<void>;
  skipToPrevious: () => Promise<void>;
  toggleShuffle: () => Promise<void>;
  toggleRepeatMode: () => Promise<void>;
  seekTo: (position: number) => Promise<void>;
  playerReady: boolean;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context;
};

const requestNotificationPermission = async () => {
  if (Platform.OS === "android" && Platform.Version >= 33) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: "Notification Permission",
          message: "Allow this app to show notifications?",
          buttonPositive: "OK",
        }
      );
      console.log("Notification permission:", granted);
    } catch (error) {
      console.error("Notification permission error:", error);
    }
  }
};

const useSetupPlayer = () => {
  const [playerReady, setPlayerReady] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    let isMounted = true;
    console.log("useSetupPlayer: Starting player setup");

    const attemptSetup = async () => {
      if (retryCount >= maxRetries) {
        console.log("useSetupPlayer: Max retries reached, aborting");
        if (isMounted) {
          setPlayerReady(false);
        }
        return;
      }

      try {
        console.log("useSetupPlayer: Requesting notification permission");
        await requestNotificationPermission();
        console.log("useSetupPlayer: Checking app state");
        if (AppState.currentState !== "active") {
          console.log("useSetupPlayer: App in background, delaying setup");
          return;
        }
        console.log("useSetupPlayer: Calling SetupService");
        await SetupService();
        if (isMounted) {
          console.log("useSetupPlayer: SetupService completed successfully");
          setPlayerReady(true);
        }
      } catch (error) {
        console.error("useSetupPlayer: Setup failed:", error);
        if (isMounted) {
          setRetryCount((prev) => prev + 1);
          console.log(
            "useSetupPlayer: Retrying setup, attempt",
            retryCount + 1
          );
        }
      }
    };

    attemptSetup();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        nextAppState === "active" &&
        !playerReady &&
        retryCount < maxRetries
      ) {
        console.log("useSetupPlayer: App resumed, retrying setup");
        attemptSetup();
      }
    });

    return () => {
      console.log("useSetupPlayer: Cleaning up");
      isMounted = false;
      subscription.remove();
    };
  }, [retryCount, playerReady]);

  return playerReady;
};

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [currentTrackList, setCurrentTrackList] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isShuffleEnabled, setIsShuffleEnabled] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>(RepeatMode.Off);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [lastPlayedTrackId, setLastPlayedTrackId] = useState<string | null>(
    null
  );

  const playbackState = usePlaybackState();
  const isPlaying = playbackState.state === State.Playing;

  const playerReady = useSetupPlayer();

  // Track playback errors
  useTrackPlayerEvents([Event.PlaybackError], (event) => {
    if (event.type === Event.PlaybackError) {
      setPlaybackError(
        `Failed to play this track: ${
          event.message || "Unknown error"
        }. Please try again.`
      );
    }
  });

  // Track play history AND update currentTrackIndex when active track changes
  useTrackPlayerEvents(
    [
      Event.PlaybackState,
      Event.PlaybackActiveTrackChanged,
      Event.PlaybackQueueEnded,
    ],
    async (event) => {
      // History tracking (only if playing and track ID is new)
      if (event.type === Event.PlaybackState && event.state === State.Playing) {
        const activeTrack = await TrackPlayer.getActiveTrack();
        if (
          activeTrack &&
          activeTrack.id &&
          activeTrack.id !== lastPlayedTrackId
        ) {
          try {
            await postData(ENDPOINTS.audioHistory, {
              type: "LISTEN",
              audio_id: activeTrack.id,
            });
            console.log("Play history tracked for track ID:", activeTrack.id);
            setLastPlayedTrackId(activeTrack.id as string);
          } catch (error) {
            console.log("Error tracking play history:", error);
          }
        }
      }

      // Update currentTrackIndex based on active track change
      if (event.type === Event.PlaybackActiveTrackChanged) {
        if (event.track !== null) {
          const newActiveIndex = await TrackPlayer.getActiveTrackIndex();
          if (
            newActiveIndex !== undefined &&
            newActiveIndex !== currentTrackIndex
          ) {
            console.log(
              `PlayerProvider: Active track changed to index ${newActiveIndex}`
            );
            setCurrentTrackIndex(newActiveIndex);
            setPlaybackError(null); // Clear error on successful track change
          }
        } else {
          console.log(
            "PlayerProvider: PlaybackActiveTrackChanged - track is null (end of queue or stop)"
          );
        }
      }

      // Handle queue ended scenario
      if (event.type === Event.PlaybackQueueEnded) {
        console.log("PlayerProvider: Playback queue ended.");
        await TrackPlayer.pause();
        // Optionally reset index to 0 or leave at the end
        // setCurrentTrackIndex(0);
      }
    }
  );

  // Load track function
  const loadTrack = async (tracks: Track[], index: number) => {
    try {
      setPlaybackError(null); // Clear error at the start of load attempt

      if (!tracks || tracks.length === 0) {
        console.warn("PlayerProvider: No tracks provided to loadTrack.");
        await TrackPlayer.reset();
        setCurrentTrackList([]);
        setCurrentTrackIndex(0);
        return;
      }

      const sanitizedTracks: RNTPTrack[] = tracks.map((trackItem) => ({
        id: trackItem.id || trackItem._id, // Prefer trackItem.id if available
        url: trackItem.url,
        title: trackItem.title || "Unknown Title",
        artwork: trackItem.artwork,
        duration: trackItem.duration,
        collectionName: trackItem.collectionName,
        description: trackItem.description,
        level: trackItem.level,
      })) as RNTPTrack[];

      const currentQueue = await TrackPlayer.getQueue();
      const currentActiveIndex = await TrackPlayer.getActiveTrackIndex();
      const currentActiveTrackId = (await TrackPlayer.getActiveTrack())?.id;

      const targetTrack = sanitizedTracks[index];
      const targetTrackId = targetTrack?.id;

      // Check if the exact queue is already loaded and we just need to skip/play
      const areQueuesIdentical =
        currentQueue.length === sanitizedTracks.length &&
        currentQueue.every(
          (qTrack, i) =>
            qTrack.id === sanitizedTracks[i].id &&
            qTrack.url === sanitizedTracks[i].url
        );

      if (areQueuesIdentical) {
        console.log("PlayerProvider: Queue is identical.");
        if (
          currentActiveIndex === index &&
          currentActiveTrackId === targetTrackId
        ) {
          console.log("PlayerProvider: Same track is already active.");
          // If it's the same track and it's already playing/paused, just ensure play
          if (
            playbackState.state !== State.Playing &&
            playbackState.state !== State.Buffering
          ) {
            await TrackPlayer.play();
          }
          // Update context state only if necessary (e.g., if array reference changed)
          setCurrentTrackList(tracks);
          setCurrentTrackIndex(index);
          return; // Nothing more to do
        } else {
          console.log(
            `PlayerProvider: Queue identical, skipping from ${currentActiveIndex} to ${index}`
          );
          // Queue is the same, but different track needs to be active
          await TrackPlayer.skip(index);
          if (
            playbackState.state !== State.Playing &&
            playbackState.state !== State.Buffering
          ) {
            await TrackPlayer.play();
          }
          setCurrentTrackList(tracks); // Update context list for reference consistency
          // setCurrentTrackIndex will be updated by PlaybackActiveTrackChanged event listener
          return; // Done
        }
      }

      // If queues are different, or currentQueue is empty/invalid, then reset and add
      console.log(
        "PlayerProvider: Queue is different or empty, resetting and adding new queue."
      );
      await TrackPlayer.reset();
      await TrackPlayer.add(sanitizedTracks);
      await TrackPlayer.skip(index);
      await TrackPlayer.play();

      // Update context state AFTER TrackPlayer operations are initiated
      setCurrentTrackList(tracks);
      setCurrentTrackIndex(index); // This will be confirmed by TrackPlayer's event listener shortly
      setLastPlayedTrackId(null); // Reset history tracking for new queue
    } catch (error: any) {
      console.error("Error loading track in PlayerProvider:", error);
      setPlaybackError(
        `Failed to load track: ${error.message || "Unknown error"}.`
      );
      setCurrentTrackList([]);
      setCurrentTrackIndex(0);
      setLastPlayedTrackId(null);
    }
  };

  const playPause = async () => {
    try {
      if (isPlaying) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    } catch (error) {
      console.error("Error toggling play/pause:", error);
      setPlaybackError("Failed to toggle playback. Please try again.");
    }
  };

  const skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
      setLastPlayedTrackId(null); // Reset history tracking for next track
    } catch (error) {
      console.error("Error skipping to next track:", error);
      setPlaybackError("Failed to skip to next track. Please try again.");
    }
  };

  const skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
      setLastPlayedTrackId(null); // Reset history tracking for previous track
    } catch (error) {
      console.error("Error skipping to previous track:", error);
      setPlaybackError("Failed to skip to previous track. Please try again.");
    }
  };

  const toggleShuffle = async () => {
    setIsShuffleEnabled((prev) => !prev);
    console.warn(
      "Shuffle mode toggled, but actual shuffle logic is not yet implemented."
    );
  };

  const toggleRepeatMode = async () => {
    let newMode: RepeatMode;
    if (repeatMode === RepeatMode.Off) {
      newMode = RepeatMode.Track;
    } else if (repeatMode === RepeatMode.Track) {
      newMode = RepeatMode.Queue;
    } else {
      newMode = RepeatMode.Off;
    }
    setRepeatMode(newMode);
    await TrackPlayer.setRepeatMode(newMode);
  };

  const seekTo = async (position: number) => {
    try {
      await TrackPlayer.seekTo(position);
    } catch (error) {
      console.error("Error seeking to position:", error);
      setPlaybackError("Failed to seek track. Please try again.");
    }
  };

  const value = {
    currentTrackList,
    currentTrackIndex,
    isPlaying,
    isShuffleEnabled,
    repeatMode,
    playbackError,
    playbackState: playbackState.state!,
    loadTrack,
    playPause,
    skipToNext,
    skipToPrevious,
    toggleShuffle,
    toggleRepeatMode,
    seekTo,
    playerReady,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import TrackPlayer, { 
  Track, 
  usePlaybackState, 
  State, 
  Event, 
  useTrackPlayerEvents,
  useProgress,
  RepeatMode
} from 'react-native-track-player';
import { postData } from '../APIService/api';
import ENDPOINTS from '../APIService/endPoints';

interface PlayerContextType {
  currentTrackList: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  isShuffleEnabled: boolean;
  repeatMode: RepeatMode;
  playbackError: string | null;
  loadTrack: (tracks: Track[], index: number) => Promise<void>;
  playPause: () => Promise<void>;
  skipToNext: () => Promise<void>;
  skipToPrevious: () => Promise<void>;
  toggleShuffle: () => Promise<void>;
  toggleRepeatMode: () => Promise<void>;
  seekTo: (position: number) => Promise<void>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
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
  const [playHistoryTracked, setPlayHistoryTracked] = useState<boolean>(false);
  const [lastPlayedTrackId, setLastPlayedTrackId] = useState<string | null>(null);
  
  const playbackState = usePlaybackState();
  const isPlaying = playbackState.state === State.Playing;
  
  // Track playback errors
  useTrackPlayerEvents([Event.PlaybackError], (event) => {
    if (event.type === Event.PlaybackError) {
      console.error('Playback error:', event.message);
      setPlaybackError('Failed to play this track. Please try again.');
    }
  });
  
  // Track play history
  useTrackPlayerEvents([Event.PlaybackState], async (event) => {
    if (event.state === State.Playing) {
      const currentTrack = await TrackPlayer.getActiveTrack();
      if (currentTrack && currentTrack.id && currentTrack.id !== lastPlayedTrackId) {
        try {
          await postData(ENDPOINTS.audioHistory, {
            type: "PLAY",
            audio_id: currentTrack.id,
          });
          console.log("Play history tracked for track ID:", currentTrack.id);
          setLastPlayedTrackId(currentTrack.id as string);
        } catch (error) {
          console.log("Error tracking play history:", error);
        }
      }
    }
  });

  // Load track function
  const loadTrack = async (tracks: Track[], index: number) => {
    try {
      setPlaybackError(null);
      
      // Validate inputs
      if (!tracks || tracks.length === 0) {
        console.log('No tracks provided, resetting player');
        await TrackPlayer.reset();
        setCurrentTrackList([]);
        setCurrentTrackIndex(0);
        return;
      }
      
      if (index < 0 || index >= tracks.length) {
        console.error('Invalid track index:', index);
        return;
      }
      
      // Sanitize tracks to ensure they have required fields
      const sanitizedTracks = tracks.map((track, idx) => ({
        id: track.id || `track_${idx}`,
        url: track.url,
        title: track.title || 'Unknown Track',
        artist: track.artist || 'Unknown Artist',
        artwork: track.artwork,
        duration: track.duration || 0,
        description: track.description || '',
        // Preserve any additional metadata
        ...track
      }));
      
      // Reset the queue and add the new tracks
      await TrackPlayer.reset();
      await TrackPlayer.add(sanitizedTracks);
      await TrackPlayer.skip(index);
      
      // Update state
      setCurrentTrackList(sanitizedTracks);
      setCurrentTrackIndex(index);
      setPlayHistoryTracked(false);
      
      // Start playing
      await TrackPlayer.play();
      
    } catch (error) {
      console.error('Error loading track:', error);
      setPlaybackError('Failed to load track. Please try again.');
    }
  };

  // Play/Pause toggle
  const playPause = async () => {
    try {
      if (isPlaying) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    } catch (error) {
      console.error('Error toggling play/pause:', error);
    }
  };

  // Skip to next track
  const skipToNext = async () => {
    try {
      if (currentTrackIndex < currentTrackList.length - 1) {
        await TrackPlayer.skipToNext();
        setCurrentTrackIndex(prev => prev + 1);
        setPlayHistoryTracked(false);
      }
    } catch (error) {
      console.error('Error skipping to next track:', error);
    }
  };

  // Skip to previous track
  const skipToPrevious = async () => {
    try {
      if (currentTrackIndex > 0) {
        await TrackPlayer.skipToPrevious();
        setCurrentTrackIndex(prev => prev - 1);
        setPlayHistoryTracked(false);
      }
    } catch (error) {
      console.error('Error skipping to previous track:', error);
    }
  };

  // Toggle shuffle mode
  const toggleShuffle = async () => {
    setIsShuffleEnabled(prev => !prev);
    // Implement shuffle logic here
  };

  // Toggle repeat mode
  const toggleRepeatMode = async () => {
    const newMode = repeatMode === RepeatMode.Off 
      ? RepeatMode.Track 
      : repeatMode === RepeatMode.Track 
        ? RepeatMode.Queue 
        : RepeatMode.Off;
    
    setRepeatMode(newMode);
    await TrackPlayer.setRepeatMode(newMode);
  };

  // Seek to position
  const seekTo = async (position: number) => {
    try {
      await TrackPlayer.seekTo(position);
    } catch (error) {
      console.error('Error seeking to position:', error);
    }
  };

  const value = {
    currentTrackList,
    currentTrackIndex,
    isPlaying,
    isShuffleEnabled,
    repeatMode,
    playbackError,
    loadTrack,
    playPause,
    skipToNext,
    skipToPrevious,
    toggleShuffle,
    toggleRepeatMode,
    seekTo,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};

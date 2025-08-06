import { useEffect } from "react";
import { AppState } from "react-native";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
} from "react-native-track-player";

export const DefaultRepeatMode = RepeatMode.Off;
export const DefaultAudioServiceBehaviour =
  AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification;

const setupPlayer = async (
  options: Parameters<typeof TrackPlayer.setupPlayer>[0]
) => {
  const setup = async () => {
    try {
      await TrackPlayer.setupPlayer(options);
    } catch (error) {
      return (error as Error & { code?: string }).code;
    }
  };
  while ((await setup()) === "android_cannot_setup_player_in_background") {
    // A timeout will mostly only execute when the app is in the foreground,
    // and even if we were in the background still, it will reject the promise
    // and we'll try again:
    await new Promise<void>((resolve) => setTimeout(resolve, 1));
  }
};

export const useStopPlaybackOnBackground = () => {
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState !== "active") TrackPlayer.stop();
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => subscription.remove();
  }, []);
};

export const SetupService = async () => {
  await setupPlayer({
    autoHandleInterruptions: true,
    // minBuffer: 5, // Minimum buffer in seconds before playback starts
    // maxBuffer: 30, // Maximum buffer to hold (adjust based on needs)
    // playBuffer: 3, // Start playing after 2 seconds of buffering
    // backBuffer: 0, // No back buffer to reduce memory usage
  });
  await TrackPlayer.updateOptions({
    android: {
      appKilledPlaybackBehavior: DefaultAudioServiceBehaviour,
    },
    // This flag is now deprecated. Please use the above to define playback mode.
    // stoppingAppPausesPlayback: true,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.SeekTo,
    ],
    compactCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
    ],
    progressUpdateEventInterval: 2,
  });
  await TrackPlayer.setRepeatMode(DefaultRepeatMode);
};

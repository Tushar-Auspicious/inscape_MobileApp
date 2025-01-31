import TrackPlayer from "react-native-track-player";

import IMAGES from "../Assets/images";

export const QueueInitialTracksService = async (): Promise<void> => {
  await TrackPlayer.add([
    {
      url: "https://samplelib.com/lib/preview/mp3/sample-15s.mp3",
      title: "Test Track",
      artist: "Tushar Thakur",
      artwork: IMAGES.pinkBg,
    },
  ]);
};

import TrackPlayer from "react-native-track-player";

import IMAGES from "../Assets/images";

export type TrackData = {
  url: string;
  title: string;
  artist: string;
  artwork: string;
};

export const QueueInitialTracksService = async (
  trackList: TrackData[] = [
    {
      url: "https://samplelib.com/lib/preview/mp3/sample-15s.mp3",
      title: "Test Track 1",
      artist: "Tushar Thakur",
      artwork: IMAGES.pinkBg,
    },
    {
      url: "https://samplelib.com/lib/preview/mp3/sample-6s.mp3",
      title: "Test Track 555",
      artist: "Tushar Thakur",
      artwork: IMAGES.pinkBg,
    },
  ]
): Promise<void> => {
  await TrackPlayer.add(trackList);
};

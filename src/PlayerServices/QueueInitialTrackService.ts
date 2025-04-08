import TrackPlayer from "react-native-track-player";
import IMAGES from "../Assets/images";

export type TrackData = {
  id?: string;
  url: string;
  title: string;
  collectionName: string;
  artwork: string;
  description: string;
  duration: number;
  level: string;
};

export const QueueInitialTracksService = async (
  trackList: TrackData[] = [
    {
      url: "https://samplelib.com/lib/preview/mp3/sample-15s.mp3",
      title: "Test Track 1",
      collectionName: "Tushar Thakur",
      artwork: IMAGES.pinkBg,
      description: "This is a test track",
      duration: 60,
      level: "Easy",
    },
    {
      url: "https://samplelib.com/lib/preview/mp3/sample-15s.mp3",
      title: "Test Track 555",
      collectionName: "Tushar Thakur",
      artwork: IMAGES.pinkBg,
      description: "This is a test track",
      duration: 60,
      level: "Medium",
    },
  ]
): Promise<void> => {
  const formattedTracks = trackList.map((track) => ({
    ...track,
    duration: Number(track.duration),
  }));

  await TrackPlayer.add(formattedTracks);
};

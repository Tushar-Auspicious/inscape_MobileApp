import React, { FC, useEffect, useState } from "react";
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
import { useActiveTrack } from "react-native-track-player";

import playerInstance from "react-native-track-player";
import ICONS from "../../Assets/icons";
import IMAGES from "../../Assets/images";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import TrackPlayer, {
  useStopPlaybackOnBackground,
} from "../../Components/TrackPlayer";
import { SetupService } from "../../PlayerServices/SetupService";
import { PlayerProps } from "../../Typings/route";
import { verticalScale } from "../../Utilities/Metrics";
import styles from "./style";
import Toast from "react-native-toast-message";

export function useSetupPlayer() {
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      await SetupService();
      if (!isMounted) return;
      setPlayerReady(true);
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

  const [currentTrackIndex, setCurrentTrackIndex] = useState(
    route.params?.currentTrackIndex || 0
  );
  const trackList = route.params?.trackList || [];

  const playTrack = async (index: number) => {
    if (index < 0 || index >= trackList.length) return; // Prevent out-of-bounds errors

    setCurrentTrackIndex(index); // Update index
    const newTrack = trackList[index];

    await playerInstance.reset(); // Reset queue before adding new track
    await playerInstance.add([newTrack]); // Add the new track
    await playerInstance.play(); // Start playing
  };

  const handleNextTrack = () => {
    if (currentTrackIndex < trackList.length - 1) {
      playTrack(currentTrackIndex + 1);
    } else {
      Toast.show({
        type: "error",
        text1: "Sorry",
        text2: "No next track available",
      });
    }
  };

  const handlePreviousTrack = () => {
    if (currentTrackIndex > 0) {
      playTrack(currentTrackIndex - 1);
    } else {
      Toast.show({
        type: "error",
        text1: "Sorry",
        text2: "No previous track available",
      });
    }
  };

  useEffect(() => {
    playTrack(currentTrackIndex);
  }, [currentTrackIndex]);

  useStopPlaybackOnBackground();

  if (!isPlayerReady && !track) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#212121",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100%",
        }}
      >
        <ActivityIndicator />
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
        style={[
          styles.backButton,
          {
            top: insets.top + verticalScale(20),
          },
        ]}
      >
        <CustomIcon Icon={ICONS.BackArrow} height={12} width={12} />
      </TouchableOpacity>
      <View style={[styles.playerCont, { bottom: insets.bottom }]}>
        <Image
          source={IMAGES.curvedView}
          style={styles.curvedImage}
          resizeMode="contain"
        />
        <View style={{ gap: verticalScale(4) }}>
          <CustomText fontFamily="light">{track?.title}</CustomText>
        </View>
        <CustomText fontFamily="semiBold" type="title">
          {track?.artist}
        </CustomText>
        <TrackPlayer
          handleNextTrack={handleNextTrack}
          handlePreviousTrack={handlePreviousTrack}
        />
      </View>
    </SafeAreaView>
  );
};

export default Player;

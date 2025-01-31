import React, { FC } from "react";
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
import ICONS from "../../Assets/icons";
import IMAGES from "../../Assets/images";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import TrackPlayer, { useSetupPlayer } from "../../Components/TrackPlayer";
import { PlayerProps } from "../../Typings/route";
import { verticalScale } from "../../Utilities/Metrics";
import styles from "./style";

const Player: FC<PlayerProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const track = useActiveTrack();
  const isPlayerReady = useSetupPlayer();

  const { artist, img, title } = route.params;

  if (!isPlayerReady) {
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
        source={{ uri: img }}
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
          <CustomText fontFamily="light">{title}</CustomText>
        </View>
        <CustomText fontFamily="semiBold" type="title">
          {artist}
        </CustomText>
        <TrackPlayer
          currentTrackName={title}
          currentTrackPath="https://samplelib.com/lib/preview/mp3/sample-15s.mp3"
        />
      </View>
    </SafeAreaView>
  );
};

export default Player;

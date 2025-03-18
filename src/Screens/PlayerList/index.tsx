import React, { FC, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import {
  default as Player,
  default as TrackPlayer,
  useActiveTrack,
  useIsPlaying,
  useProgress,
} from "react-native-track-player";
import ICONS from "../../Assets/icons";
import IMAGES from "../../Assets/images";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import { TrackList } from "../../Seeds/PlayerTracks";
import { PlayerListProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { getGreeting } from "../../Utilities/Helpers";
import { hp } from "../../Utilities/Metrics";
import { useSetupPlayer } from "../Player";
import styles from "./style";
import { useStopPlaybackOnBackground } from "../../Components/TrackPlayer";

const PlayerList: FC<PlayerListProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { position, duration, buffered } = useProgress();
  const { playing } = useIsPlaying();
  const isPlayerReady = useSetupPlayer();
  const track = useActiveTrack();

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const playTrack = async (index: number) => {
    if (index < 0 || index >= TrackList.length) return; // Prevent out-of-bounds errors

    setCurrentTrackIndex(index); // Update index
    const newTrack = TrackList[index];

    await TrackPlayer.reset(); // Reset queue before adding new track
    await TrackPlayer.add([newTrack]); // Add the new track
    await TrackPlayer.play(); // Start playing
  };

  const handleNextTrack = () => {
    if (currentTrackIndex < TrackList.length - 1) {
      playTrack(currentTrackIndex + 1);
    } else {
      Toast.show({
        type: "error",
        text1: "Oops",
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
        text1: "Oops",
        text2: "No previous track available",
      });
    }
  };

  const handleGoToPLayer = async (track: any) => {
    const trackIndex = TrackList.findIndex((t) => t.id === track.id); // Find index of selected track
    setCurrentTrackIndex(trackIndex); // this is for this page mini player

    navigation.navigate("player", {
      trackList: TrackList, // Pass full TrackList
      currentTrackIndex: trackIndex, // Pass current index
    });
  };

  useStopPlaybackOnBackground();

  if (!isPlayerReady) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.darkBlue,
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
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={[styles.container, { paddingBottom: insets.bottom }]}
    >
      <View
        style={[
          styles.curvedCont,
          {
            bottom: Platform.OS === "ios" ? hp(15) : hp(12),
          },
        ]}
      >
        <Image
          source={IMAGES.curvedView}
          style={styles.topCurvedImage}
          resizeMode="contain"
        />

        <Image
          source={IMAGES.curvedView}
          style={styles.bottomCurvedImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.mainHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <CustomIcon Icon={ICONS.BackArrow} height={12} width={12} />
          </TouchableOpacity>

          <View style={styles.headerTextCont}>
            <CustomText type="subHeading">{getGreeting()}</CustomText>

            <CustomText>
              We want to acquaint you with the most effective mantras and you
              will choose the ones that like best
            </CustomText>
          </View>
        </View>

        <View>
          <FlatList
            data={TrackList}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={[
                    styles.listCard,
                    {
                      height: hp(Platform.OS === 'ios' ? 60 : 60),
                    },
                  ]}>
                  <ImageBackground
                    source={{uri: item.artwork}}
                    style={styles.cardImage}
                    imageStyle={styles.cardImageStyle}>
                    <View style={styles.cardContent}>
                      <Image
                        source={IMAGES.curvedView}
                        style={styles.cardContentImage}
                        resizeMode="contain"
                      />
                      <View style={styles.cardTextCont}>
                        <CustomText type="subTitle" color={COLORS.darkPink}>
                          {item.title}
                        </CustomText>
                        <CustomText type="small" color={COLORS.darkPink}>
                          7 mantras for your for happy life balance
                        </CustomText>
                      </View>
                      <TouchableOpacity
                        onPress={() => handleGoToPLayer(item)}
                        style={styles.cardPlayButton}>
                        <CustomIcon
                          Icon={ICONS.playIcon}
                          height={14}
                          width={14}
                        />
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                </View>
              );
            }}
          />
        </View>

        {track ? (
          <View style={styles.footerCont}>
            <View style={styles.footerContent}>
              <View style={styles.footerLeftCont}>
                <Image
                  source={{ uri: track?.artwork }}
                  style={styles.footerLeftImage}
                />
                <CustomText>{track?.title}</CustomText>
              </View>

              <View style={styles.footerRight}>
                <CustomIcon
                  onPress={handlePreviousTrack}
                  Icon={ICONS.playPreviousIcon}
                  height={15}
                  width={15}
                />
                <CustomIcon
                  onPress={playing ? Player.pause : Player.play}
                  Icon={playing ? ICONS.pauseIcon : ICONS.playIcon}
                  height={14}
                  width={14}
                />
                <CustomIcon
                  onPress={handleNextTrack}
                  Icon={ICONS.playNextIcon}
                  height={15}
                  width={15}
                />
              </View>
            </View>

            <View style={styles.footerProgressBar}>
              <View
                style={[
                  styles.footerProgressComplete,
                  {
                    width: `${
                      (position /
                        (Platform.OS === "android" ? duration : buffered)) *
                      100
                    }%`,
                  },
                ]}
              />
            </View>
          </View>
        ) : (
          <View style={styles.footerCont}></View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PlayerList;

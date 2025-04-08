import { IMAGE_BASE_URL } from "@env";
import React, { FC, useCallback, useEffect, useState } from "react";
import {
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
import { fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import ICONS from "../../Assets/icons";
import IMAGES from "../../Assets/images";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import Loader from "../../Components/Loader";
import { useStopPlaybackOnBackground } from "../../Components/TrackPlayer";
import { TrackList } from "../../Seeds/PlayerTracks";
import {
  GetCollectionResponse,
  GetSearchAudioResponse,
} from "../../Typings/apiTypes";
import { PlayerListProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { getGreeting, timeStringToSeconds } from "../../Utilities/Helpers";
import { hp } from "../../Utilities/Metrics";
import { useSetupPlayer } from "../Player";
import styles from "./style";

const PlayerList: FC<PlayerListProps> = ({ navigation, route }) => {
  const { id, isFromMeditation, meditationTypeData } = route.params;

  const insets = useSafeAreaInsets();
  const { position, duration, buffered } = useProgress();
  const { playing } = useIsPlaying();
  const isPlayerReady = useSetupPlayer();
  const track = useActiveTrack();

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isNextAvailable, setIsNextAvailable] = useState(false);
  const [isPreviousAvailable, setIsPreviousAvailable] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [collectionData, setCollectionData] = useState<GetCollectionResponse>();

  const [searchedAudios, setSearchedAudios] =
    useState<GetSearchAudioResponse[]>();

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

  const handleGoToPLayer = async (track: any, index: number) => {
    const trackIndex = TrackList.findIndex((t) => t.id === track.id); // Find index of selected track
    setCurrentTrackIndex(trackIndex); // this is for this page mini player

    if (isFromMeditation) {
      if (searchedAudios && searchedAudios.length > 0) {
        navigation.navigate("player", {
          currentTrackIndex: index, // Pass current index
          trackList: searchedAudios?.map((item) => ({
            id: item._id,
            artwork: IMAGE_BASE_URL + item.imageUrl,
            collectionName: item.collectionType.name ?? "",
            title: item.songName,
            description: item.description,
            url: IMAGE_BASE_URL + item.audioUrl,
            duration: timeStringToSeconds(item.duration),
            level: item.levels.length > 0 ? item.levels[0].name : "Basic",
          })),
        });
      }
    } else {
      if (collectionData && collectionData?.audioFiles.length > 0) {
        navigation.navigate("player", {
          currentTrackIndex: index, // Pass current index
          trackList: collectionData?.audioFiles.map((item) => ({
            artwork: IMAGE_BASE_URL + item.imageUrl,
            collectionName: collectionData.collection.name ?? "",
            title: item.songName,
            description: item.description,
            url: IMAGE_BASE_URL + item.audioUrl,
            duration: timeStringToSeconds(item.duration),
            level: item.levels[0] ?? "Basic",
          })),
        });
      }
    }
  };

  useStopPlaybackOnBackground();

  const getCollectionData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchData<GetCollectionResponse>(
        `${ENDPOINTS.collectionData}${id}/audios`
      );
      if (response.data.success) {
        setCollectionData(response.data.data);
      }
    } catch (error: any) {
      console.error("Home data fetch error:", error);
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getmeditationTypeData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchData<GetSearchAudioResponse[]>(
        ENDPOINTS.searchAudio,
        {
          bestFor: meditationTypeData?.title,
        }
      );
      if (response.data.success) {
        setSearchedAudios(response.data.data);
      }
    } catch (error: any) {
      console.error("Home data fetch error:", error);
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFromMeditation && meditationTypeData?.title) {
      getmeditationTypeData();
    } else {
      getCollectionData();
    }
  }, [isFromMeditation, meditationTypeData]);

  useEffect(() => {
    if (collectionData && collectionData?.audioFiles.length > 0) {
      setIsNextAvailable(
        currentTrackIndex < collectionData?.audioFiles.length - 1
      );
      setIsPreviousAvailable(currentTrackIndex > 0);
    }
  }, [collectionData]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  // if (!isPlayerReady) {
  //   return (
  //     <SafeAreaView
  //       style={{
  //         flex: 1,
  //         backgroundColor: COLORS.darkBlue,
  //         alignItems: "center",
  //         justifyContent: "center",
  //         minHeight: "100%",
  //       }}
  //     >
  //       <ActivityIndicator />
  //     </SafeAreaView>
  //   );
  // }

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
              {isFromMeditation
                ? meditationTypeData?.title
                : collectionData?.collection.description}
            </CustomText>
          </View>
        </View>

        <View>
          {isFromMeditation ? (
            <FlatList
              data={searchedAudios}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={[
                      styles.listCard,
                      {
                        height: hp(Platform.OS === "ios" ? 60 : 60),
                      },
                    ]}
                  >
                    <ImageBackground
                      source={{ uri: IMAGE_BASE_URL + item.imageUrl }}
                      style={styles.cardImage}
                      imageStyle={styles.cardImageStyle}
                    >
                      <View style={styles.cardContent}>
                        <Image
                          source={IMAGES.curvedView}
                          style={styles.cardContentImage}
                          resizeMode="contain"
                        />
                        <View style={styles.cardTextCont}>
                          <CustomText type="subTitle" color={COLORS.darkPink}>
                            {item.songName}
                          </CustomText>
                          <CustomText type="small" color={COLORS.darkPink}>
                            {item.description}
                          </CustomText>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleGoToPLayer(item, index)}
                          style={styles.cardPlayButton}
                        >
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
          ) : (
            <FlatList
              data={collectionData?.audioFiles}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={[
                      styles.listCard,
                      {
                        height: hp(Platform.OS === "ios" ? 60 : 60),
                      },
                    ]}
                  >
                    <ImageBackground
                      source={{ uri: IMAGE_BASE_URL + item.imageUrl }}
                      style={styles.cardImage}
                      imageStyle={styles.cardImageStyle}
                    >
                      <View style={styles.cardContent}>
                        <Image
                          source={IMAGES.curvedView}
                          style={styles.cardContentImage}
                          resizeMode="contain"
                        />
                        <View style={styles.cardTextCont}>
                          <CustomText type="subTitle" color={COLORS.darkPink}>
                            {item.songName}
                          </CustomText>
                          <CustomText type="small" color={COLORS.darkPink}>
                            {item.description}
                          </CustomText>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleGoToPLayer(item, index)}
                          style={styles.cardPlayButton}
                        >
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
          )}
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
                  height={20}
                  width={20}
                  disabled={!isPreviousAvailable}
                />
                <CustomIcon
                  onPress={playing ? Player.pause : Player.play}
                  Icon={playing ? ICONS.pauseIcon : ICONS.playIcon}
                  height={18}
                  width={18}
                />
                <CustomIcon
                  onPress={handleNextTrack}
                  Icon={ICONS.playNextIcon}
                  height={20}
                  width={20}
                  disabled={!isNextAvailable}
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

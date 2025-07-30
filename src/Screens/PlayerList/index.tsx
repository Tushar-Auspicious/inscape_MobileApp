import { IMAGE_BASE_URL } from "@env";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  RefreshControl,
  ScrollView,
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
// import Loader from "../../Components/Loader";
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
// import Loader from "../../Components/Loader";
import Loader from "../../Components/Loader";
import NoInternetCard from "../../Components/NoInternetCard";
import useNetworkStatus from "../../Hooks/useNetworkStatus";
import { useStopPlaybackOnBackground } from "../../PlayerServices/SetupService";

const PlayerList: FC<PlayerListProps> = ({ navigation, route }) => {
  const { id, isFromMeditation, meditationTypeData } = route.params;

  const insets = useSafeAreaInsets();
  const { position, duration, buffered } = useProgress();
  const { playing } = useIsPlaying();
  useSetupPlayer(); // Initialize player
  const track = useActiveTrack();

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isNextAvailable, setIsNextAvailable] = useState(false);
  const [isPreviousAvailable, setIsPreviousAvailable] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [collectionData, setCollectionData] = useState<GetCollectionResponse>();
  const [searchedAudios, setSearchedAudios] =
    useState<GetSearchAudioResponse[]>();

  // Ref for abort controller to cancel ongoing requests
  const abortControllerRef = useRef<AbortController | null>(null);

  // Network status
  const { isConnected, retryConnection } = useNetworkStatus();
  const previousConnectionRef = useRef<boolean | null>(null);

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
            id: item._id,
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

  const getCollectionData = useCallback(
    async (forceRefresh = false) => {
      // Cancel any ongoing requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create a new abort controller for this request
      abortControllerRef.current = new AbortController();

      if (!forceRefresh) {
        setIsLoading(true);
      } else {
        setRefreshing(true);
      }

      try {
        // Fetch with timeout
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Request timeout")), 10000);
        });

        const fetchPromise = fetchData<GetCollectionResponse>(
          `${ENDPOINTS.collectionData}${id}/audios`,
          {},
          { signal: abortControllerRef.current.signal }
        );

        // Race between fetch and timeout
        const response = (await Promise.race([
          fetchPromise,
          timeoutPromise,
        ])) as any;

        if (response.data.success) {
          setCollectionData(response.data.data);
        }
      } catch (error: any) {
        // Don't show error if it's an abort error (user navigated away)
        if (error.name !== "AbortError") {
          console.error("Collection data fetch error:", error);
          Toast.show({
            type: "error",
            text1: error.message || "Something went wrong",
            position: "bottom",
          });
        }
      } finally {
        setIsLoading(false);
        setRefreshing(false);
      }
    },
    [id]
  );

  const getmeditationTypeData = useCallback(
    async (forceRefresh = false) => {
      // Cancel any ongoing requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create a new abort controller for this request
      abortControllerRef.current = new AbortController();

      if (!forceRefresh) {
        setIsLoading(true);
      } else {
        setRefreshing(true);
      }

      try {
        // Fetch with timeout
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Request timeout")), 10000);
        });

        const fetchPromise = fetchData<GetSearchAudioResponse[]>(
          ENDPOINTS.searchAudio,
          {
            bestFor: meditationTypeData?.title,
          },
          { signal: abortControllerRef.current.signal }
        );

        // Race between fetch and timeout
        const response = (await Promise.race([
          fetchPromise,
          timeoutPromise,
        ])) as any;

        if (response.data.success) {
          setSearchedAudios(response.data.data);
        }
      } catch (error: any) {
        // Don't show error if it's an abort error (user navigated away)
        if (error.name !== "AbortError") {
          console.error("Meditation data fetch error:", error);
          Toast.show({
            type: "error",
            text1: error.message || "Something went wrong",
            position: "bottom",
          });
        }
      } finally {
        setIsLoading(false);
        setRefreshing(false);
      }
    },
    [meditationTypeData?.title]
  );

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    if (isFromMeditation && meditationTypeData?.title) {
      getmeditationTypeData(true);
    } else {
      getCollectionData(true);
    }
  }, [
    getmeditationTypeData,
    getCollectionData,
    isFromMeditation,
    meditationTypeData,
  ]);

  useEffect(() => {
    if (isFromMeditation && meditationTypeData?.title) {
      getmeditationTypeData();
    } else {
      getCollectionData();
    }

    // Cleanup function to abort any pending requests when component unmounts
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [
    isFromMeditation,
    meditationTypeData,
    getmeditationTypeData,
    getCollectionData,
  ]);

  // Monitor network status changes and refresh data when connection is restored
  useEffect(() => {
    // If connection was previously offline and now it's online, refresh the data
    if (previousConnectionRef.current === false && isConnected === true) {
      console.log(
        "Network connection restored, refreshing player list data..."
      );
      if (isFromMeditation && meditationTypeData?.title) {
        getmeditationTypeData(true);
      } else {
        getCollectionData(true);
      }
    }

    // Update the previous connection state
    previousConnectionRef.current = isConnected;
  }, [
    isConnected,
    getmeditationTypeData,
    getCollectionData,
    isFromMeditation,
    meditationTypeData,
  ]);

  useEffect(() => {
    if (collectionData && collectionData?.audioFiles.length > 0) {
      setIsNextAvailable(
        currentTrackIndex < collectionData?.audioFiles.length - 1
      );
      setIsPreviousAvailable(currentTrackIndex > 0);
    }
  }, [collectionData]);

  // Render skeleton loading placeholders
  const renderSkeletonLoading = () => (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonCurvedCont} />
      <View style={styles.content}>
        <View style={styles.skeletonHeader}>
          <View style={styles.skeletonBackButton} />
          <View>
            <View style={styles.skeletonHeaderText} />
            <View style={styles.skeletonHeaderSubText} />
          </View>
        </View>

        <View style={styles.skeletonCardContainer}>
          <View style={styles.skeletonCard} />
        </View>
      </View>
    </View>
  );

  // Show no internet card when offline
  if (!isConnected) {
    return (
      <SafeAreaView style={styles.container}>
        <NoInternetCard
          onRetry={() => {
            retryConnection();
            // If retryConnection succeeds, it will trigger the useEffect above
            // due to the isConnected dependency
          }}
        />
      </SafeAreaView>
    );
  }

  // Show skeleton loading when loading initial data
  if (isLoading && !collectionData && !searchedAudios) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
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

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.darkNavyBlue]}
            tintColor={COLORS.white}
          />
        }
      >
        <View style={styles.mainHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <CustomIcon Icon={ICONS.BackArrow} height={12} width={12} />
          </TouchableOpacity>

          <View style={styles.headerTextCont}>
            <CustomText type="subHeading">{getGreeting()}</CustomText>
            <ScrollView style={{ height: hp(7) }}>
              <CustomText>
                {isFromMeditation
                  ? meditationTypeData?.title
                  : collectionData?.collection.description}
              </CustomText>
            </ScrollView>
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
                      loadingIndicatorSource={IMAGES.pinkBg}
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
      </ScrollView>

      {/* {track ? (
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
      )} */}
    </SafeAreaView>
  );
};

export default PlayerList;

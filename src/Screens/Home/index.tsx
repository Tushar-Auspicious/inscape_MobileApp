import { IMAGE_BASE_URL } from "@env";
import { FlashList } from "@shopify/flash-list";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useActiveTrack } from "react-native-track-player";
import { fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import ICONS from "../../Assets/icons";
import ContentCard from "../../Components/Cards/ContentCard";
import ExploreCard from "../../Components/Cards/ExploreCard";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import Loader from "../../Components/Loader";
import NoInternetCard from "../../Components/NoInternetCard";
import useNetworkStatus from "../../Hooks/useNetworkStatus";
import {
  GetHomeDataResponse,
  MeditationType,
  TrendingAudio,
} from "../../Typings/apiTypes";
import { HomeScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import STORAGE_KEYS from "../../Utilities/Constants";
import { timeStringToSeconds } from "../../Utilities/Helpers";
import { horizontalScale, verticalScale, wp } from "../../Utilities/Metrics";
import {
  getLocalStorageData,
  storeLocalStorageData,
} from "../../Utilities/Storage";
import styles from "./style";

const Home: FC<HomeScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [homeData, setHomeData] = useState<GetHomeDataResponse>();
  const abortControllerRef = useRef<AbortController | null>(null);

  const activeTrack = useActiveTrack();
  const { isConnected, retryConnection } = useNetworkStatus();
  const previousConnectionRef = useRef<boolean | null>(null);

  const getHomeData = useCallback(async (forceRefresh = false) => {
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
      // Check for cached data if not forcing refresh
      if (!forceRefresh) {
        const cachedData = await getLocalStorageData(
          STORAGE_KEYS.cachedHomeData
        );
        const timestamp = await getLocalStorageData(
          STORAGE_KEYS.homeDataTimestamp
        );

        // Use cached data if it exists and is less than 15 minutes old
        if (cachedData && timestamp) {
          const now = new Date().getTime();
          const cacheTime = parseInt(timestamp);
          const fifteenMinutesInMs = 5 * 60 * 1000;

          if (now - cacheTime < fifteenMinutesInMs) {
            setHomeData(cachedData);
            setIsLoading(false);

            // Fetch fresh data in the background
            // fetchFreshDataInBackground();
            return;
          }
        }
      }

      // Fetch fresh data with timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timeout")), 10000);
      });

      const fetchPromise = fetchData<GetHomeDataResponse>(
        ENDPOINTS.getHomeData,
        {},
        { signal: abortControllerRef.current.signal }
      );

      // Race between fetch and timeout
      const response = (await Promise.race([
        fetchPromise,
        timeoutPromise,
      ])) as any;

      if (response.data.success) {
        setHomeData(response.data.data);

        // Cache the data
        await storeLocalStorageData(
          STORAGE_KEYS.cachedHomeData,
          response.data.data
        );
        await storeLocalStorageData(
          STORAGE_KEYS.homeDataTimestamp,
          new Date().getTime().toString()
        );
      }
    } catch (error: any) {
      // Don't show error if it's an abort error (user navigated away)
      if (error.name !== "AbortError") {
        console.error("Home data fetch error:", error);
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
  }, []);

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    getHomeData(true);
  }, [getHomeData]);

  const handleSearchClick = useCallback(() => {
    navigation.navigate("searchHome");
  }, [navigation]);

  const renderTrendingItem = useCallback(
    ({ item, index }: { item: TrendingAudio; index: number }) => (
      <View style={{ marginRight: horizontalScale(10) }}>
        <ContentCard
          key={item._id}
          duration={item.audioDetails.duration}
          imageUrl={IMAGE_BASE_URL + item.audioDetails.imageUrl}
          title={item.audioDetails.songName}
          type="potrait"
          onPress={() => {
            homeData &&
              homeData.trendingAudio.length > 0 &&
              navigation.navigate("player", {
                trackList: homeData?.trendingAudio.map((trend) => ({
                  id: trend._id,
                  artwork: IMAGE_BASE_URL + trend.audioDetails.imageUrl,
                  collectionName: trend.audioDetails.collectionType?.name ?? "",
                  title: trend.audioDetails.songName,
                  duration: timeStringToSeconds(trend.audioDetails.duration),
                  description: trend.audioDetails.description,
                  url: IMAGE_BASE_URL + trend.audioDetails.audioUrl,
                  level: trend.audioDetails.levels[0]?.name,
                })),
                currentTrackIndex: index,
              });
          }}
        />
      </View>
    ),
    [homeData]
  );

  const renderMeditationTypeItem = useCallback(
    ({ item, index }: { item: MeditationType; index: number }) => (
      <View style={{ marginRight: horizontalScale(10) }}>
        <ExploreCard
          imageUrl={IMAGE_BASE_URL + item.audio.imageUrl}
          title={item.name}
          subTitle={`${item.audioCount} items`}
          onPress={() =>
            navigation.navigate("playerList", {
              isFromMeditation: true,
              meditationTypeData: {
                title: item.name,
              },
            })
          }
          width={(wp(100) - horizontalScale(60)) / 2}
        />
      </View>
    ),
    [navigation, homeData]
  );

  const keyExtractor = useCallback((item: any) => item._id, []);

  // Initial data loading
  useEffect(() => {
    getHomeData();

    // Cleanup function to abort any pending requests when component unmounts
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [getHomeData]);

  // Monitor network status changes and refresh data when connection is restored
  useEffect(() => {
    // If connection was previously offline and now it's online, refresh the data
    if (previousConnectionRef.current === false && isConnected === true) {
      console.log("Network connection restored, refreshing data...");
      getHomeData(true); // Force refresh when connection is restored
    }

    // Update the previous connection state
    previousConnectionRef.current = isConnected;
  }, [isConnected, getHomeData]);

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

  if (isLoading || !homeData) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color={COLORS.white} />
        </View>
      ) : (
        <Animated.ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            {
              paddingBottom: activeTrack
                ? verticalScale(100)
                : verticalScale(20),
            },
          ]}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
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
            <CustomText type="title" fontFamily="bold">
              Suggested for you...
            </CustomText>
            <TouchableOpacity onPress={handleSearchClick}>
              <CustomIcon Icon={ICONS.SearchWhite} width={20} height={20} />
            </TouchableOpacity>
          </View>

          {homeData.suggestedCollection[0] && (
            <ContentCard
              key={homeData.suggestedCollection[0]._id}
              title={homeData.suggestedCollection[0].name}
              duration={homeData.suggestedCollection[0].description}
              imageUrl={
                IMAGE_BASE_URL + homeData.suggestedCollection[0].imageUrl
              }
              onPress={() =>
                navigation.navigate("categories", {
                  id: homeData.suggestedCollection[0]._id,
                })
              }
              isCollection
            />
          )}

          {homeData.trendingAudio.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <CustomText type="title" fontFamily="bold">
                  Trending
                </CustomText>
              </View>

              <FlashList
                data={homeData.trendingAudio}
                contentContainerStyle={styles.horizontalList}
                keyExtractor={keyExtractor}
                horizontal
                renderItem={renderTrendingItem}
                estimatedItemSize={200}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}

          {homeData.meditationType.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <CustomText type="title" fontFamily="bold">
                  Explore Meditation Types
                </CustomText>
              </View>
              <FlashList
                data={homeData.meditationType}
                numColumns={2}
                contentContainerStyle={styles.horizontalList}
                keyExtractor={keyExtractor}
                renderItem={renderMeditationTypeItem}
                estimatedItemSize={180}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}
        </Animated.ScrollView>
      )}
    </SafeAreaView>
  );
};

export default React.memo(Home);

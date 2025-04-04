import { IMAGE_BASE_URL } from "@env";
import { FlashList } from "@shopify/flash-list";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import ICONS from "../../Assets/icons";
import ContentCard from "../../Components/Cards/ContentCard";
import ExploreCard from "../../Components/Cards/ExploreCard";
import SessionCard from "../../Components/Cards/SessionCard";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import Loader from "../../Components/Loader";
import meditationTypes from "../../Seeds/DiscoverSeeds";
import {
  Audio,
  Breathing,
  GetHomeDataResponse,
  MeditationType,
  TrendingAudio,
} from "../../Typings/apiTypes";
import { HomeScreenProps } from "../../Typings/route";
import styles from "./style";
import { timeStringToSeconds } from "../../Utilities/Helpers";
import { horizontalScale, hp, wp } from "../../Utilities/Metrics";

const Home: FC<HomeScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [homeData, setHomeData] = useState<GetHomeDataResponse>();

  const getHomeData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchData<GetHomeDataResponse>(
        ENDPOINTS.getHomeData
      );
      if (response.data.success) {
        setHomeData(response.data.data);
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

  const handleSearchClick = useCallback(() => {
    navigation.navigate("searchHome");
  }, [navigation]);

  const handleBreathingSessionPress = useCallback(
    (index: number) => {
      if (!homeData?.breathing) return;

      navigation.navigate("player", {
        trackList: homeData.breathing.map((item) => ({
          artwork: IMAGE_BASE_URL + item.imageUrl,
          collectionName: item.collectionType?.name ?? "",
          title: item.songName,
          duration: timeStringToSeconds(item.duration),
          description: item.description,
          url: IMAGE_BASE_URL + item.audioUrl,
          level: item.levels[0]?.name,
        })),
        currentTrackIndex: index,
      });
    },
    [homeData?.breathing, navigation]
  );

  const renderTrendingItem = useCallback(
    ({ item, index }: { item: TrendingAudio; index: number }) => (
      <ContentCard
        key={item._id}
        duration={item.audioDetails.duration}
        imageUrl={IMAGE_BASE_URL + item.audioDetails.imageUrl}
        title={item.audioDetails.songName}
        type="potrait"
        onPress={() => {
          navigation.navigate("player", {
            trackList: [
              {
                artwork: IMAGE_BASE_URL + item.audioDetails.imageUrl,
                collectionName:
                  homeData?.trendingAudio[0].audioDetails.songName ?? "",
                title: item.audioDetails.songName,
                duration: timeStringToSeconds(item.audioDetails.duration),
                description: item.audioDetails.description,
                url: IMAGE_BASE_URL + item.audioDetails.audioUrl,
                level: item.audioDetails.levels[0]?.name,
              },
            ],
            currentTrackIndex: index,
          });
        }}
      />
    ),
    [navigation]
  );

  const renderCollectionItem = useCallback(
    ({ item, index }: { item: Audio; index: number }) => (
      <View style={{ marginRight: horizontalScale(10) }}>
        <ContentCard
          duration={item.duration}
          imageUrl={IMAGE_BASE_URL + item.imageUrl}
          title={item.songName}
          type="potrait"
          isSmall
          onPress={() => {
            if (!homeData?.collection.audios) return;
            navigation.navigate("player", {
              trackList: homeData.collection.audios.map((item) => ({
                artwork: IMAGE_BASE_URL + item.imageUrl,
                collectionName: homeData.collection.name ?? "",
                title: item.songName,
                duration: timeStringToSeconds(item.duration),
                description: item.description,
                url: IMAGE_BASE_URL + item.audioUrl,
                level: item.levels[0]?.name,
              })),
              currentTrackIndex: index,
            });
          }}
        />
      </View>
    ),
    [navigation]
  );

  const renderMeditationTypeItem = useCallback(
    ({ item, index }: { item: MeditationType; index: number }) => (
      <View style={{ marginRight: horizontalScale(10) }}>
        <ExploreCard
          imageUrl={meditationTypes[index].imageUrl}
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
        />
      </View>
    ),
    [navigation]
  );

  const renderBreathingSessionItem = useCallback(
    ({ item, index }: { item: Breathing; index: number }) => (
      <SessionCard
        imageUrl={IMAGE_BASE_URL + item.imageUrl}
        title={item.songName}
        duration={item.duration}
        level={item.levels[0]?.name ?? ""}
        onPress={() => handleBreathingSessionPress(index)}
      />
    ),
    [handleBreathingSessionPress]
  );

  const keyExtractor = useCallback((item: any) => item._id, []);

  useEffect(() => {
    getHomeData();
  }, [getHomeData]);

  if (isLoading || !homeData) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
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
            imageUrl={IMAGE_BASE_URL + homeData.suggestedCollection[0].imageUrl}
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("playerList", {
                    id: homeData.trendingAudio[0]._id,
                  });
                }}
              >
                <CustomText fontFamily="semiBold">View all</CustomText>
              </TouchableOpacity>
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

        {homeData.collection && (
          <>
            <View style={styles.sectionHeader}>
              <CustomText type="title" fontFamily="bold">
                {homeData.collection.name}
              </CustomText>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("categories", {
                    id: homeData.collection._id,
                  })
                }
              >
                <CustomText fontFamily="semiBold">{`${
                  homeData.collection.audioCount
                } session${
                  homeData.collection.audioCount > 1 ? "s" : ""
                }`}</CustomText>
              </TouchableOpacity>
            </View>
            <FlashList
              data={homeData.collection.audios}
              contentContainerStyle={styles.horizontalList}
              keyExtractor={keyExtractor}
              horizontal
              renderItem={renderCollectionItem}
              estimatedItemSize={50}
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
              contentContainerStyle={styles.horizontalList}
              keyExtractor={keyExtractor}
              horizontal
              renderItem={renderMeditationTypeItem}
              estimatedItemSize={180}
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}

        {homeData.breathing.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <CustomText type="title" fontFamily="bold">
                Breathing Sessions
              </CustomText>
            </View>
            <FlashList
              data={homeData.breathing}
              contentContainerStyle={styles.verticalList}
              keyExtractor={keyExtractor}
              renderItem={renderBreathingSessionItem}
              estimatedItemSize={100}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Home);

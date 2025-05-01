import { IMAGE_BASE_URL } from "@env";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  RefreshControl,
  StyleSheet,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import ICONS from "../../Assets/icons";
import ContentCard from "../../Components/Cards/ContentCard";
import CustomIcon from "../../Components/CustomIcon";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
// import Loader from "../../Components/Loader";
import { GetCollectionResponse } from "../../Typings/apiTypes";
import { CategoryProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import styles from "./style";
import useNetworkStatus from "../../Hooks/useNetworkStatus";
import NoInternetCard from "../../Components/NoInternetCard";
import FastImage from "react-native-fast-image";
import { useActiveTrack } from "react-native-track-player";
import MiniPlayer from "../../Components/MiniPlayer";

const Categories: FC<CategoryProps> = ({ navigation, route }) => {
  const { id } = route.params;

  const insets = useSafeAreaInsets();
  const activeTrack = useActiveTrack();

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [collectionData, setCollectionData] = useState<GetCollectionResponse>();
  const [filteredAudioFiles, setFilteredAudioFiles] = useState<any[]>([]); // State for filtered results

  // Ref for abort controller to cancel ongoing requests
  const abortControllerRef = useRef<AbortController | null>(null);

  // Network status
  const { isConnected, retryConnection } = useNetworkStatus();
  const previousConnectionRef = useRef<boolean | null>(null);

  const handleCardPress = () => {
    if (collectionData && collectionData.collection._id) {
      navigation.navigate("playerList", {
        id: collectionData?.collection._id,
      });
    }
  };

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
          setFilteredAudioFiles(response.data.data.audioFiles); // Initialize filtered list
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

  // Search filter function
  const filterAudioFiles = useCallback(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setFilteredAudioFiles(collectionData?.audioFiles || []);
    } else {
      const filtered = collectionData?.audioFiles.filter((item) =>
        item.songName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAudioFiles(filtered || []);
    }
  }, [searchQuery, collectionData]);

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    getCollectionData(true);
  }, [getCollectionData]);

  useEffect(() => {
    getCollectionData();

    // Cleanup function to abort any pending requests when component unmounts
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [getCollectionData]);

  // Monitor network status changes and refresh data when connection is restored
  useEffect(() => {
    // If connection was previously offline and now it's online, refresh the data
    if (previousConnectionRef.current === false && isConnected === true) {
      console.log("Network connection restored, refreshing collection data...");
      getCollectionData(true); // Force refresh when connection is restored
    }

    // Update the previous connection state
    previousConnectionRef.current = isConnected;
  }, [isConnected, getCollectionData]);

  // Update filtered list whenever searchQuery or collectionData changes
  useEffect(() => {
    filterAudioFiles();
  }, [searchQuery, collectionData, filterAudioFiles]);

  // Render skeleton loading placeholders
  const renderSkeletonLoading = () => (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonImageBackground} />
      <View style={styles.skeletonHeader}>
        <View style={styles.skeletonSearchBar} />
      </View>
      <View style={styles.skeletonGrid}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <View key={item} style={styles.skeletonCard} />
        ))}
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
  if (isLoading && !collectionData) {
    return (
      <SafeAreaView style={styles.container}>
        {renderSkeletonLoading()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <FastImage
        source={{
          uri: IMAGE_BASE_URL + collectionData?.collection.imageUrl,
        }}
        style={[StyleSheet.absoluteFill, styles.imageBackground]}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View
        style={[
          styles.imageContent,
          {
            height: insets.top ? hp(35) - insets.top : hp(35),
            paddingTop: insets.top
              ? verticalScale(20) - insets.top
              : verticalScale(20),
            paddingBottom: verticalScale(20),
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <CustomIcon Icon={ICONS.BackArrow} height={12} width={12} />
        </TouchableOpacity>

        <View style={styles.imageTextContent}>
          <CustomText type="heading" fontFamily="bold">
            {collectionData?.collection.name}
          </CustomText>

          <CustomText>{`${collectionData?.audioFiles.length} practices`}</CustomText>
          <ScrollView>
            <CustomText>{collectionData?.collection.description}</CustomText>
          </ScrollView>
        </View>
      </View>

      <View style={styles.mainHeader}>
        <CustomInput
          value={searchQuery}
          onChangeText={(text) =>
            setSearchQuery(text.trim().length === 0 ? text.trim() : text)
          }
          type="search"
          placeholder="Search..."
          style={styles.searchInput}
          heigth={44}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.darkNavyBlue]}
            tintColor={COLORS.white}
          />
        }
      >
        <FlatList
          data={filteredAudioFiles} // Use filteredAudioFiles instead of collectionData.audioFiles
          contentContainerStyle={styles.horizontalList}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: horizontalScale(30),
          }}
          renderItem={({ item }) => (
            <ContentCard
              duration={item.duration}
              imageUrl={IMAGE_BASE_URL + item.imageUrl}
              title={item.songName}
              type={"potrait"}
              isSmall
              onPress={handleCardPress}
            />
          )}
          ListEmptyComponent={() => {
            return (
              <CustomText style={{ textAlign: "center" }}>
                No results found
              </CustomText>
            );
          }}
        />
      </ScrollView>
      {activeTrack && (
        <View
          style={{
            position: "absolute",
            bottom: insets.bottom + 0,
            width: wp(100),
          }}
        >
          <MiniPlayer />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Categories;

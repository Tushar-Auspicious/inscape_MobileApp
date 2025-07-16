import { IMAGE_BASE_URL } from "@env";
import { useIsFocused } from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import ExploreCard from "../../Components/Cards/ExploreCard";
import CustomInput from "../../Components/CustomInput";
import EmptyDataView from "../../Components/EmptyDataView";
import FilterModalSheet from "../../Components/Modals/FilterModal";
import NoInternetCard from "../../Components/NoInternetCard";
import { useDebounce } from "../../Hooks/useDebounceValue";
import useNetworkStatus from "../../Hooks/useNetworkStatus";
import { DiscoverResults, GetFilterResponse } from "../../Typings/apiTypes";
import { DiscoverProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import STORAGE_KEYS from "../../Utilities/Constants";
import { wp } from "../../Utilities/Metrics";
import {
  getLocalStorageData,
  storeLocalStorageData,
} from "../../Utilities/Storage";
import styles from "./style";

const Discover: FC<DiscoverProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false); // For API fetches
  const [refreshing, setRefreshing] = useState(false); // For pull-to-refresh
  const [allResults, setAllResults] = useState<DiscoverResults[]>([]); // Base dataset
  const [filteredResults, setFilteredResults] = useState<DiscoverResults[]>([]); // Locally filtered
  const [isFilterModal, setIsFilterModal] = useState(false);

  const [filtertags, setFiltertags] = useState<{
    bestFor: string[];
    level: string[];
  }>();

  const isFocused = useIsFocused();

  // Ref for abort controller to cancel ongoing requests
  const abortControllerRef = useRef<AbortController | null>(null);

  // Network status
  const { isConnected, retryConnection } = useNetworkStatus();
  const previousConnectionRef = useRef<boolean | null>(null);

  // Handle filter modal open
  const handleFilterPress = useCallback(() => {
    setIsFilterModal(true);
  }, []);

  // Fetch initial data without filters
  const fetchInitialData = useCallback(async (forceRefresh = false) => {
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
          STORAGE_KEYS.cachedDiscoverData
        );
        const timestamp = await getLocalStorageData(
          STORAGE_KEYS.discoverDataTimestamp
        );

        // Use cached data if it exists and is less than 15 minutes old
        if (cachedData && timestamp) {
          const now = new Date().getTime();
          const cacheTime = parseInt(timestamp);
          const fifteenMinutesInMs = 15 * 60 * 1000;

          if (now - cacheTime < fifteenMinutesInMs) {
            const filteredData = cachedData.filter(
              (item: DiscoverResults) => item.audioCount > 0
            );
            setAllResults(filteredData);
            setFilteredResults(filteredData);
            setIsLoading(false);

            // Fetch fresh data in the background
            fetchFreshDataInBackground();
            return;
          }
        }
      }

      // Fetch fresh data with timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timeout")), 10000);
      });

      const fetchPromise = fetchData<DiscoverResults[]>(
        ENDPOINTS.discoverData,
        {},
        { signal: abortControllerRef.current.signal }
      );

      // Race between fetch and timeout
      const response = (await Promise.race([
        fetchPromise,
        timeoutPromise,
      ])) as any;

      if (response.data.success) {
        const filteredData = response.data.data.filter(
          (item: any) => item.audioCount > 0
        );
        setAllResults(filteredData);
        setFilteredResults(filteredData);

        // Cache the data
        await storeLocalStorageData(
          STORAGE_KEYS.cachedDiscoverData,
          response.data.data
        );
        await storeLocalStorageData(
          STORAGE_KEYS.discoverDataTimestamp,
          new Date().getTime().toString()
        );
      } else {
        Toast.show({
          type: "error",
          text1: "No Results",
          text2: "No data found.",
          position: "bottom",
        });
      }
    } catch (error: any) {
      // Don't show error if it's an abort error (user navigated away)
      if (error.name !== "AbortError") {
        console.error("Initial fetch error:", error);
        Toast.show({
          type: "error",
          text1: error.message || "Fetch failed",
          text2: "Please try again.",
          position: "bottom",
        });
      }
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Fetch fresh data in the background without showing loading indicators
  const fetchFreshDataInBackground = async () => {
    try {
      const response = await fetchData<DiscoverResults[]>(
        ENDPOINTS.discoverData,
        {}
      );
      if (response.data.success) {
        const filteredData = response.data.data.filter(
          (item) => item.audioCount > 0
        );
        setAllResults(filteredData);
        setFilteredResults(filteredData);

        // Update the cache
        await storeLocalStorageData(
          STORAGE_KEYS.cachedDiscoverData,
          response.data.data
        );
        await storeLocalStorageData(
          STORAGE_KEYS.discoverDataTimestamp,
          new Date().getTime().toString()
        );
      }
    } catch (error) {
      console.log("Background fetch error:", error);
    }
  };

  // Fetch filtered data when "Apply" is pressed
  const fetchFilteredData = useCallback(async () => {
    // Cancel any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new abort controller for this request
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    try {
      // Fetch with timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timeout")), 10000);
      });

      const fetchPromise = fetchData<DiscoverResults[]>(
        ENDPOINTS.discoverData,
        {
          levels: selectedLevel,
          bestFor: selectedFilters.join(","),
        },
        { signal: abortControllerRef.current.signal }
      );

      // Race between fetch and timeout
      const response = (await Promise.race([
        fetchPromise,
        timeoutPromise,
      ])) as any;

      if (response.data.success) {
        const filteredData = response.data.data.filter(
          (item: any) => item.audioCount > 0
        );
        setAllResults(filteredData);
        setFilteredResults(filteredData);
      } else {
        Toast.show({
          type: "error",
          text1: "No Results",
          text2: "No matching data found.",
          position: "bottom",
        });
      }
    } catch (error: any) {
      // Don't show error if it's an abort error (user navigated away)
      if (error.name !== "AbortError") {
        console.error("Filter fetch error:", error);
        Toast.show({
          type: "error",
          text1: error.message || "Filter failed",
          text2: "Please try again.",
          position: "bottom",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [selectedFilters, selectedLevel]);

  // Local search function
  const searchLocally = useCallback(
    (query: string) => {
      if (!query) {
        setFilteredResults(allResults);
        return;
      }
      const lowerQuery = query.toLowerCase();
      const filtered = allResults.filter((item) =>
        item.name.toLowerCase().includes(lowerQuery)
      );
      setFilteredResults(filtered);
    },
    [allResults]
  );

  // Debounced local search
  const debouncedSearch = useDebounce((query: string) => {
    searchLocally(query);
  }, 500);

  // Handle filter modal close and apply filters
  const onCloseFilterSheet = useCallback(() => {
    setIsFilterModal(false);
  }, []);

  const onApplyFilters = useCallback(() => {
    fetchFilteredData();
    onCloseFilterSheet();
  }, [fetchFilteredData, onCloseFilterSheet]);

  // Render item for FlashList
  const renderSearchItem = useCallback(
    ({ item }: { item: DiscoverResults }) => (
      <ExploreCard
        imageUrl={IMAGE_BASE_URL + item.imageUrl}
        title={item.name}
        subTitle={`${item.audioCount} sessions`}
        onPress={() =>
          navigation.navigate("categories", {
            id: item._id,
          })
        }
        width={wp(43)}
      />
    ),
    [navigation]
  );

  // Handle tag selection from EmptyDataView
  const handleTagSelect = useCallback(
    (tag: string) => {
      console.log("Tag selected:", tag);
      setSearchQuery(tag);
      // Directly trigger the search without waiting for the debounce
      searchLocally(tag);
    },
    [setSearchQuery, searchLocally]
  );

  // Memoize the EmptyDataView to prevent unnecessary re-renders
  const renderEmptyComponent = useCallback(() => {
    if (
      !isLoading &&
      (searchQuery || selectedFilters.length || selectedLevel)
    ) {
      return (
        <EmptyDataView
          height={400}
          searchData={filtertags}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          setSearchQuery={setSearchQuery}
          fetchFilteredData={fetchFilteredData}
        />
      );
    }
    return null;
  }, [
    isLoading,
    searchQuery,
    selectedFilters,
    selectedLevel,
    filtertags,
    handleTagSelect,
  ]);

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    fetchInitialData(true);
  }, [fetchInitialData]);

  // Render skeleton loading placeholders
  const renderSkeletonLoading = () => (
    <View style={styles.skeletonContainer}>
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

  const getFilterData = async () => {
    try {
      const response = await fetchData<GetFilterResponse>(ENDPOINTS.getFilters);
      if (response.data.success) {
        setFiltertags({
          bestFor: [...response.data.data.bestForList.map((item) => item.name)],

          level: [...response.data.data.levels.map((item) => item.name)],
        });
      }
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong.",
      });
    } finally {
    }
  };

  // Fetch initial data on mount and cleanup on unmount
  useEffect(() => {
    fetchInitialData();

    // Cleanup function to abort any pending requests when component unmounts
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchInitialData]);

  // Monitor network status changes and refresh data when connection is restored
  useEffect(() => {
    // If connection was previously offline and now it's online, refresh the data
    if (previousConnectionRef.current === false && isConnected === true) {
      console.log("Network connection restored, refreshing discover data...");
      fetchInitialData(true); // Force refresh when connection is restored
    }

    // Update the previous connection state
    previousConnectionRef.current = isConnected;
  }, [isConnected, fetchInitialData]);

  // Trigger local search when query changes
  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  useEffect(() => {
    return () => {
      setSearchQuery("");
    };
  }, [isFocused]);

  useEffect(() => {
    getFilterData();
  }, []);

  // Show no internet card when offline
  if (!isConnected) {
    return (
      <SafeAreaView style={styles.container}>
        <NoInternetCard
          onRetry={() => {
            retryConnection();
          }}
        />
      </SafeAreaView>
    );
  }

  // Show skeleton loading when loading initial data
  if (isLoading && !allResults.length) {
    return (
      <SafeAreaView style={styles.container}>
        {renderSkeletonLoading()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <View style={styles.scrollContainer}>
        <View style={styles.mainHeader}>
          <CustomInput
            value={searchQuery}
            onChangeText={(text) =>
              setSearchQuery(text.trim().length === 0 ? text.trim() : text)
            }
            isFilterIcon
            type="search"
            placeholder="Search..."
            style={{ flex: 1 }}
            onFilterPress={handleFilterPress}
          />
        </View>

        <FlatList
          data={filteredResults}
          numColumns={2}
          columnWrapperStyle={styles.listColumCont}
          contentContainerStyle={styles.flatListCont}
          keyExtractor={(item) => item._id}
          renderItem={renderSearchItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.darkNavyBlue]}
              tintColor={COLORS.white}
            />
          }
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>

      {isFilterModal && (
        <FilterModalSheet
          isModalVisible={isFilterModal}
          onClose={onCloseFilterSheet}
          clearFilter={() => {
            setSelectedFilters([]);
            setSelectedLevel("");
            fetchInitialData(); // Reset to initial data
            onCloseFilterSheet();
          }}
          onPressApply={onApplyFilters}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      )}
    </SafeAreaView>
  );
};

export default Discover;

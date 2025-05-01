import { IMAGE_BASE_URL } from "@env";
import { FlashList } from "@shopify/flash-list";
import React, { FC, useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import ICONS from "../../Assets/icons";
import ContentCard from "../../Components/Cards/ContentCard";
import CustomIcon from "../../Components/CustomIcon";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import Loader from "../../Components/Loader";
import FilterModalSheet from "../../Components/Modals/FilterModal";
import { useDebounce } from "../../Hooks/useDebounceValue";
import {
  GetFilterResponse,
  GetSearchAudioResponse,
} from "../../Typings/apiTypes";
import { SearchHomeProps } from "../../Typings/route";
import { timeStringToSeconds } from "../../Utilities/Helpers";
import styles from "./style";
import EmptyDataView from "../../Components/EmptyDataView";

// Memoize ContentCard to prevent unnecessary re-renders
const MemoizedContentCard = React.memo(ContentCard);

const SearchHome: FC<SearchHomeProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false); // For debounced local search
  const [allResults, setAllResults] = useState<GetSearchAudioResponse[]>([]); // Base dataset
  const [filteredResults, setFilteredResults] = useState<
    GetSearchAudioResponse[]
  >([]); // Locally filtered

  const [filtertags, setFiltertags] = useState<{
    bestFor: string[];
    level: string[];
  }>();

  const [isFilterModal, setIsFilterModal] = useState(false);

  // Handle navigation back
  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Handle filter modal open
  const handleFilterPress = useCallback(() => {
    setIsFilterModal(true);
  }, []);

  // Fetch initial data without filters
  const fetchInitialData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchData<GetSearchAudioResponse[]>(
        ENDPOINTS.searchAudio,
        {}
      );
      if (response.data.success) {
        setAllResults(response.data.data);
        setFilteredResults(response.data.data); // Initially show all
      } else {
        Toast.show({
          type: "error",
          text1: "No Results",
          text2: "No audio found.",
        });
      }
    } catch (error: any) {
      console.error("Initial fetch error:", error);
      Toast.show({
        type: "error",
        text1: error.message || "Fetch failed",
        text2: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch filtered data when "Apply" is pressed
  const fetchFilteredData = useCallback(async () => {
    setIsSearchLoading(true);
    try {
      const response = await fetchData<GetSearchAudioResponse[]>(
        ENDPOINTS.searchAudio,
        {
          levels: selectedLevel,
          bestFor: selectedFilters.join(","),
        }
      );
      if (response.data.success) {
        setAllResults(response.data.data);
        setFilteredResults(response.data.data); // Reset filtered results
      } else {
        Toast.show({
          type: "error",
          text1: "No Results",
          text2: "No matching audio found.",
        });
      }
    } catch (error: any) {
      console.error("Filter fetch error:", error);
      Toast.show({
        type: "error",
        text1: error.message || "Filter failed",
        text2: "Please try again.",
      });
    } finally {
      setIsSearchLoading(false);
    }
  }, [selectedFilters, selectedLevel]);

  // Local search function
  const searchLocally = useCallback(
    (query: string) => {
      setIsSearchLoading(false);
      if (!query) {
        setFilteredResults(allResults);
        return;
      }
      const lowerQuery = query.toLowerCase();
      const filtered = allResults.filter((item) =>
        item.songName.toLowerCase().includes(lowerQuery)
      );
      setFilteredResults(filtered);
    },
    [allResults]
  );

  // Debounced local search
  const debouncedSearch = useDebounce((query: string) => {
    setIsSearchLoading(true); // Show loading during debounce delay
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

  // Handle card press
  const handleCardPress = useCallback((item: GetSearchAudioResponse) => {
    navigation.navigate("player", {
      trackList: [
        {
          artwork: IMAGE_BASE_URL + item.imageUrl,
          collectionName: item.collectionType?.name ?? "",
          title: item.songName,
          description: item.description,
          url: IMAGE_BASE_URL + item.audioUrl,
          duration: timeStringToSeconds(item.duration),
          level: item.levels[0]?.name ?? "Basic",
        },
      ],
      currentTrackIndex: 0,
    });
  }, []);

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

  useEffect(() => {
    getFilterData();
  }, []);

  // Fetch initial data on mount
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Trigger local search when query changes
  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  // Render item for FlatList
  const renderSearchItem = useCallback(
    ({ item }: { item: GetSearchAudioResponse }) => (
      <MemoizedContentCard
        title={item.songName}
        duration={item.duration}
        imageUrl={IMAGE_BASE_URL + item.imageUrl}
        onPress={() => handleCardPress(item)}
      />
    ),
    [handleCardPress]
  );

  if (isLoading && !allResults.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <View style={styles.mainHeader}>
        <TouchableOpacity onPress={handleBackPress}>
          <CustomIcon Icon={ICONS.BackArrow} width={15} height={15} />
        </TouchableOpacity>
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

      <FlashList
        data={filteredResults}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item._id}
        renderItem={renderSearchItem}
        ListEmptyComponent={
          !isLoading &&
          (searchQuery || selectedFilters.length || selectedLevel) ? (
            <EmptyDataView
              searchData={filtertags}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              setSearchQuery={setSearchQuery}
              fetchFilteredData={fetchFilteredData}
            />
          ) : null
        }
        estimatedItemSize={100}
      />

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
    </SafeAreaView>
  );
};

export default SearchHome;

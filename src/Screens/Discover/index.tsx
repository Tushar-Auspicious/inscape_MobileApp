import { IMAGE_BASE_URL } from "@env";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import ICONS from "../../Assets/icons";
import ExploreCard from "../../Components/Cards/ExploreCard";
import CustomIcon from "../../Components/CustomIcon";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import Loader from "../../Components/Loader";
import FilterModalSheet from "../../Components/Modals/FilterModal";
import { useDebounce } from "../../Hooks/useDebounceValue";
import { DiscoverResults } from "../../Typings/apiTypes";
import { DiscoverProps } from "../../Typings/route";
import { wp } from "../../Utilities/Metrics";
import styles from "./style";

const Discover: FC<DiscoverProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false); // For API fetches
  const [isSearchLoading, setIsSearchLoading] = useState(false); // For debounced local search
  const [allResults, setAllResults] = useState<DiscoverResults[]>([]); // Base dataset
  const [filteredResults, setFilteredResults] = useState<DiscoverResults[]>([]); // Locally filtered

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
      } else {
        Toast.show({
          type: "error",
          text1: "No Results",
          text2: "No data found.",
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
    setIsLoading(true);
    try {
      const response = await fetchData<DiscoverResults[]>(
        ENDPOINTS.discoverData,
        {
          levels: selectedLevel,
          bestFor: selectedFilters.join(","),
        }
      );
      if (response.data.success) {
        const filteredData = response.data.data.filter(
          (item) => item.audioCount > 0
        );
        setAllResults(filteredData);
        setFilteredResults(filteredData);
      } else {
        Toast.show({
          type: "error",
          text1: "No Results",
          text2: "No matching data found.",
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
      setIsLoading(false);
    }
  }, [selectedFilters, selectedLevel]);

  // Local search function
  const searchLocally = useCallback(
    (query: string) => {
      setIsSearchLoading(false); // Reset loading when search completes
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

  // Debounced local search with loading
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
    []
  );

  // Fetch initial data on mount
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Trigger local search when query changes
  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  if (isLoading && !allResults.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <View style={styles.scrollContainer}>
        <View style={styles.mainHeader}>
          {filteredResults.length === 0 && !isSearchLoading && (
            <TouchableOpacity onPress={handleBackPress}>
              <CustomIcon Icon={ICONS.BackArrow} width={15} height={15} />
            </TouchableOpacity>
          )}

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
          ListEmptyComponent={
            !isLoading &&
            (searchQuery || selectedFilters.length || selectedLevel) ? (
              <View style={styles.emptyContainer}>
                <CustomText>No results found</CustomText>
              </View>
            ) : null
          }
        />
      </View>

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

export default Discover;

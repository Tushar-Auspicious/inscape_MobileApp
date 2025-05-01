import React, { Dispatch, FC, SetStateAction } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import ICONS from "../Assets/icons";
import COLORS from "../Utilities/Colors";
import { horizontalScale, hp, verticalScale, wp } from "../Utilities/Metrics";
import CustomIcon from "./CustomIcon";
import { CustomText } from "./CustomText";

type EmptyDataViewProps = {
  height?: any;
  searchData: any;
  selectedLevel: string;
  setSelectedLevel: Dispatch<SetStateAction<string>>;
  selectedFilters: string[];
  setSelectedFilters: Dispatch<SetStateAction<string[]>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  fetchFilteredData: any;
};

const EmptyDataView: FC<EmptyDataViewProps> = ({
  height = "100%",
  searchData,
  setSelectedFilters,
  setSelectedLevel,
  setSearchQuery,
  fetchFilteredData,
}) => {
  const toggleFilter = (id: string) => {
    setSelectedFilters((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <View style={[styles.container, { height }]}>
      <View
        style={{ gap: verticalScale(40), paddingVertical: verticalScale(30) }}
      >
        <CustomIcon
          Icon={ICONS.emptyDataImage}
          width={wp(50)}
          height={hp(20)}
        />
        <View style={styles.messageContainer}>
          <CustomText type="subHeading" fontFamily="bold">
            We're sorry
          </CustomText>
          <CustomText>We can't find anything.</CustomText>
        </View>
      </View>

      <View style={styles.divider} />

      <View
        style={{
          width: "100%",
          gap: verticalScale(10),
          paddingVertical: verticalScale(30),
        }}
      >
        <View style={styles.suggestionHeader}>
          <CustomText>Try searching for:</CustomText>
        </View>

        <FlatList
          data={searchData.bestFor}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
          style={{ width: " 100%", rowGap: 10 }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  toggleFilter(item);
                  fetchFilteredData();
                  setSearchQuery("");
                }}
                style={styles.suggestionButton}
              >
                <CustomText>{item}</CustomText>
              </TouchableOpacity>
            );
          }}
        />
        <FlatList
          data={searchData.level}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
          style={{ width: " 100%", rowGap: 10 }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedLevel(item);
                  fetchFilteredData();
                  setSearchQuery("");
                }}
                style={styles.suggestionButton}
              >
                <CustomText>{item}</CustomText>
              </TouchableOpacity>
            );
          }}
        />
        {/* <CustomButton
          title="Search"
          onPress={() => []}
          style={{ marginTop: verticalScale(40) }}
        /> */}
      </View>
    </View>
  );
};

export default EmptyDataView;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  messageContainer: {
    alignItems: "center",
  },
  divider: {
    height: 0.5,
    backgroundColor: COLORS.darkGrey,
    width: "100%",
  },
  suggestionHeader: {
    width: "100%",
    alignItems: "flex-start",
  },
  flatListContent: {
    alignItems: "flex-start", // Align items to the start
    borderWidth: 2,
    borderColor: "red",
  },
  columnWrapper: {
    columnGap: horizontalScale(10),
    marginVertical: verticalScale(5),
  },
  suggestionButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
    backgroundColor: COLORS.lightNavyBlue,
    borderRadius: 10,
  },
});

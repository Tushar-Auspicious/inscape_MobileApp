import { View, Text, ScrollView, Alert, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import CustomInput from "../../Components/CustomInput";
import meditationTypes from "../../Seeds/DiscoverSeeds";
import ExploreCard from "../../Components/Cards/ExploreCard";
import { verticalScale, wp } from "../../Utilities/Metrics";

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onFilterPress = () => {};

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <View style={styles.scrollContainer}>
        <CustomInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="What do you want to listen?"
          type="search"
          onFilterPress={onFilterPress}
        />

        <FlatList
          data={meditationTypes}
          numColumns={2}
          columnWrapperStyle={styles.listColumCont}
          contentContainerStyle={styles.flatListCont}
          keyExtractor={(item, index) => item.title + index.toString()}
          renderItem={({ item }) => (
            <ExploreCard
              imageUrl={item.imageUrl}
              title={item.title}
              subTitle={`${item.sessions} sessions`}
              onPress={() => {}}
              width={wp(43)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Discover;

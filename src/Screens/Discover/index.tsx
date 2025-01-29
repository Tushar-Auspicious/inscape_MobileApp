import React, { FC, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/icons";
import ExploreCard from "../../Components/Cards/ExploreCard";
import CustomIcon from "../../Components/CustomIcon";
import CustomInput from "../../Components/CustomInput";
import EmptyDataView from "../../Components/EmptyDataView";
import meditationTypes from "../../Seeds/DiscoverSeeds";
import { DiscoverProps } from "../../Typings/route";
import { wp } from "../../Utilities/Metrics";
import styles from "./style";

// Back arrow only show if no seaerch results found to show intital data

const Discover: FC<DiscoverProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedData, setSearchedData] = useState(meditationTypes);
  const onFilterPress = () => {};

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <View style={styles.scrollContainer}>
        <View style={styles.mainHeader}>
          {searchedData.length === 0 && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <CustomIcon
                onPress={() => navigation.goBack()}
                Icon={ICONS.BackArrow}
                width={15}
                height={15}
              />
            </TouchableOpacity>
          )}
          <CustomInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            isFilterIcon
            type="search"
            placeholder="Search..."
            style={{
              flex: 1,
            }}
            onFilterPress={onFilterPress}
            heigth={44}
          />
        </View>

        <FlatList
          data={searchedData}
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
          ListEmptyComponent={<EmptyDataView searchData={[]} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Discover;

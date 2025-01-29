import React, { FC, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/icons";
import ContentCard from "../../Components/Cards/ContentCard";
import CustomIcon from "../../Components/CustomIcon";
import CustomInput from "../../Components/CustomInput";
import { TrendingData } from "../../Seeds/HomeSeeds";
import { SearchHomeProps } from "../../Typings/route";
import styles from "./style";

const SearchHome: FC<SearchHomeProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchClick = () => {
    navigation.navigate("searchHome");
  };

  const handleFilterPress = () => {};

  const handleCardPress = () => {
    navigation.navigate("categories");
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <View style={styles.mainHeader}>
        <TouchableOpacity onPress={handleSearchClick}>
          <CustomIcon
            onPress={() => navigation.goBack()}
            Icon={ICONS.BackArrow}
            width={15}
            height={15}
          />
        </TouchableOpacity>
        <CustomInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          isFilterIcon
          type="search"
          placeholder="Search..."
          style={{
            flex: 1,
          }}
          onFilterPress={handleFilterPress}
          heigth={44}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <FlatList
          data={TrendingData}
          contentContainerStyle={styles.list}
          keyExtractor={(item, index) => item.title + index.toString()}
          renderItem={({ item }) => (
            <ContentCard
              title="Wondering mind"
              rating="4.8"
              duration="12 min"
              imageUrl="https://s3-alpha-sig.figma.com/img/2a38/ad1a/d9ffcda8b4ac57580fa368032f146aa7?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HsqfkWkkSozO~qIV1gKFna7IOuJbVOr2Oa1iLAEeHCwXefU3dvcaemA1jio8wIyxfqFu04s4K1aV6s6mP2JZ1wjqrx0jQ2jJu2CRSgL1QYzDhIvQFLRuqBmoXPZFGu9WxmsyVHinVy3H83CNFae~Xdv~YBJPgFCO2V55Ja9p0xpxMIW3enmA1Ktl07Pr6U~IfxXLJENRQPcfvzXQyG6K1Pe~Ndpp4H1ZR5~00fJzV~rvbU21pZYrxyvJ3F6j265rhwgqfwjLnVuujTsMCQedAQ1S1yHAg17R24zs0-k6TPDqi9TOgDXDvEcWzFU8DlI4u~RfJyfXovTSchjxsB6edg__"
              onPress={handleCardPress}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchHome;

import React, { FC } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/icons";
import ContentCard from "../../Components/Cards/ContentCard";
import ExploreCard from "../../Components/Cards/ExploreCard";
import SessionCard from "../../Components/Cards/SessionCard";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import { TrendingData, breathingSessions } from "../../Seeds/HomeSeeds";
import { HomeScreenProps } from "../../Typings/route";
import styles from "./style";

const Home: FC<HomeScreenProps> = ({ navigation }) => {
  const handleSearchClick = () => {
    navigation.navigate("categories");
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View style={styles.mainHeader}>
          <CustomText type="title" fontFamily="bold">
            Suggested for you...
          </CustomText>
          <TouchableOpacity onPress={handleSearchClick}>
            <CustomIcon Icon={ICONS.SearchWhite} width={20} height={20} />
          </TouchableOpacity>
        </View>

        <ContentCard
          title="Wondering mind"
          rating="4.8"
          duration="12 min"
          imageUrl="https://s3-alpha-sig.figma.com/img/2a38/ad1a/d9ffcda8b4ac57580fa368032f146aa7?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HsqfkWkkSozO~qIV1gKFna7IOuJbVOr2Oa1iLAEeHCwXefU3dvcaemA1jio8wIyxfqFu04s4K1aV6s6mP2JZ1wjqrx0jQ2jJu2CRSgL1QYzDhIvQFLRuqBmoXPZFGu9WxmsyVHinVy3H83CNFae~Xdv~YBJPgFCO2V55Ja9p0xpxMIW3enmA1Ktl07Pr6U~IfxXLJENRQPcfvzXQyG6K1Pe~Ndpp4H1ZR5~00fJzV~rvbU21pZYrxyvJ3F6j265rhwgqfwjLnVuujTsMCQedAQ1S1yHAg17R24zs0-k6TPDqi9TOgDXDvEcWzFU8DlI4u~RfJyfXovTSchjxsB6edg__"
          onPress={() => {}}
        />

        {/* Trending Section */}
        <View style={styles.sectionHeader}>
          <CustomText type="title" fontFamily="bold">
            Trending
          </CustomText>
          <TouchableOpacity onPress={handleSearchClick}>
            <CustomText fontFamily="semiBold">View all</CustomText>
          </TouchableOpacity>
        </View>

        <FlatList
          data={TrendingData}
          contentContainerStyle={styles.horizontalList}
          keyExtractor={(item, index) => item.title + index.toString()}
          horizontal
          renderItem={({ item }) => (
            <ContentCard
              duration={item.duration}
              imageUrl={item.imageUrl}
              rating={item.rating}
              title={item.title}
              type={item.type}
              onPress={() => {}}
            />
          )}
        />

        {/* Rain and Storm Sounds Section */}
        <View style={styles.sectionHeader}>
          <CustomText type="title" fontFamily="bold">
            Rain and Storm Sounds
          </CustomText>
          <TouchableOpacity onPress={handleSearchClick}>
            <CustomText fontFamily="semiBold">24 sessions</CustomText>
          </TouchableOpacity>
        </View>

        <FlatList
          data={TrendingData}
          contentContainerStyle={styles.horizontalList}
          keyExtractor={(item, index) => item.title + index.toString()}
          horizontal
          renderItem={({ item }) => (
            <ContentCard
              duration={item.duration}
              imageUrl={item.imageUrl}
              rating={item.rating}
              title={item.title}
              type={item.type}
              isSmall
              onPress={() => {}}
            />
          )}
        />

        {/* Explore Meditation Types Section */}
        <View style={styles.sectionHeader}>
          <CustomText type="title" fontFamily="bold">
            Explore Meditation Types
          </CustomText>
        </View>

        <FlatList
          data={TrendingData}
          contentContainerStyle={styles.horizontalList}
          keyExtractor={(item, index) => item.title + index.toString()}
          horizontal
          renderItem={({ item }) => (
            <ExploreCard
              imageUrl={item.imageUrl}
              title="Focus"
              subTitle="54 items"
              onPress={() => {}}
            />
          )}
        />

        {/* Breathing Sessions Section */}
        <View style={styles.sectionHeader}>
          <CustomText type="title" fontFamily="bold">
            Breathing Sessions
          </CustomText>
        </View>

        <FlatList
          data={breathingSessions}
          contentContainerStyle={styles.verticalList}
          keyExtractor={(item, index) => item.title + index.toString()}
          renderItem={({ item }) => (
            <SessionCard
              imageUrl={item.imageUrl}
              title={item.title}
              duration={item.duration}
              level={item.level}
              onPress={() => {}}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

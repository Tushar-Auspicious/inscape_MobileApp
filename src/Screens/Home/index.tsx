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
    navigation.navigate("searchHome");
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
          imageUrl="https://plus.unsplash.com/premium_photo-1682125853703-896a05629709?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVzaWN8ZW58MHx8MHx8fDA%3D"
          onPress={() => navigation.navigate("playerList")}
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
              onPress={() => navigation.navigate("playerList")}
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
              onPress={() => navigation.navigate("playerList")}
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
              onPress={() => navigation.navigate("playerList")}
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
          renderItem={({ item }) => {
            const trackIndex = breathingSessions.findIndex(
              (t) => t.id === item.id
            );
            return (
              <SessionCard
                imageUrl={item.imageUrl}
                title={item.title}
                duration={item.duration}
                level={item.level}
                onPress={() =>
                  navigation.navigate("player", {
                    trackList: breathingSessions.map((item) => ({
                      artist: item.title,
                      artwork: item.imageUrl,
                      title: item.title,
                      url: item.url,
                    })),
                    currentTrackIndex: trackIndex,
                  })
                }
              />
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

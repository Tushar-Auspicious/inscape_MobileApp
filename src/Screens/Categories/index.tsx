import React, { FC, useState } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/icons";
import ContentCard from "../../Components/Cards/ContentCard";
import CustomIcon from "../../Components/CustomIcon";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import { TrendingData } from "../../Seeds/HomeSeeds";
import { CategoryProps } from "../../Typings/route";
import styles from "./style";

const Categories: FC<CategoryProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://s3-alpha-sig.figma.com/img/4ee4/101f/0aefe60e15d8315db07fb95c1fbc17c9?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ehsz0y7h8PZhA1RJ1lPiqFFyEPQ8Qe2s1An2xn829OwM9hHU4AUEGgqO3a1ZjEyLFUHYLtHv0S9h7Z2vXmQPl9pKLqKO3DjTjpXEpQ72PKJLCr6SBOfSjt2PmXwE5jucDHfsQebZmN9H5YCJLJeEQUUjdOBEiPRWt3QOGMBTHxD69qbGhN7p46Rt4BtY0Z93yeh6sereZ9IwM-3TLwdtbSslYgG6Cc91yugq8pca6wChvwY44s9kn5XKV8cv9f0uWbFHTcWoYQkEwjO3dYbTc0T3bADriq~mX0cMdZX~ZvFzqQomqHdAqys50N-23YKpmayvQ1DMxd-l9qBdlZtRHQ__",
        }}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.imageContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <CustomIcon Icon={ICONS.BackArrow} height={12} width={12} />
          </TouchableOpacity>

          <View style={styles.imageTextContent}>
            <CustomText type="heading" fontFamily="bold">
              Sounds of Nature
            </CustomText>

            <CustomText>34 practices</CustomText>
            <CustomText>
              Sounds of nature have a replenishing and restorative effect on the
              body.
            </CustomText>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.mainHeader}>
        <CustomInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          type="search"
          placeholder="Search..."
          style={styles.searchInput}
          heigth={44}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View style={styles.sectionHeader}>
          <CustomText type="title" fontFamily="bold">
            Rain and Storm Sounds
          </CustomText>
          <TouchableOpacity onPress={() => {}}>
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

        <View style={styles.sectionHeader}>
          <CustomText type="title" fontFamily="bold">
            At the Beach
          </CustomText>
          <TouchableOpacity onPress={() => {}}>
            <CustomText fontFamily="semiBold">20 sessions</CustomText>
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

        <View style={styles.sectionHeader}>
          <CustomText type="title" fontFamily="bold">
            Wandering in Nature
          </CustomText>
          <TouchableOpacity onPress={() => {}}>
            <CustomText fontFamily="semiBold">14 sessions</CustomText>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Categories;

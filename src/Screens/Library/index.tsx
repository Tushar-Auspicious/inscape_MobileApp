import React, { FC } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SessionCard from "../../Components/Cards/SessionCard";
import styles from "./style";
import songsDownloaded from "../../Seeds/LibrarySeeds";
import { CustomText } from "../../Components/CustomText";
import { LibraryProps } from "../../Typings/route";

const Library: FC<LibraryProps> = ({ navigation }) => {
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <View style={styles.scrollContainer}>
        <CustomText type="title" fontFamily="bold">
          Songs Downloaded
        </CustomText>
        <FlatList
          data={songsDownloaded}
          contentContainerStyle={styles.flatListCont}
          keyExtractor={(item, index) => item.title + index.toString()}
          renderItem={({ item }) => {
            const trackIndex = songsDownloaded.findIndex(
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
                    trackList: songsDownloaded.map((item) => ({
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
      </View>
    </SafeAreaView>
  );
};

export default Library;

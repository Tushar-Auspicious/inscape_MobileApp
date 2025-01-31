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
          renderItem={({ item }) => (
            <SessionCard
              imageUrl={item.imageUrl}
              title={item.title}
              duration={item.duration}
              level={item.level}
              onPress={() =>
                navigation.navigate("player", {
                  artist: item.level,
                  img: item.imageUrl,
                  title: item.title,
                })
              }
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Library;

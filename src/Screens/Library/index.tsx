import React, { FC, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SessionCard from "../../Components/Cards/SessionCard";
import { CustomText } from "../../Components/CustomText";
import { LibraryProps } from "../../Typings/route";
import { audioItem, getDownloadedAudios } from "../../Utilities/Helpers";
import styles from "./style";

const Library: FC<LibraryProps> = ({ navigation }) => {
  const [audios, setAudios] = useState<audioItem[]>([]);

  const getDownloadedAudio = async () => {
    const result = await getDownloadedAudios();
    console.log(result);
    if (result.length > 0) {
      setAudios(result);
    }
  };

  useEffect(() => {
    getDownloadedAudio();
  }, []);

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <View style={styles.scrollContainer}>
        <CustomText type="title" fontFamily="bold">
          Meditations Downloaded
        </CustomText>
        {/* <FlatList
          data={audios}
          contentContainerStyle={styles.flatListCont}
          keyExtractor={(item, index) => item.title + index.toString()}
          renderItem={({ item, index }) => {
            return (
              <SessionCard
                imageUrl={item.artwork}
                title={item.title}
                duration={item.duration}
                level={item.level}
                onPress={() => {
                  console.log(
                    audios.map((item) => ({
                      artwork: item.artwork,
                      collectionName: item.title,
                      title: item.title,
                      description: item.title,
                      duration: item.duration,
                      url: item.url,
                      level: item.level,
                    }))
                  );

                  // navigation.navigate("player", {
                  //   trackList: songsDownloaded.map((item) => ({
                  //     artwork: item.imageUrl,
                  //     collectionName: item.title,
                  //     title: item.title,
                  //     description: item.title,
                  //     duration: timeStringToSeconds(item.duration),
                  //     url: item.url,
                  //     level: item.level,
                  //   })),
                  //   currentTrackIndex: index,
                  // });
                }}
              />
            );
          }}
        /> */}

        <CustomText style={{ textAlign: "center" }}>
          Work in Progress...
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

export default Library;

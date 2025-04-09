import React, { FC, useCallback, useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SessionCard from "../../Components/Cards/SessionCard";
import { CustomText } from "../../Components/CustomText";
import { LibraryProps } from "../../Typings/route";
import {
  audioItem,
  getDownloadedAudios,
  secondsToTimeString,
  timeStringToSeconds,
} from "../../Utilities/Helpers";
import styles from "./style";
import { useIsFocused } from "@react-navigation/native";
import Loader from "../../Components/Loader";
import COLORS from "../../Utilities/Colors";

const Library: FC<LibraryProps> = ({ navigation }) => {
  const [audios, setAudios] = useState<audioItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  const getDownloadedAudio = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getDownloadedAudios();
      setAudios(result);
    } catch (error) {
      console.error("Error fetching downloaded audios:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      getDownloadedAudio();
    }
  }, [isFocused]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <CustomText
        type="subHeading"
        fontFamily="bold"
        style={styles.emptyStateText}
      >
        No Downloaded Meditations
      </CustomText>
      <CustomText style={styles.emptyStateSubText}>
        Your downloaded meditations will appear here
      </CustomText>
    </View>
  );

  const handleAudioPress = (index: number) => {
    navigation.navigate("player", {
      trackList: audios.map((item) => ({
        id: item.id,
        artwork: item.artwork,
        collectionName: item.collectionName,
        title: item.title,
        description: item.description,
        duration: timeStringToSeconds(item.duration),
        url: item.url,
        level:
          typeof audios[index].level === "object"
            ? audios[index].level.name
            : audios[index].level,
      })),
      currentTrackIndex: index,
      isFromLibrary: true,
    });
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <View style={styles.scrollContainer}>
        {audios.length > 0 && (
          <CustomText type="title" fontFamily="bold">
            Meditations Downloaded
          </CustomText>
        )}

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.white} />
          </View>
        ) : (
          <FlatList
            data={audios}
            contentContainerStyle={[
              styles.flatListCont,
              audios.length === 0 && styles.emptyListContainer,
            ]}
            keyExtractor={(item, index) => item.title + index.toString()}
            ListEmptyComponent={renderEmptyState}
            renderItem={({ item, index }) => {
              return (
                <SessionCard
                  imageUrl={item.artwork}
                  title={item.title}
                  duration={secondsToTimeString(item.duration)}
                  level={item.level}
                  onPress={() => handleAudioPress(index)}
                />
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Library;

// import { useIsFocused } from "@react-navigation/native";
import { IMAGE_BASE_URL } from "@env";
import { useIsFocused } from "@react-navigation/native";
import React, { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { deleteData, fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import ICONS from "../../Assets/icons";
import SessionCard from "../../Components/Cards/SessionCard";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import Loader from "../../Components/Loader";
import DeleteModal from "../../Components/Modals/DeleteModal";
import NoInternetCard from "../../Components/NoInternetCard";
import useNetworkStatus from "../../Hooks/useNetworkStatus";
import { BestFor, Level } from "../../Typings/apiTypes";
import { LibraryProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import STORAGE_KEYS from "../../Utilities/Constants";
import { timeStringToSeconds } from "../../Utilities/Helpers";
import {
  getLocalStorageData,
  storeLocalStorageData,
} from "../../Utilities/Storage";
import styles from "./style";

export interface getDownloadedAudios {
  _id: string;
  user_id: string;
  audio_id: downloadwdAudio;
  __v: number;
  createdAt: string;
  downloadUrl: string;
  has_downloaded: boolean;
  has_listened: boolean;
  updatedAt: string;
}

export interface downloadwdAudio {
  _id: string;
  songName: string;
  collectionType: CollectionType;
  levels: Level[];
  bestFor: BestFor[];
  audioUrl: string;
  imageUrl: string;
  description: string;
  duration: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CollectionType {
  _id: string;
  name: string;
  imageUrl: string;
  levels: Level[];
  bestFor: BestFor[];
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Library: FC<LibraryProps> = ({ navigation }) => {
  const [audios, setAudios] = useState<getDownloadedAudios[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  const { isConnected, retryConnection } = useNetworkStatus();
  const previousConnectionRef = React.useRef<boolean | null>(null);
  const [refreshing, setRefreshing] = useState(false); // For pull-to-refresh
  const [selectedAudioForDelete, setSelectedAudioForDelete] = useState<
    string | null
  >(null);

  const [isdeleteModalVisible, setIsdeleteModalVisible] = useState(false);

  const getDownloadedAudio = async (forceRefresh = false) => {
    try {
      if (!forceRefresh) {
        setIsLoading(true);
      } else {
        setRefreshing(true);
      }

      // Load from local storage first
      const cachedData = await getLocalStorageData(
        STORAGE_KEYS.downloadedAudios
      );
      if (cachedData && !isConnected) {
        setAudios(cachedData); // Use cached data if offline
      }

      // Fetch from server if online
      if (isConnected) {
        const result = await fetchData<getDownloadedAudios[]>(
          ENDPOINTS.audioHistory
        );
        setAudios(result.data.data);
        await storeLocalStorageData(
          STORAGE_KEYS.downloadedAudios,
          result.data.data
        );
      }
    } catch (error) {
      console.error("Error fetching downloaded audios:", error);
      if (!audios.length) {
        setAudios([]); // Fallback to empty array only if no data exists
      }
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getDownloadedAudio();
    }
  }, [isFocused]);

  // Monitor network status changes and refresh data when connection is restored
  useEffect(() => {
    // If connection was previously offline and now it's online, refresh the data
    if (previousConnectionRef.current === false && isConnected === true) {
      console.log("Network connection restored, refreshing library data...");
      getDownloadedAudio(true); // Force refresh when connection is restored
    }

    // Update the previous connection state
    previousConnectionRef.current = isConnected;
  }, [isConnected, getDownloadedAudio]);

  const onRefresh = () => {
    getDownloadedAudio(true);
  };

  const handleAudioPress = (index: number) => {
    navigation.navigate("player", {
      trackList: audios.map((item) => ({
        id: item._id,
        artwork: IMAGE_BASE_URL + item.audio_id.imageUrl,
        collectionName: item.audio_id.collectionType.name,
        title: item.audio_id.songName,
        description: item.audio_id.description,
        duration: timeStringToSeconds(item.audio_id.duration),
        url: IMAGE_BASE_URL + item.audio_id.audioUrl,
        level: audios[index].audio_id?.levels?.[0]?.name || "Basic",
      })),
      currentTrackIndex: index,
      isFromLibrary: true,
    });
  };

  // Show no internet card when offline
  if (!isConnected) {
    return (
      <SafeAreaView style={styles.container}>
        <NoInternetCard
          onRetry={() => {
            retryConnection();
          }}
        />
      </SafeAreaView>
    );
  }

  // Show loading indicator when initially loading
  if (isLoading && !refreshing && !audios.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <View style={styles.scrollContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.white} />
          </View>
        ) : (
          <FlatList
            data={audios}
            contentContainerStyle={[styles.flatListCont]}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.darkNavyBlue]}
                tintColor={COLORS.white}
              />
            }
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => {
              return (
                <SessionCard
                  onPressDelete={() => {
                    setIsdeleteModalVisible(true);
                    setSelectedAudioForDelete(item?._id);
                  }}
                  imageUrl={IMAGE_BASE_URL + item?.audio_id?.imageUrl}
                  title={item?.audio_id?.songName}
                  duration={item?.audio_id?.duration}
                  level={item?.audio_id?.levels[0]?.name || "Basic"}
                  onPress={() => handleAudioPress(index)}
                />
              );
            }}
            ListEmptyComponent={
              !isLoading && !refreshing ? (
                <View style={styles.emptyStateContainer}>
                  <CustomIcon
                    Icon={ICONS.emptyDataImage}
                    width={150}
                    height={150}
                    style={styles.emptyStateIcon}
                  />
                  <CustomText
                    type="subHeading"
                    fontFamily="bold"
                    style={styles.emptyStateText}
                  >
                    Your Library is Empty
                  </CustomText>
                  <CustomText style={styles.emptyStateSubText}>
                    Download meditations to listen offline or save your
                    favorites here
                  </CustomText>
                  <TouchableOpacity
                    style={styles.discoverButton}
                    onPress={() => navigation.navigate("discoverTab")}
                  >
                    <CustomText style={styles.discoverButtonText}>
                      Explore Meditations
                    </CustomText>
                  </TouchableOpacity>
                </View>
              ) : null
            }
          />
        )}
      </View>
      <DeleteModal
        isModalVisible={isdeleteModalVisible}
        onClose={() => setIsdeleteModalVisible(false)}
        onPressDelete={async () => {
          try {
            await deleteData(
              `${ENDPOINTS.audioHistory}/${selectedAudioForDelete}`
            );
            const updatedAudios = audios.filter(
              (audio) => audio._id !== selectedAudioForDelete
            );
            setAudios(updatedAudios); // Update state immediately
            await storeLocalStorageData(
              STORAGE_KEYS.downloadedAudios,
              updatedAudios
            ); // Sync local storage
            setIsdeleteModalVisible(false);
          } catch (error) {
            console.error("Error deleting audio:", error);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default Library;

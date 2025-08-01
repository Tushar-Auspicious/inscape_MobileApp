import { IMAGE_BASE_URL } from "@env";
import { useIsFocused } from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
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
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const isFocused = useIsFocused();

  const { isConnected, retryConnection } = useNetworkStatus();
  const previousConnectionRef = useRef<boolean | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedAudioForDelete, setSelectedAudioForDelete] = useState<
    string | null
  >(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const getDownloadedAudio = useCallback(
    async (forceRefresh = false) => {
      // Set fetching state
      setIsFetchingData(true);
      if (forceRefresh) {
        setRefreshing(true);
      }

      try {
        const cachedData = await getLocalStorageData(
          STORAGE_KEYS.downloadedAudios
        );

        // Fetch from server if online, or if forceRefresh is true AND online
        if (isConnected) {
          const result = await fetchData<getDownloadedAudios[]>(
            ENDPOINTS.audioHistory
          );
          if (result.data && Array.isArray(result.data.data)) {
            setAudios(result.data.data);
            await storeLocalStorageData(
              STORAGE_KEYS.downloadedAudios,
              result.data.data
            );
          }
        } else if (!cachedData || cachedData.length === 0) {
          // If offline AND no cached data, we mark initial load complete
          // to show NoInternetCard or EmptyState directly, without waiting
          setIsInitialLoadComplete(true);
        }
      } catch (error) {
        console.error("Error fetching downloaded audios:", error);
        // Ensure initial load completes even on error
        if (!isInitialLoadComplete) {
          setIsInitialLoadComplete(true);
        }
      } finally {
        setIsFetchingData(false);
        setRefreshing(false);
        // Crucial: Ensure initial load is marked complete ONLY after all attempts (cache + network) are done
        setIsInitialLoadComplete(true);
      }
    },
    [isConnected, isInitialLoadComplete]
  );

  useEffect(() => {
    if (isFocused) {
      getDownloadedAudio();
    }
  }, [isFocused, getDownloadedAudio]);

  useEffect(() => {
    if (previousConnectionRef.current === false && isConnected === true) {
      console.log("Network connection restored, refreshing library data...");
      getDownloadedAudio(true);
    }
    previousConnectionRef.current = isConnected;
  }, [isConnected, getDownloadedAudio]);

  const onRefresh = useCallback(() => {
    getDownloadedAudio(true);
  }, [getDownloadedAudio]);

  const handleAudioPress = useCallback(
    (index: number) => {
      navigation.navigate("player", {
        trackList: audios?.map((item) => ({
          id: item._id,
          artwork: IMAGE_BASE_URL + item.audio_id?.imageUrl,
          collectionName: item.audio_id?.collectionType?.name,
          title: item.audio_id?.songName,
          description: item.audio_id?.description,
          duration: timeStringToSeconds(item.audio_id?.duration),
          url: IMAGE_BASE_URL + item.audio_id?.audioUrl,
          level: audios[index].audio_id?.levels?.[0]?.name || "Basic",
        })),
        currentTrackIndex: index,
        isFromLibrary: true,
      });
    },
    [audios, navigation]
  );

  const handleDeleteAudio = useCallback(async () => {
    if (!selectedAudioForDelete) return;

    const originalAudios = audios;
    try {
      const updatedAudios = audios.filter(
        (audio) => audio._id !== selectedAudioForDelete
      );
      setAudios(updatedAudios);
      setIsDeleteModalVisible(false);

      await deleteData(`${ENDPOINTS.audioHistory}/${selectedAudioForDelete}`);
      await storeLocalStorageData(STORAGE_KEYS.downloadedAudios, updatedAudios);
    } catch (error) {
      console.error("Error deleting audio:", error);
      setAudios(originalAudios);
    }
  }, [audios, selectedAudioForDelete]);

  if (!isInitialLoadComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  // 2. Show No Internet Card if initial load is complete, we are offline, and there are no audios.
  if (!isConnected && audios.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <NoInternetCard
          onRetry={() => {
            retryConnection();
            getDownloadedAudio();
          }}
        />
      </SafeAreaView>
    );
  }

  // 3. Main content (FlatList)
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <View style={styles.scrollContainer}>
        <FlatList
          data={audios}
          contentContainerStyle={[
            styles.flatListCont,
            audios.length === 0 && styles.emptyListContent,
          ]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.darkNavyBlue]}
              tintColor={COLORS.white}
            />
          }
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <SessionCard
              onPressDelete={() => {
                setIsDeleteModalVisible(true);
                setSelectedAudioForDelete(item?._id);
              }}
              imageUrl={IMAGE_BASE_URL + item?.audio_id?.imageUrl}
              title={item?.audio_id?.songName}
              duration={item?.audio_id?.duration}
              level={item?.audio_id?.levels[0]?.name || "Basic"}
              onPress={() => handleAudioPress(index)}
            />
          )}
          ListEmptyComponent={
            isInitialLoadComplete &&
            !isFetchingData &&
            audios.length === 0 &&
            !refreshing ? (
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
                  No downloaded files found.
                </CustomText>
                {/* <CustomText style={styles.emptyStateSubText}>
                  Download meditations to listen offline or save your favorites
                  here
                </CustomText> */}
                {/* <TouchableOpacity
                  style={styles.discoverButton}
                  onPress={() => navigation.navigate("discoverTab")}
                >
                  <CustomText style={styles.discoverButtonText}>
                    Explore Meditations
                  </CustomText>
                </TouchableOpacity> */}
              </View>
            ) : (
              <Loader />
            )
          }
        />
      </View>
      <DeleteModal
        isModalVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onPressDelete={handleDeleteAudio}
      />
    </SafeAreaView>
  );
};

export default Library;

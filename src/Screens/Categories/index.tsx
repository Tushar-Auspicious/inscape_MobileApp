import { IMAGE_BASE_URL } from "@env";
import React, { FC, useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import ICONS from "../../Assets/icons";
import ContentCard from "../../Components/Cards/ContentCard";
import CustomIcon from "../../Components/CustomIcon";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import Loader from "../../Components/Loader";
import { GetCollectionResponse } from "../../Typings/apiTypes";
import { CategoryProps } from "../../Typings/route";
import { horizontalScale } from "../../Utilities/Metrics";
import styles from "./style";

const Categories: FC<CategoryProps> = ({ navigation, route }) => {
  const { id } = route.params;

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [collectionData, setCollectionData] = useState<GetCollectionResponse>();
  const [filteredAudioFiles, setFilteredAudioFiles] = useState<any[]>([]); // State for filtered results

  const handleCardPress = () => {
    if (collectionData && collectionData.collection._id) {
      navigation.navigate("playerList", {
        id: collectionData?.collection._id,
      });
    }
  };

  const getCollectionData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchData<GetCollectionResponse>(
        `${ENDPOINTS.collectionData}${id}/audios`
      );
      if (response.data.success) {
        setCollectionData(response.data.data);
        setFilteredAudioFiles(response.data.data.audioFiles); // Initialize filtered list
      }
    } catch (error: any) {
      console.error("Home data fetch error:", error);
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  // Search filter function
  const filterAudioFiles = useCallback(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setFilteredAudioFiles(collectionData?.audioFiles || []);
    } else {
      const filtered = collectionData?.audioFiles.filter((item) =>
        item.songName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAudioFiles(filtered || []);
    }
  }, [searchQuery, collectionData]);

  useEffect(() => {
    getCollectionData();
  }, [getCollectionData]);

  // Update filtered list whenever searchQuery or collectionData changes
  useEffect(() => {
    filterAudioFiles();
  }, [searchQuery, collectionData, filterAudioFiles]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <ImageBackground
        source={{
          uri: IMAGE_BASE_URL + collectionData?.collection.imageUrl,
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
              {collectionData?.collection.name}
            </CustomText>

            <CustomText>{`${collectionData?.audioFiles.length} practices`}</CustomText>
            <ScrollView>
              <CustomText>{collectionData?.collection.description}</CustomText>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.mainHeader}>
        <CustomInput
          value={searchQuery}
          onChangeText={(text) =>
            setSearchQuery(text.trim().length === 0 ? text.trim() : text)
          }
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
        <FlatList
          data={filteredAudioFiles} // Use filteredAudioFiles instead of collectionData.audioFiles
          contentContainerStyle={styles.horizontalList}
          keyExtractor={(item, index) => item._id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: horizontalScale(30),
          }}
          renderItem={({ item }) => (
            <ContentCard
              duration={item.duration}
              imageUrl={IMAGE_BASE_URL + item.imageUrl}
              title={item.songName}
              type={"potrait"}
              isSmall
              onPress={handleCardPress}
            />
          )}
          ListEmptyComponent={() => {
            return (
              <CustomText style={{ textAlign: "center" }}>
                No results found
              </CustomText>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Categories;

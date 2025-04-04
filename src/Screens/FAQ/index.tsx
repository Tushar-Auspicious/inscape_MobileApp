import React, { FC, useCallback, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import ICONS from "../../Assets/icons";
import CustomAccordion from "../../Components/CustomAccordian";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import Loader from "../../Components/Loader";
import { FAQItem, GetAllFaqResponse } from "../../Typings/apiTypes";
import { FAQProps } from "../../Typings/route";
import styles from "./style";

const MemoizedCustomAccordion = React.memo(CustomAccordion);

const FAQ: FC<FAQProps> = ({ navigation }) => {
  const [getDataLoading, setGetDataLoading] = useState(false);
  const [faqData, setFaqData] = useState<FAQItem[]>([]);

  const getFAQData = async () => {
    setGetDataLoading(true);
    try {
      const response = await fetchData<GetAllFaqResponse>(ENDPOINTS.getAllFAQs);
      if (response.data.success) {
        console.log(response.data.data);
        setFaqData(response.data.data);
      }
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong.",
      });
    } finally {
      setGetDataLoading(false);
    }
  };

  useEffect(() => {
    getFAQData();
  }, []);

  // Memoize the renderItem function
  const renderItem = useCallback(
    ({ item, index }: { item: FAQItem; index: number }) => (
      <MemoizedCustomAccordion title={item.question} content={item.answer} />
    ),
    [] // No dependencies since it only uses item and index from FlatList
  );

  // Memoize the keyExtractor function
  const keyExtractor = useCallback((item: FAQItem) => item._id, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CustomText type="title" fontFamily="bold">
          FAQ
        </CustomText>
        {navigation.canGoBack() && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.backArrowCont}
          >
            <CustomIcon Icon={ICONS.BackArrow} height={15} width={15} />
          </TouchableOpacity>
        )}
      </View>
      {getDataLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={faqData}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
};

// Memoize the FAQ component to prevent re-renders when navigation prop doesn't change
export default React.memo(FAQ);

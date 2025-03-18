import React, { FC, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/icons";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import { FAQProps } from "../../Typings/route";
import styles from "./style";
import CustomInput from "../../Components/CustomInput";
import { verticalScale } from "../../Utilities/Metrics";
import CustomAccordion from "../../Components/CustomAccordian";
import { accordionData } from "../../Seeds/SettingsSeeds";

const FAQ: FC<FAQProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

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

      <FlatList
        data={accordionData}
        keyExtractor={(item, index) => item.title + index.toString()}
        renderItem={({ item, index }) => (
          <CustomAccordion
            key={index.toString() + item.title}
            title={item.title}
            content={item.content}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default FAQ;

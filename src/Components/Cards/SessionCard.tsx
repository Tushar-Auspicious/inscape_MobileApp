import React, { FC } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ICONS from "../../Assets/icons";
import { horizontalScale, verticalScale, wp } from "../../Utilities/Metrics";
import CustomIcon from "../CustomIcon";
import { CustomText } from "../CustomText";
import FastImage from "react-native-fast-image";

type SessionCardrops = {
  imageUrl: string;
  title: string;
  duration: string;
  level: string;
  onPress: () => void;
  onPressDelete?: () => void;
};

const SessionCard: FC<SessionCardrops> = ({
  imageUrl,
  title,
  duration,
  level,
  onPress,
  onPressDelete,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.cardContainer}>
      <FastImage
        source={{ uri: `${imageUrl}?width=200&height=200`, priority: "high" }}
        style={styles.image}
      />
      <View style={styles.content}>
        <CustomText type="subTitle" fontFamily="semiBold">
          {title}
        </CustomText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: horizontalScale(3),
          }}
        >
          <CustomIcon Icon={ICONS.ClockBlue} width={14} height={14} />
          <CustomText type="small" fontFamily="bold">
            {duration}
          </CustomText>
        </View>
        <CustomText type="small">{level}</CustomText>
      </View>
      {onPressDelete && (
        <TouchableOpacity
          style={{
            borderRadius: 10,
            backgroundColor: "#00000010",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={onPressDelete}
        >
          <CustomIcon Icon={ICONS.deleteIcon} height={20} width={20} />
        </TouchableOpacity>
      )}
    </Pressable>
  );
};

export default SessionCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    marginVertical: verticalScale(10),
    borderRadius: verticalScale(10),
    alignSelf: "center",
    gap: horizontalScale(10),
  },
  image: {
    height: wp(19),
    width: wp(19),
    borderRadius: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    gap: verticalScale(5),
  },
});

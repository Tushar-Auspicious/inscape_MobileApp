import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import { horizontalScale, verticalScale, wp } from "../../Utilities/Metrics";
import { CustomText } from "../CustomText";
import ICONS from "../../Assets/icons";
import CustomIcon from "../CustomIcon";
import COLORS from "../../Utilities/Colors";
type SessionCardrops = {
  imageUrl: string;
  title: string;
  duration: string;
  level: string;
  onPress: () => void;
};

const SessionCard: FC<SessionCardrops> = ({
  imageUrl,
  title,
  duration,
  level,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.cardContainer}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
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
    </TouchableOpacity>
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

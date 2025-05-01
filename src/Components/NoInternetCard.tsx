import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import ICONS from "../Assets/icons";
import COLORS from "../Utilities/Colors";
import { horizontalScale, verticalScale } from "../Utilities/Metrics";
import CustomButton from "./Buttons/CustomButton";
import CustomIcon from "./CustomIcon";
import { CustomText } from "./CustomText";
import useNetworkStatus from "../Hooks/useNetworkStatus";

interface NoInternetCardProps {
  onRetry?: () => void;
}

const NoInternetCard: FC<NoInternetCardProps> = ({ onRetry }) => {
  const { retryConnection } = useNetworkStatus();
  return (
    <View style={styles.noInternetContainer}>
      <CustomIcon
        Icon={ICONS.NoInternetConnectIcon}
        width={verticalScale(100)}
        height={verticalScale(100)}
      />
      <CustomText type="title" fontFamily="bold">
        No internet connection
      </CustomText>
      <CustomText type="small" style={[{ textAlign: "center" }]}>
        Seems like you have a few quiet days... How about booking some 'me
        time'?
      </CustomText>
      <CustomButton
        style={{ paddingVertical: 12, marginTop: verticalScale(20) }}
        textSize={"small"}
        title="Try again"
        onPress={() => {
          retryConnection();
          // Call the onRetry callback if provided
          if (onRetry) {
            onRetry();
          }
        }}
      />
    </View>
  );
};

export default NoInternetCard;

const styles = StyleSheet.create({
  noInternetContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: verticalScale(50),
    gap: verticalScale(10),
    backgroundColor: COLORS.darkBlue,
  },

  tryAgainButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: verticalScale(5),
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 5,
    elevation: 2,
  },
});

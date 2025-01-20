import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import COLORS from "../../Utilities/Colors";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  disabled?: boolean;
};

const CustomButton: FC<CustomButtonProps> = ({
  title,
  onPress,
  backgroundColor = COLORS.navyBlue,
  textColor = COLORS.white,
  style,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.button,
        { backgroundColor: backgroundColor, opacity: disabled ? 0.5 : 1 },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});

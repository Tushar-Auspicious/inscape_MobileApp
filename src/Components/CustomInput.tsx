import React, { FC, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ICONS from "../Assets/icons";
import COLORS from "../Utilities/Colors";
import { horizontalScale, responsiveFontSize } from "../Utilities/Metrics";
import CustomIcon from "./CustomIcon";

type CustomInputProps = {
  placeholder: string;
  type?: "text" | "password" | "search";
  onChangeText: (text: string) => void;
  value: string;
  style?: object;
  onFilterPress?: () => void;
};

const CustomInput: FC<CustomInputProps> = ({
  placeholder,
  onChangeText,
  value,
  style,
  type = "text",
  onFilterPress,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false); // State to toggle password visibility

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View
      style={[
        styles.container, // Base container style
        style, // Additional custom styles
        type === "search" && { gap: horizontalScale(10) }, // Add gap for search type
      ]}
    >
      {/* Render a search icon for search type */}
      {type === "search" && (
        <CustomIcon Icon={ICONS.SearchWhite} height={20} width={20} />
      )}

      {/* Main input field */}
      <TextInput
        style={styles.input} // Input field style
        placeholder={placeholder} // Placeholder text
        placeholderTextColor={COLORS.white} // Placeholder text color
        secureTextEntry={type === "password" && !isPasswordVisible} // Hide input text for password type if visibility is off
        onChangeText={onChangeText} // Handle text change
        value={value} // Display current value
      />

      {/* Toggle password visibility for password type */}
      {type === "password" && (
        <TouchableOpacity
          style={styles.iconContainer} // Style for the icon container
          onPress={togglePasswordVisibility} // Toggle visibility on icon press
        >
          <Image source={ICONS.eyesOff} style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
      )}

      {/* Render filter icon for search type */}
      {type === "search" && (
        <CustomIcon
          onPress={onFilterPress} // Trigger filter press callback
          Icon={ICONS.Filter}
          height={20}
          width={20}
        />
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: horizontalScale(15),
    backgroundColor: COLORS.lightNavyBlue,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: responsiveFontSize(14),
    color: COLORS.white,
  },
  iconContainer: {
    marginLeft: 10,
  },
});

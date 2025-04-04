import React, { FC, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ICONS from "../Assets/icons";
import COLORS from "../Utilities/Colors";
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from "../Utilities/Metrics";
import CustomIcon from "./CustomIcon";
import { CustomText } from "./CustomText";
import DatePicker from "react-native-date-picker";
import dayjs from "dayjs";

type CustomInputProps = {
  placeholder: string;
  type?: "text" | "password" | "search" | "date";
  onChangeText: (text: string) => void;
  value: string;
  style?: object;
  isFilterIcon?: boolean;
  onFilterPress?: () => void;
  label?: string;
  heigth?: number;
  disabled?: boolean;
};

const CustomInput: FC<CustomInputProps> = ({
  placeholder,
  onChangeText,
  value,
  style,
  type = "text",
  label,
  isFilterIcon = false,
  onFilterPress,
  heigth = 56,
  disabled = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false); // State to toggle password visibility

  // Date Picker
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Handle date selection
  const handleConfirm = (date: Date) => {
    setPickerVisible(false);
    setSelectedDate(date);
    if (type === "date") {
      const formattedDate = dayjs(date).format("D[th] MMM YYYY");
      onChangeText(formattedDate);
    }
  };
  const handleCancel = () => {
    setPickerVisible(false);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View
      style={[
        style,
        {
          gap: verticalScale(5),
        },
      ]}
    >
      {label && <CustomText fontFamily="medium">{label}</CustomText>}

      <View
        style={[
          styles.container, // Base container style
          type === "search" && { gap: horizontalScale(10) }, // Add gap for search type
        ]}
      >
        {/* Render a search icon for search type */}
        {type === "search" && (
          <CustomIcon Icon={ICONS.SearchWhite} height={20} width={20} />
        )}
        <TouchableOpacity
          activeOpacity={0.9}
          style={[{ flex: 1, height: heigth }]}
          disabled={disabled ? disabled : type !== "date"}
          onPress={() => {
            type === "date" && setPickerVisible(!isPickerVisible);
          }}
        >
          <View
            pointerEvents={type === "date" ? "none" : "auto"}
            style={{ flex: 1, opacity: disabled ? 0.7 : 1 }}
          >
            <TextInput
              style={[styles.input]} // Input field style
              placeholder={placeholder} // Placeholder text
              placeholderTextColor={COLORS.white} // Placeholder text color
              secureTextEntry={type === "password" && !isPasswordVisible} // Hide input text for password type if visibility is off
              onChangeText={onChangeText} // Handle text change
              value={value} // Display current value
              editable={disabled ? false : type !== "date"}
            />
          </View>
        </TouchableOpacity>

        {type === "date" && (
          <>
            <DatePicker
              modal
              open={isPickerVisible}
              date={selectedDate || new Date()}
              mode={type}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          </>
        )}

        {/* Toggle password visibility for password type */}
        {type === "password" && (
          <TouchableOpacity
            style={styles.iconContainer} // Style for the icon container
            onPress={togglePasswordVisibility} // Toggle visibility on icon press
          >
            <CustomIcon
              Icon={isPasswordVisible ? ICONS.eyeoffIcon : ICONS.eyeOnIcon}
              height={20}
              width={20}
            />
          </TouchableOpacity>
        )}

        {/* Render filter icon for search type */}
        {type === "search" && isFilterIcon && (
          <CustomIcon
            onPress={onFilterPress} // Trigger filter press callback
            Icon={ICONS.Filter}
            height={20}
            width={20}
          />
        )}
      </View>
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
    fontSize: responsiveFontSize(14),
    color: COLORS.white,
  },
  iconContainer: {
    marginLeft: 10,
  },
});

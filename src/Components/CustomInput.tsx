import React, { FC, forwardRef, useState } from "react";
import {
  Alert,
  Image,
  PixelRatio,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
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

type CustomInputProps = TextInputProps & {
  placeholder: string;
  type?: "text" | "password" | "search" | "date";
  onChangeText: (text: string) => void;
  value: string;
  style?: any;
  isFilterIcon?: boolean;
  onFilterPress?: () => void;
  label?: string;
  height?: number; // Renamed 'heigth' to 'height' for consistency and correctness
  disabled?: boolean;
  maxDate?: Date;
  multiline?: boolean; // New prop for multiline support
  numberOfLines?: number; // New prop to specify initial number of lines
};

const CustomInput = forwardRef<TextInput, CustomInputProps>(
  (
    {
      placeholder,
      onChangeText,
      value,
      style,
      type = "text",
      label,
      isFilterIcon = false,
      onFilterPress,
      height = 56, // Default height for single-line input
      disabled = false,
      maxDate = new Date(),
      multiline = false, // Default to false
      numberOfLines = 1, // Default to 1 line
      ...rest
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    // Date Picker
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const systemScale = PixelRatio.getFontScale();
    const maxScale = 1.2;
    const cappedScale = Math.min(systemScale, maxScale);

    // Adjusted font size based on cap
    const baseFontSize = responsiveFontSize(14);
    const adjustedFontSize = (baseFontSize / systemScale) * cappedScale;

    // Handle date selection
    const handleConfirm = (date: Date) => {
      setPickerVisible(false);
      setSelectedDate(date);
      if (type === "date") {
        const formattedDate = dayjs(date).format("D[th] MMM YYYY"); // Corrected format string
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
            styles.container,
            type === "search" && { gap: horizontalScale(10) },
            multiline && {
              height: "auto",
              minHeight: height,
              alignItems: "flex-start",
              paddingVertical: verticalScale(10),
            }, // Adjust container for multiline
          ]}
        >
          {type === "search" && (
            <CustomIcon Icon={ICONS.SearchWhite} height={20} width={20} />
          )}
          <TouchableOpacity
            activeOpacity={0.9}
            style={[{ flex: 1, height: multiline ? undefined : height }]} // Height management for multiline
            disabled={disabled || type === "date"} // Simplified condition
            onPress={() => {
              type === "date" && setPickerVisible(!isPickerVisible);
            }}
          >
            <View
              pointerEvents={type === "date" ? "none" : "auto"}
              style={{ flex: 1, opacity: disabled ? 0.7 : 1 }}
            >
              <TextInput
                style={[
                  styles.input,
                  multiline && styles.multilineInput, // Apply multiline specific styles
                  { fontSize: adjustedFontSize },
                ]}
                placeholder={placeholder}
                placeholderTextColor={COLORS.white}
                secureTextEntry={type === "password" && !isPasswordVisible}
                onChangeText={onChangeText}
                value={value}
                editable={!disabled && type !== "date"} // Simplified condition
                multiline={multiline} // Crucial prop for multiline
                numberOfLines={multiline ? numberOfLines : 1} // Initial lines for multiline
                textAlignVertical={multiline ? "top" : "center"} // Align text to top for multiline
                {...rest}
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
                maximumDate={maxDate}
              />
            </>
          )}

          {type === "password" && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={togglePasswordVisibility}
            >
              <CustomIcon
                Icon={isPasswordVisible ? ICONS.eyeoffIcon : ICONS.eyeOnIcon}
                height={20}
                width={20}
              />
            </TouchableOpacity>
          )}

          {type === "search" && isFilterIcon && (
            <CustomIcon
              onPress={onFilterPress}
              Icon={ICONS.Filter}
              height={20}
              width={20}
            />
          )}
        </View>
      </View>
    );
  }
);

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
    color: COLORS.white,
    // Ensure that text is vertically centered for single line inputs by default
    // When multiline, textAlignVertical should be 'top'
  },
  multilineInput: {
    minHeight: verticalScale(80), // Minimum height for multiline input
    // You can remove or adjust the default 'height' prop if you want it to always expand
    // with content from the 'numberOfLines' initial setting.
    paddingTop: verticalScale(10), // Adjust padding for multiline
    paddingBottom: verticalScale(10), // Adjust padding for multiline
  },
  iconContainer: {
    marginLeft: 10,
  },
});

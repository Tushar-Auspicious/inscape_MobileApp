import React, { FC, useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ICONS from '../Assets/icons';
import COLORS from '../Utilities/Colors';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../Utilities/Metrics';
import CustomIcon from './CustomIcon';
import { CustomText } from './CustomText';

type CustomInputProps = {
  placeholder: string;
  type?: "text" | "password" | "search";
  onChangeText: (text: string) => void;
  value: string;
  style?: object;
  isFilterIcon?: boolean;
  onFilterPress?: () => void;
  label?: string;
  heigth?: number;
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
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false); // State to toggle password visibility

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

        {/* Main input field */}
        <TextInput
          style={[
            styles.input,
            {
              height: heigth,
            },
          ]} // Input field style
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
            <CustomIcon Icon={ICONS.eyeoffIcon} height={20} width={20} />
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

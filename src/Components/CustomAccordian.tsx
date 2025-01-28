import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ScrollView,
} from 'react-native';
import COLORS from '../Utilities/Colors';
import { CustomText } from './CustomText';
import CustomIcon from './CustomIcon';
import ICONS from '../Assets/icons';
import { horizontalScale, verticalScale } from '../Utilities/Metrics';

const CustomAccordion = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const [isOpen, setIsOpen] = useState(false); // State to track if the accordion is open
  const [height, setHeight] = useState(new Animated.Value(0)); // Animated height

  const toggleAccordion = () => {
    if (isOpen) {
      // Collapse animation
      Animated.timing(height, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsOpen(false));
    } else {
      setIsOpen(true);
      // Expand animation
      Animated.timing(height, {
        toValue: 100, // Adjust based on content size
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      {/* Accordion Header */}
      <TouchableOpacity
        onPress={toggleAccordion}
        activeOpacity={0.8}
        style={[
          styles.header,
          {
            backgroundColor: isOpen ? COLORS.darkNavyBlue : 'transparent',
          },
        ]}
      >
        <CustomText fontFamily='medium'>{title}</CustomText>

        <CustomIcon
          Icon={isOpen ? ICONS.upArrowIcon : ICONS.downArrowIcon}
          width={15}
          height={15}
        />
      </TouchableOpacity>

      {/* Accordion Content */}
      {isOpen && (
        <Animated.View style={[styles.content, { height }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CustomText
              fontFamily='light'
              style={{ lineHeight: 19 }}
            >
              {content}
            </CustomText>
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

// Styles for the accordion
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.white,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(16),
  },
  content: {
    overflow: 'hidden',
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(16),
    backgroundColor: COLORS.darkNavyBlue,
  },
});

export default CustomAccordion;

import React, { FC } from "react";
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../Components/Buttons/CustomButton";
import OnBoardingSlides, { SlideType } from "../../Seeds/OnBoardingSeed";
import { OnBoardingProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { deviceWidth, horizontalScale, wp } from "../../Utilities/Metrics";
import styles from "./style";
import { storeLocalStorageData } from "../../Utilities/Storage";
import STORAGE_KEYS from "../../Utilities/Constants";
import { CustomText } from "../../Components/CustomText";

const OnBoarding: FC<OnBoardingProps> = ({ navigation }) => {
  const flatListRef = React.useRef<FlatList>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const updateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / deviceWidth);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = async () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != OnBoardingSlides.length) {
      const offset = nextSlideIndex * deviceWidth;

      if (flatListRef.current) {
        flatListRef?.current.scrollToOffset({ offset });
        setCurrentSlideIndex(currentSlideIndex + 1);
      }
    } else {
      await storeLocalStorageData(STORAGE_KEYS.isOnBoarded, true);
      navigation.replace("termsAndConditions");
    }
  };

  const handleSkip = async () => {
    await storeLocalStorageData(STORAGE_KEYS.isOnBoarded, true);
    navigation.replace("termsAndConditions");
  };

  const renderSlides = ({
    item,
    index,
  }: {
    item: SlideType;
    index: number;
  }) => {
    return (
      <View key={item.id + index} style={styles.slideContainer}>
        <Image source={item?.image} style={styles.slideImage} />
        <View style={styles.slideTextCont}>
          <CustomText fontFamily="bold" type="subHeading" style={styles.title}>
            {item?.title}
          </CustomText>
          <CustomText style={styles.subtitle}>{item?.subtitle}</CustomText>
        </View>
      </View>
    );
  };

  const renderIndicators = () => {
    return (
      <View style={styles.indicatorCont}>
        {OnBoardingSlides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex == index && {
                backgroundColor: COLORS.navyBlue,
                width: horizontalScale(25),
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ justifyContent: "space-between", flexGrow: 1 }}
      >
        <FlatList
          ref={flatListRef}
          data={OnBoardingSlides}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          renderItem={renderSlides}
        />
        {renderIndicators()}
        <View style={styles.buttonCont}>
          <CustomButton
            title="Next"
            onPress={goToNextSlide}
            style={{ width: wp(90) }}
          />
          <TouchableOpacity onPress={handleSkip}>
            <CustomText fontFamily="bold" style={styles.skipText}>
              Skip
            </CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnBoarding;

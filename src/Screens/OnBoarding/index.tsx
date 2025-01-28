import React, { FC } from "react";
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../Components/Buttons/CustomButton';
import OnBoardingSlides, { SlideType } from '../../Seeds/OnBoardingSeed';
import { OnBoardingProps } from '../../Typings/route';
import COLORS from '../../Utilities/Colors';
import { deviceWidth, horizontalScale, wp } from '../../Utilities/Metrics';
import styles from './style';

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
      navigation.navigate('termsAndConditions');
    }
  };

  const handleSkip = () => {
    navigation.navigate('termsAndConditions');
  };

  const renderSlides = ({
    item,
    index,
  }: {
    item: SlideType;
    index: number;
  }) => {
    return (
      <View
        key={item.id + index}
        style={styles.slideContainer}
      >
        <Image
          source={item?.image}
          style={styles.slideImage}
        />
        <View style={styles.slideTextCont}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.subtitle}>{item?.subtitle}</Text>
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
          title='Next'
          onPress={goToNextSlide}
          style={{ width: wp(90) }}
        />
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding;

import React, {FC, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import ICONS from '../../Assets/icons';
import COLORS from '../../Utilities/Colors';
import {horizontalScale, hp, verticalScale} from '../../Utilities/Metrics';
import CustomButton from '../Buttons/CustomButton';
import CustomIcon from '../CustomIcon';
import {CustomText} from '../CustomText';

type FilterModalProps = {
  sheetRef: any;
  onClose: () => void;
  onPressApply: () => void;
  clearFilter: () => void;
};

const LEVELS = [
  {id: 'beginner', title: 'Beginner'},
  {id: 'intermediate', title: 'Intermediate'},
  {id: 'advanced', title: 'Advanced'},
];

const TAGS = [
  {id: '1', title: 'All', value: 'all'},
  {id: '2', title: 'Relaxation', value: 'relaxation'},
  {id: '3', title: 'Breathing', value: 'breathing'},
  {id: '4', title: 'Focus', value: 'focus'},
  {id: '5', title: 'Nature', value: 'nature'},
  {id: '6', title: 'Healing', value: 'healing'},
  {id: '7', title: 'Energy', value: 'energy'},
  {id: '8', title: 'Peace', value: 'peace'},
  {id: '9', title: 'Sleep', value: 'sleep'},
  {id: '10', title: 'Love', value: 'love'},
  {id: '11', title: 'Relief', value: 'relief'},
  {id: '12', title: 'Creativity', value: 'creativity'},
];

const FilterModalSheet: FC<FilterModalProps> = ({
  sheetRef,
  clearFilter,
  onClose,
  onPressApply,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string | null>('beginner');

  const toggleFilter = (id: string) => {
    setSelectedFilters(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
  };

  return (
    <RBSheet
      ref={sheetRef}
      height={hp(65)}
      closeOnPressMask
      customStyles={{container: styles.sheetContainer}}>
      <TouchableOpacity style={styles.crossbtn} onPress={onClose}>
        <CustomIcon Icon={ICONS.crossIcon} width={24} height={24} />
      </TouchableOpacity>

      <View style={styles.TitlebtnsContainer}>
        {LEVELS.map(level => (
          // <CustomButton
          //   key={level.id}
          //   backgroundColor={
          //     selectedLevel === level.id ? COLORS.navyBlue : COLORS.white
          //   }
          //   textColor={selectedLevel === level.id ? COLORS.white : COLORS.grey}
          //   title={level.title}
          //   onPress={() => handleLevelSelect(level.id)}
          //   style={styles.titlebtn}
          //   textSize="default"
          // />

          <TouchableOpacity
            key={level.id}
            onPress={() => handleLevelSelect(level.id)}
            style={[
              styles.filterButton,
              selectedLevel === level.id
                ? {
                    backgroundColor: COLORS.navyBlue,
                    borderColor: COLORS.grey,
                    borderWidth: 1,
                  }
                : {
                    backgroundColor: COLORS.white,
                    borderColor: 'transparent',
                    borderWidth: 1,
                  },
            ]}>
            <CustomText
              color={selectedLevel === level.id ? COLORS.white : COLORS.grey}>
              {level.title}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.divider} />

      <View style={{gap: verticalScale(10)}}>
        <CustomText fontFamily="semiBold" color={COLORS.navyBlue}>
          Best for
        </CustomText>

        <FlatList
          data={TAGS}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            const isSelected = selectedFilters.includes(item.id);
            return (
              <TouchableOpacity
                onPress={() => toggleFilter(item.id)}
                style={[
                  styles.filterButton,
                  isSelected
                    ? {backgroundColor: COLORS.navyBlue}
                    : {
                        backgroundColor: COLORS.white,
                        borderColor: COLORS.grey,
                        borderWidth: 1,
                      },
                ]}>
                <CustomText color={isSelected ? COLORS.white : COLORS.grey}>
                  {item.title}
                </CustomText>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={{
            rowGap: 10,
          }}
          columnWrapperStyle={{
            justifyContent: 'space-evenly',
          }}
          numColumns={3}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
        />
      </View>

      <View style={styles.divider} />

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          gap: verticalScale(10),
          paddingBottom: verticalScale(10),
        }}>
        <CustomButton
          backgroundColor={COLORS.navyBlue}
          textColor={COLORS.white}
          title="Apply Filter"
          onPress={onPressApply}
          style={styles.Applyfilter}
        />
        <TouchableOpacity activeOpacity={0.8} onPress={clearFilter}>
          <CustomText
            style={{
              textDecorationLine: 'underline',
              textAlign: 'center',
            }}
            fontFamily="semiBold"
            type="subTitle"
            color={COLORS.navyBlue}>
            Clear filter
          </CustomText>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

export default FilterModalSheet;

const styles = StyleSheet.create({
  sheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
  },
  TitlebtnsContainer: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    padding: 5,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
    paddingVertical: verticalScale(10),
    marginBottom: 10,
  },
  flatlistcontainer: {
    marginTop: 10,
  },
  filterButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 8,
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Applyfilter: {},
  titlebtn: {
    paddingHorizontal: horizontalScale(10),
    borderRadius: 8,
    flex: 0.33,
  },
  crossbtn: {
    alignItems: 'flex-end',
    marginBottom: 15,
  },
});

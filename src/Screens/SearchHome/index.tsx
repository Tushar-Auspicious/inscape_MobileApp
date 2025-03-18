import React, {FC, useRef, useState} from 'react';
import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ICONS from '../../Assets/icons';
import ContentCard from '../../Components/Cards/ContentCard';
import CustomIcon from '../../Components/CustomIcon';
import CustomInput from '../../Components/CustomInput';
import FilterModalSheet from '../../Components/Modals/FilterModal';
import {TrendingData} from '../../Seeds/HomeSeeds';
import {SearchHomeProps} from '../../Typings/route';
import styles from './style';

const SearchHome: FC<SearchHomeProps> = ({navigation}) => {
  const filterSheetRef = useRef<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = () => {
    navigation.navigate('searchHome');
  };

  const handleFilterPress = () => {
    if (filterSheetRef.current) {
      filterSheetRef.current.open();
    }
  };

  const onCloseFilterSheet = () => {
    if (filterSheetRef.current) {
      filterSheetRef.current.close();
    }
  };

  const handleCardPress = (item: any) => {
    navigation.navigate('categories', {data: item});
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <View style={styles.mainHeader}>
        <TouchableOpacity onPress={handleSearchClick}>
          <CustomIcon
            onPress={() => navigation.goBack()}
            Icon={ICONS.BackArrow}
            width={15}
            height={15}
          />
        </TouchableOpacity>
        <CustomInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          isFilterIcon
          type="search"
          placeholder="Search..."
          style={{flex: 1}}
          onFilterPress={handleFilterPress}
          heigth={44}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        <FlatList
          data={TrendingData}
          contentContainerStyle={styles.list}
          keyExtractor={(item, index) => item.title + index.toString()}
          renderItem={({item}) => (
            <ContentCard
              title={item.title}
              rating={item.rating}
              duration={item.duration}
              imageUrl={item.imageUrl}
              onPress={() => {
                handleCardPress(item);
              }}
            />
          )}
        />
      </ScrollView>
      <FilterModalSheet
        sheetRef={filterSheetRef}
        onClose={onCloseFilterSheet}
        clearFilter={() => {
          onCloseFilterSheet();
        }}
        onPressApply={() => {
          onCloseFilterSheet();
        }}
      />
    </SafeAreaView>
  );
};

export default SearchHome;

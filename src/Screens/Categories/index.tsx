import React, {FC, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ICONS from '../../Assets/icons';
import ContentCard from '../../Components/Cards/ContentCard';
import CustomIcon from '../../Components/CustomIcon';
import CustomInput from '../../Components/CustomInput';
import {CustomText} from '../../Components/CustomText';
import {TrendingData} from '../../Seeds/HomeSeeds';
import {CategoryProps} from '../../Typings/route';
import styles from './style';

const Categories: FC<CategoryProps> = ({navigation, route}) => {
  const {data} = route.params;

  console.log(data);

  const [searchQuery, setSearchQuery] = useState('');

  const handleCardPress = () => {
    navigation.navigate('playerList');
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <ImageBackground
        source={{
          uri: data.imageUrl,
        }}
        style={styles.imageBackground}
        resizeMode="cover">
        <View style={styles.imageContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <CustomIcon Icon={ICONS.BackArrow} height={12} width={12} />
          </TouchableOpacity>

          <View style={styles.imageTextContent}>
            <CustomText type="heading" fontFamily="bold">
              {data.title}
            </CustomText>

            <CustomText>34 practices</CustomText>
            <CustomText>
              Sounds of nature have a replenishing and restorative effect on the
              body.
            </CustomText>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.mainHeader}>
        <CustomInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          type="search"
          placeholder="Search..."
          style={styles.searchInput}
          heigth={44}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        <View style={styles.sectionHeader}>
          <CustomText type="title" fontFamily="bold">
            Rain and Storm Sounds
          </CustomText>
          <TouchableOpacity onPress={() => {}}>
            <CustomText fontFamily="semiBold">24 sessions</CustomText>
          </TouchableOpacity>
        </View>

        <FlatList
          data={TrendingData}
          contentContainerStyle={styles.horizontalList}
          keyExtractor={(item, index) => item.title + index.toString()}
          horizontal
          renderItem={({item}) => (
            <ContentCard
              duration={item.duration}
              imageUrl={item.imageUrl}
              rating={item.rating}
              title={item.title}
              type={item.type}
              isSmall
              onPress={handleCardPress}
            />
          )}
        />

        <View style={styles.sectionHeader}>
          <CustomText type="title" fontFamily="bold">
            At the Beach
          </CustomText>
          <TouchableOpacity onPress={() => {}}>
            <CustomText fontFamily="semiBold">20 sessions</CustomText>
          </TouchableOpacity>
        </View>

        <FlatList
          data={TrendingData}
          contentContainerStyle={styles.horizontalList}
          keyExtractor={(item, index) => item.title + index.toString()}
          horizontal
          renderItem={({item}) => (
            <ContentCard
              duration={item.duration}
              imageUrl={item.imageUrl}
              rating={item.rating}
              title={item.title}
              type={item.type}
              isSmall
              onPress={handleCardPress}
            />
          )}
        />

        <View style={styles.sectionHeader}>
          <CustomText type="title" fontFamily="bold">
            Wandering in Nature
          </CustomText>
          <TouchableOpacity onPress={() => {}}>
            <CustomText fontFamily="semiBold">14 sessions</CustomText>
          </TouchableOpacity>
        </View>

        <FlatList
          data={TrendingData}
          contentContainerStyle={styles.horizontalList}
          keyExtractor={(item, index) => item.title + index.toString()}
          horizontal
          renderItem={({item}) => (
            <ContentCard
              duration={item.duration}
              imageUrl={item.imageUrl}
              rating={item.rating}
              title={item.title}
              type={item.type}
              isSmall
              onPress={handleCardPress}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Categories;

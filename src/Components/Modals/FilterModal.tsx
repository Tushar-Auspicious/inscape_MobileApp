import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import ICONS from "../../Assets/icons";
import { BestFor, GetFilterResponse, Level } from "../../Typings/apiTypes";
import COLORS from "../../Utilities/Colors";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import CustomButton from "../Buttons/CustomButton";
import CustomIcon from "../CustomIcon";
import { CustomText } from "../CustomText";

type FilterModalProps = {
  isModalVisible: boolean;
  onClose: () => void;
  onPressApply: () => void;
  clearFilter: () => void;
  selectedLevel: string;
  setSelectedLevel: Dispatch<SetStateAction<string>>;
  selectedFilters: string[];
  setSelectedFilters: Dispatch<SetStateAction<string[]>>;
};

const FilterModalSheet: FC<FilterModalProps> = ({
  isModalVisible,
  clearFilter,
  onClose,
  onPressApply,
  selectedFilters,
  selectedLevel,
  setSelectedFilters,
  setSelectedLevel,
}) => {
  const [bestForTags, setBestForTags] = useState<BestFor[]>([]);
  const [levelsList, setLevelsList] = useState<Level[]>([]);

  const [getDataLoading, setGetDataLoading] = useState(false);

  const toggleFilter = (id: string) => {
    setSelectedFilters((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleLevelSelect = (levelName: string) => {
    setSelectedLevel(levelName);
  };

  const getFilterData = async () => {
    setGetDataLoading(true);
    try {
      const response = await fetchData<GetFilterResponse>(ENDPOINTS.getFilters);
      if (response.data.success) {
        setBestForTags(response.data.data.bestForList);
        setLevelsList(response.data.data.levels);
      }
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong.",
      });
    } finally {
      setGetDataLoading(false);
    }
  };

  useEffect(() => {
    getFilterData();
  }, []);

  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
      animationType="slide"
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "flex-end",
        }}
      >
        <View style={styles.sheetContainer}>
          <TouchableOpacity style={styles.crossbtn} onPress={onClose}>
            <CustomIcon Icon={ICONS.crossIcon} width={24} height={24} />
          </TouchableOpacity>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.TitlebtnsContainer}>
              {levelsList.map((level) => (
                <TouchableOpacity
                  key={level._id}
                  onPress={() => handleLevelSelect(level.name)}
                  style={[
                    styles.filterButton,
                    selectedLevel === level.name
                      ? {
                          backgroundColor: COLORS.navyBlue,
                          borderColor: COLORS.grey,
                          borderWidth: 1,
                          marginVertical: verticalScale(5),
                        }
                      : {
                          backgroundColor: COLORS.white,
                          borderColor: COLORS.grey,
                          borderWidth: 1,
                          marginVertical: verticalScale(5),
                        },
                  ]}
                >
                  <CustomText
                    color={
                      selectedLevel === level.name ? COLORS.white : COLORS.grey
                    }
                  >
                    {level.name}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.divider} />

            <View style={{ gap: verticalScale(10) }}>
              <CustomText fontFamily="semiBold" color={COLORS.navyBlue}>
                Best for
              </CustomText>

              <FlatList
                data={bestForTags}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                  const isSelected = selectedFilters.includes(item.name);
                  return (
                    <TouchableOpacity
                      onPress={() => toggleFilter(item.name)}
                      style={[
                        styles.filterButton,
                        isSelected
                          ? { backgroundColor: COLORS.navyBlue }
                          : {
                              backgroundColor: COLORS.white,
                              borderColor: COLORS.grey,
                              borderWidth: 1,
                            },
                      ]}
                    >
                      <CustomText
                        color={isSelected ? COLORS.white : COLORS.grey}
                      >
                        {item.name}
                      </CustomText>
                    </TouchableOpacity>
                  );
                }}
                contentContainerStyle={{
                  rowGap: 10,
                }}
                columnWrapperStyle={{
                  justifyContent: "space-evenly",
                  flexWrap: "wrap",
                  gap: horizontalScale(5),
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
                justifyContent: "flex-end",
                gap: verticalScale(10),
                paddingBottom: verticalScale(10),
              }}
            >
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
                    textDecorationLine: "underline",
                    textAlign: "center",
                  }}
                  fontFamily="semiBold"
                  type="subTitle"
                  color={COLORS.navyBlue}
                >
                  Clear filter
                </CustomText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModalSheet;

const styles = StyleSheet.create({
  sheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    height: hp(75),
    backgroundColor: COLORS.white,
  },
  TitlebtnsContainer: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    borderRadius: 12,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(5),
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
    alignItems: "center",
    justifyContent: "center",
    minWidth: wp(20),
  },
  Applyfilter: {},
  titlebtn: {
    paddingHorizontal: horizontalScale(10),
    borderRadius: 8,
    flex: 0.33,
  },
  crossbtn: {
    alignItems: "flex-end",
    marginBottom: 15,
  },
});

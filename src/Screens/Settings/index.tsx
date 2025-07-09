import React, { FC, useEffect, useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/icons";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import LogOutModal from "../../Components/Modals/LogOutModal";
import NoInternetCard from "../../Components/NoInternetCard";
import useNetworkStatus from "../../Hooks/useNetworkStatus";
import { setIsRegistered, setToken } from "../../Redux/slices/initialSlice";
import { useAppDispatch } from "../../Redux/store";
import { SettingScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import STORAGE_KEYS from "../../Utilities/Constants";
import { verticalScale } from "../../Utilities/Metrics";
import { deleteLocalStorageData } from "../../Utilities/Storage";
import styles from "./style";
import ENDPOINTS from "../../APIService/endPoints";
import { fetchData } from "../../APIService/api";
import Toast from "react-native-toast-message";
import {
  setPrivacyPolicy,
  setTermsAndCondition,
} from "../../Redux/slices/settingsSlice";
import { usePlayerContext } from "../../Context/PlayerContext";

const Settings: FC<SettingScreenProps> = ({ navigation }) => {
  const sheetRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    sheetRef.current.close();
  };

  // Network status
  const { isConnected, retryConnection } = useNetworkStatus();
  const previousConnectionRef = useRef<boolean | null>(null);

  const { loadTrack } = usePlayerContext();

  const handleLogout = async () => {
    await deleteLocalStorageData(STORAGE_KEYS.isAuth);
    await deleteLocalStorageData(STORAGE_KEYS.token);
    await deleteLocalStorageData(STORAGE_KEYS.isRegistered);
    await deleteLocalStorageData(STORAGE_KEYS.downloadedAudios);

    await loadTrack([], 0);

    dispatch(setToken(null));
    dispatch(setIsRegistered(null));

    navigation.replace("authStack", { screen: "signIn" });
    sheetRef.current.close();
  };

  const renderBars = (title: string, onPress: () => void) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={{
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingVertical: verticalScale(10),
        }}
      >
        <CustomText type="subTitle" fontFamily="medium">
          {title}
        </CustomText>
        <CustomIcon Icon={ICONS.RightArrow} height={15} width={15} />
      </TouchableOpacity>
    );
  };

  const getTerms = async () => {
    try {
      const response = await fetchData<string>(ENDPOINTS.getTerms);

      if (response.data) {
        dispatch(setTermsAndCondition(response.data.data));
      }
    } catch (error: any) {
      console.error("Home data fetch error:", error);
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
        position: "bottom",
      });
    }
  };

  const getPrivacyPolicy = async () => {
    try {
      const response = await fetchData<string>(ENDPOINTS.getPrivacyPolicy);

      if (response.data) {
        dispatch(setPrivacyPolicy(response.data.data));
      }
    } catch (error: any) {
      console.error("Home data fetch error:", error);
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    getTerms();
    getPrivacyPolicy();
  }, []);

  // Monitor network status changes and refresh data when connection is restored
  useEffect(() => {
    // If connection was previously offline and now it's online, refresh the data
    if (previousConnectionRef.current === false && isConnected === true) {
      console.log("Network connection restored, refreshing discover data...");
    }

    // Update the previous connection state
    previousConnectionRef.current = isConnected;
  }, [isConnected]);

  // Show no internet card when offline
  if (!isConnected) {
    return (
      <SafeAreaView style={styles.main}>
        <NoInternetCard
          onRetry={() => {
            retryConnection();
            // If retryConnection succeeds, it will trigger the useEffect above
            // due to the isConnected dependency
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.main}>
      <View style={styles.container}>
        <CustomText fontFamily="bold" type="title">
          Settings
        </CustomText>

        <View style={{ marginVertical: verticalScale(20) }}>
          {renderBars("My Account", () => navigation.navigate("myAccount"))}
          <View
            style={{
              backgroundColor: COLORS.mixGreyBlue,
              height: 1,
              marginVertical: verticalScale(30),
            }}
          />
          <CustomText fontFamily="bold" type="title">
            Support
          </CustomText>
          <View
            style={{ gap: verticalScale(10), marginTop: verticalScale(15) }}
          >
            {renderBars("FAQ", () => navigation.navigate("Faq"))}
            {renderBars("Privacy Policy", () =>
              navigation.navigate("settingsPrivacyPolicy")
            )}
            {renderBars("Terms & Conditions", () =>
              navigation.navigate("settingsTermsAndConditions")
            )}
            {renderBars("Contact Us", () => navigation.navigate("contactUs"))}
            <TouchableOpacity
              style={{
                paddingVertical: verticalScale(10),
              }}
              onPress={() => sheetRef.current.open()}
              activeOpacity={0.8}
            >
              <CustomText
                style={{ textDecorationLine: "underline" }}
                fontFamily="bold"
              >
                Log out
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <LogOutModal
        sheetRef={sheetRef}
        onLogout={handleLogout}
        onCancel={handleCancel}
      />
    </SafeAreaView>
  );
};

export default Settings;

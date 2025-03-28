import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Appearance, LogBox, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import {
  setIsOnBoarded,
  setIsRegistered,
  setIsTermsAccepted,
  setToken,
} from "./src/Redux/slices/initialSlice";
import { useAppDispatch } from "./src/Redux/store";
import Routing from "./src/Routes";
import COLORS from "./src/Utilities/Colors";
import STORAGE_KEYS from "./src/Utilities/Constants";
import { getLocalStorageData } from "./src/Utilities/Storage";

LogBox.ignoreAllLogs();
Appearance.setColorScheme("light");

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        const token = await getLocalStorageData(STORAGE_KEYS.token);
        const isOnboarded = await getLocalStorageData(STORAGE_KEYS.isOnBoarded);
        const isTermsAccepted = await getLocalStorageData(
          STORAGE_KEYS.isTermsAccepted
        );
        const isRegistered = await getLocalStorageData(
          STORAGE_KEYS.isRegistered
        );

        dispatch(setToken(token));
        dispatch(setIsOnBoarded(isOnboarded));
        dispatch(setIsTermsAccepted(isTermsAccepted));
        dispatch(setIsRegistered(isRegistered));
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchLocalData();
  }, []);

  return (
    <>
      <SafeAreaProvider>
        <StatusBar backgroundColor={COLORS.darkBlue} />
        <NavigationContainer>
          <Routing />
          <Toast />
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default App;

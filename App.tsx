import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Appearance, LogBox, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import MiniPlayer from "./src/Components/MiniPlayer";
import { PlayerProvider } from "./src/Context/PlayerContext";
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

        // await deleteLocalStorageData(STORAGE_KEYS.isAuth);
        // await deleteLocalStorageData(STORAGE_KEYS.isOnBoarded);
        // await deleteLocalStorageData(STORAGE_KEYS.isRegistered);
        // await deleteLocalStorageData(STORAGE_KEYS.isTermsAccepted);
        // await deleteLocalStorageData(STORAGE_KEYS.token);
        // await deleteLocalStorageData(STORAGE_KEYS.downloadedAudios);

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
      <PlayerProvider>
        <SafeAreaProvider>
          <StatusBar backgroundColor={COLORS.darkBlue}  />
          <NavigationContainer>
            <Routing />
          </NavigationContainer>
        </SafeAreaProvider>
        <Toast />
      </PlayerProvider>
    </>
  );
};

export default App;

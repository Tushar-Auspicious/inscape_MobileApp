import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Routing from "./src/Routes";
import Splash from "./src/Screens/Splash";
import { Appearance, LogBox } from "react-native";

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Appearance.setColorScheme("light");

    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider>{isReady ? <Routing /> : <Splash />}</SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;

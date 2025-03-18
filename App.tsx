import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routing from './src/Routes';
import Splash from './src/Screens/Splash';
import {Appearance, LogBox} from 'react-native';
import Toast from 'react-native-toast-message';

LogBox.ignoreAllLogs();

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Appearance.setColorScheme('light');

    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          {isReady ? <Routing /> : <Splash />}
        </NavigationContainer>
      </SafeAreaProvider>
      <Toast />
    </>
  );
};

export default App;

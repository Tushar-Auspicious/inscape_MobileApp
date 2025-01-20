import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../Screens/Home";
import OnBoarding from "../Screens/OnBoarding";
import {
  AuthStackParams,
  MainStackParams,
  RootStackParams,
} from "../Typings/route";
import { storage } from "../Utilities/Storage";
import TermsAndConditions from "../Screens/TermsAndConditions";

const RootStack = createNativeStackNavigator<RootStackParams>();
const Auth = createNativeStackNavigator<AuthStackParams>();
const Main = createNativeStackNavigator<MainStackParams>();

const Routing = () => {
  const isOnboarded = storage.getIsOnBoarded();
  const isAuth = storage.getIsAuth();

  function AuthStack() {
    return (
      <Auth.Navigator
        initialRouteName={isOnboarded ? "signIn" : "onBoarding"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Auth.Screen name="onBoarding" component={OnBoarding} />
        <Auth.Screen name="termsAndConditions" component={TermsAndConditions} />
      </Auth.Navigator>
    );
  }

  function MainStack() {
    return (
      <Main.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Main.Screen name="home" component={Home} />
      </Main.Navigator>
    );
  }

  return (
    <RootStack.Navigator
      initialRouteName={isAuth ? "mainStack" : "authStack"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="authStack" component={AuthStack} />
      <RootStack.Screen name="mainStack" component={MainStack} />
    </RootStack.Navigator>
  );
};

export default Routing;

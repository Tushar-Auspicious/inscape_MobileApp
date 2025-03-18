import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BottomTabBar from "../Components/BottomTabBar";
import Categories from "../Screens/Categories";
import CreateNewPassword from "../Screens/CreateNewPassword";
import Discover from "../Screens/Discover";
import FAQ from "../Screens/FAQ";
import ForgotPassword from "../Screens/ForgotPassword";
import Home from "../Screens/Home";
import Library from "../Screens/Library";
import MyAccount from "../Screens/MyAccount";
import OnBoarding from "../Screens/OnBoarding";
import OTP from "../Screens/OTP";
import PasswordSuccess from "../Screens/PasswordSuccess";
import RegisterSuccess from "../Screens/RegisterSuccess";
import Settings from "../Screens/Settings";
import SettingsPrivacyPolicy from "../Screens/SettingsPrivacyPolicy";
import SettingTermsCondition from "../Screens/SettingTermsCondition";
import SignIn from "../Screens/SignIn";
import SignUp from "../Screens/SignUp";
import TermsAndConditions from "../Screens/TermsAndConditions";
import {
  AuthStackParams,
  BottomTabParams,
  MainStackParams,
  RootStackParams,
} from "../Typings/route";
import { Platform } from "react-native";
import SearchHome from "../Screens/SearchHome";
import PlayerList from "../Screens/PlayerList";
import Player from "../Screens/Player";

const RootStack = createNativeStackNavigator<RootStackParams>();
const Auth = createNativeStackNavigator<AuthStackParams>();
const Main = createNativeStackNavigator<MainStackParams>();
const Tabs = createBottomTabNavigator<BottomTabParams>();

const Routing = () => {
  const isOnboarded = true;
  const isAuth = false;
  const isTermsAccepted = true;

  function AuthStack() {
    return (
      <Auth.Navigator
        initialRouteName={
          isOnboarded
            ? isTermsAccepted
              ? "signIn"
              : "termsAndConditions"
            : "onBoarding"
        }
        screenOptions={{
          headerShown: false,
          animation: Platform.OS === "ios" ? "default" : "none",
        }}
      >
        <Auth.Screen name="signIn" component={SignIn} />
        <Auth.Screen name="onBoarding" component={OnBoarding} />
        <Auth.Screen name="termsAndConditions" component={TermsAndConditions} />
        <Auth.Screen name="signUp" component={SignUp} />
        <Auth.Screen name="registerSuccess" component={RegisterSuccess} />
        <Auth.Screen name="otpScreen" component={OTP} />
        <Auth.Screen name="forgotPassword" component={ForgotPassword} />
        <Auth.Screen name="createNewPassword" component={CreateNewPassword} />
        <Auth.Screen name="passwordSuccess" component={PasswordSuccess} />
      </Auth.Navigator>
    );
  }

  function TabStack() {
    return (
      <Tabs.Navigator
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
        tabBar={(props) => <BottomTabBar {...props} />}
      >
        <Tabs.Screen
          options={{
            title: "Home",
          }}
          name="homeTab"
          component={Home}
        />
        <Tabs.Screen
          options={{
            title: "Discover",
          }}
          name="discoverTab"
          component={Discover}
        />
        <Tabs.Screen
          options={{
            title: "Library",
          }}
          name="libraryTab"
          component={Library}
        />
        <Tabs.Screen
          options={{
            title: "Settings",
          }}
          name="settingsTab"
          component={Settings}
        />
      </Tabs.Navigator>
    );
  }

  function MainStack() {
    return (
      <Main.Navigator
        screenOptions={{
          headerShown: false,
          animation: Platform.OS === "ios" ? "default" : "none",
        }}
      >
        <Main.Screen name="tabs" component={TabStack} />
        <Main.Screen name="searchHome" component={SearchHome} />
        <Main.Screen name="categories" component={Categories} />
        <Main.Screen name="myAccount" component={MyAccount} />
        <Main.Screen name="Faq" component={FAQ} />
        <Main.Screen
          name="settingsPrivacyPolicy"
          component={SettingsPrivacyPolicy}
        />
        <Main.Screen
          name="settingsTermsAndConditions"
          component={SettingTermsCondition}
        />
        <Main.Screen name="playerList" component={PlayerList} />
        <Main.Screen name="player" component={Player} />
      </Main.Navigator>
    );
  }

  return (
    <RootStack.Navigator
      initialRouteName={isAuth ? "mainStack" : "authStack"}
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === "ios" ? "default" : "none",
      }}
    >
      <RootStack.Screen name="authStack" component={AuthStack} />
      <RootStack.Screen name="mainStack" component={MainStack} />
    </RootStack.Navigator>
  );
};

export default Routing;

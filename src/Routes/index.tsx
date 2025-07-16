import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Platform } from "react-native";
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
import Player from "../Screens/Player";
import PlayerList from "../Screens/PlayerList";
import RegisterSuccess from "../Screens/RegisterSuccess";
import SearchHome from "../Screens/SearchHome";
import Settings from "../Screens/Settings";
import SettingsPrivacyPolicy from "../Screens/SettingsPrivacyPolicy";
import SettingTermsCondition from "../Screens/SettingTermsCondition";
import SignIn from "../Screens/SignIn";
import SignUp from "../Screens/SignUp";
import Splash from "../Screens/Splash";
import TermsAndConditions from "../Screens/TermsAndConditions";
import {
  AuthStackParams,
  BottomTabParams,
  DiscoverStackParam,
  HomeStackParam,
  MainStackParams,
  RootStackParams,
  SettingsStackParams,
} from "../Typings/route";
import ContactUs from "../Screens/ContactUs";

const RootStack = createNativeStackNavigator<RootStackParams>();
const Auth = createNativeStackNavigator<AuthStackParams>();
const Main = createNativeStackNavigator<MainStackParams>();
const Setting = createNativeStackNavigator<SettingsStackParams>();
const HomeScreens = createNativeStackNavigator<HomeStackParam>();
const DiscoverScreens = createNativeStackNavigator<DiscoverStackParam>();
const Tabs = createBottomTabNavigator<BottomTabParams>();

const Routing = () => {
  function AuthStack() {
    return (
      <Auth.Navigator
        screenOptions={{
          headerShown: false,
          animation: Platform.OS === "ios" ? "default" : "none",
        }}
      >
        <Auth.Screen name="onBoarding" component={OnBoarding} />
        <Auth.Screen name="termsAndConditions" component={TermsAndConditions} />
        <Auth.Screen name="signUp" component={SignUp} />
        <Auth.Screen name="signIn" component={SignIn} />
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
          component={HomeStack}
        />
        <Tabs.Screen
          options={{
            title: "Discover",
          }}
          name="discoverTab"
          component={DiscoverStack}
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
          component={SettingStack}
        />
      </Tabs.Navigator>
    );
  }

  function HomeStack() {
    return (
      <HomeScreens.Navigator
        screenOptions={{
          headerShown: false,
          animation: Platform.OS === "ios" ? "default" : "none",
        }}
      >
        <HomeScreens.Screen name="home" component={Home} />
        <HomeScreens.Screen name="searchHome" component={SearchHome} />
        <HomeScreens.Screen name="categories" component={Categories} />
        <HomeScreens.Screen name="playerList" component={PlayerList} />
      </HomeScreens.Navigator>
    );
  }

  function DiscoverStack() {
    return (
      <DiscoverScreens.Navigator
        screenOptions={{
          headerShown: false,
          animation: Platform.OS === "ios" ? "default" : "none",
        }}
      >
        <DiscoverScreens.Screen name="discover" component={Discover} />
        <DiscoverScreens.Screen name="categories" component={Categories} />
      </DiscoverScreens.Navigator>
    );
  }

  function SettingStack() {
    return (
      <Setting.Navigator
        screenOptions={{
          headerShown: false,
          animation: Platform.OS === "ios" ? "default" : "none",
        }}
      >
        <Setting.Screen name="settings" component={Settings} />
        <Setting.Screen name="myAccount" component={MyAccount} />
        <Setting.Screen name="Faq" component={FAQ} />
        <Setting.Screen name="contactUs" component={ContactUs} />
        <Setting.Screen
          name="settingsPrivacyPolicy"
          component={SettingsPrivacyPolicy}
        />
        <Setting.Screen
          name="settingsTermsAndConditions"
          component={SettingTermsCondition}
        />
      </Setting.Navigator>
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
        <Main.Screen name="player" component={Player} />
      </Main.Navigator>
    );
  }

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === "ios" ? "default" : "none",
      }}
    >
      <RootStack.Screen name="splash" component={Splash} />
      <RootStack.Screen name="authStack" component={AuthStack} />
      <RootStack.Screen name="mainStack" component={MainStack} />
    </RootStack.Navigator>
  );
};

export default Routing;

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BottomTabBar from "../Components/BottomTabBar";
import Categories from "../Screens/Categories";
import CreateNewPassword from "../Screens/CreateNewPassword";
import Discover from "../Screens/Discover";
import ForgotPassword from "../Screens/ForgotPassword";
import Home from "../Screens/Home";
import Library from "../Screens/Library";
import OnBoarding from "../Screens/OnBoarding";
import OTP from "../Screens/OTP";
import PasswordSuccess from "../Screens/PasswordSuccess";
import RegisterSuccess from "../Screens/RegisterSuccess";
import Settings from "../Screens/Settings";
import SignIn from "../Screens/SignIn";
import SignUp from "../Screens/SignUp";
import TermsAndConditions from "../Screens/TermsAndConditions";
import {
  AuthStackParams,
  BottomTabParams,
  MainStackParams,
  RootStackParams,
} from "../Typings/route";
import { storage } from "../Utilities/Storage";
import MyAccount from "../Screens/MyAccount";
import FAQ from "../Screens/FAQ";
import PrivacyPolicy from "../Screens/PrivacyPolicy";
import SettingTermsCondition from "../Screens/SettingTermsCondition";

const RootStack = createNativeStackNavigator<RootStackParams>();
const Auth = createNativeStackNavigator<AuthStackParams>();
const Main = createNativeStackNavigator<MainStackParams>();
const Tabs = createBottomTabNavigator<BottomTabParams>();

const Routing = () => {
  const isOnboarded = storage.getIsOnBoarded();
  const isAuth = storage.getIsAuth();
  const isTermsAccepted = storage.getIsTermsAccepted();

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
        }}
      >
        <Main.Screen name="tabs" component={TabStack} />
        <Main.Screen name="categories" component={Categories} />
        <Main.Screen name="myAccount" component={MyAccount} />
        <Main.Screen name="Faq" component={FAQ} />
        <Main.Screen name="privacyPolicy" component={PrivacyPolicy} />
        <Main.Screen
          name="termsAndConditions"
          component={SettingTermsCondition}
        />
      </Main.Navigator>
    );
  }

  return (
    <RootStack.Navigator
      initialRouteName={!isAuth ? "mainStack" : "authStack"}
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

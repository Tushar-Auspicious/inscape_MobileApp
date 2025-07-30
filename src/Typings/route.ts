import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TrackData } from "../PlayerServices/QueueInitialTrackService";

export type RootStackParams = {
  splash: undefined;
  authStack: NavigatorScreenParams<AuthStackParams>;
  mainStack: NavigatorScreenParams<MainStackParams>;
};

export type AuthStackParams = {
  onBoarding: undefined;
  termsAndConditions: undefined;
  signUp: undefined;
  registerSuccess: undefined;
  otpScreen: { isFromForgotPassword?: boolean; email?: string };
  signIn: undefined;
  forgotPassword: undefined;
  createNewPassword: { otp: string };
  passwordSuccess: undefined;
};

export type MainStackParams = {
  tabs: NavigatorScreenParams<BottomTabParams>;
  playerList: {
    id?: string;
    isFromMeditation?: boolean;
    meditationTypeData?: {
      title: string;
    };
  };
  player: {
    trackList: TrackData[];
    currentTrackIndex: number;
    isFromLibrary?: boolean;
  };
};

export type HomeStackParam = {
  home: undefined;
  searchHome: undefined;
  categories: { id: string };
  playerList: {
    id?: string;
    isFromMeditation?: boolean;
    meditationTypeData?: {
      title: string;
    };
  };
};

export type DiscoverStackParam = {
  discover: undefined;
  categories: { id: string };
};

export type SettingsStackParams = {
  settings: undefined;
  settingsTermsAndConditions: undefined;
  settingsPrivacyPolicy: undefined;
  Faq: undefined;
  myAccount: undefined;
  contactUs: undefined;
};

export type BottomTabParams = {
  homeTab: NavigatorScreenParams<HomeStackParam>;
  discoverTab: NavigatorScreenParams<DiscoverStackParam>;
  libraryTab: undefined;
  settingsTab: NavigatorScreenParams<SettingsStackParams>;
};

// SPLASH
export type SplashProps = NativeStackScreenProps<
  RootStackParams & AuthStackParams & MainStackParams,
  "splash"
>;

// ONBOARDING
export type OnBoardingProps = NativeStackScreenProps<
  AuthStackParams,
  "onBoarding"
>;

// TERMS AND CONDITIONS
export type TermsAndConditionProps = NativeStackScreenProps<
  RootStackParams & AuthStackParams & MainStackParams,
  "termsAndConditions"
>;

// AUTH SCREENS
export type SignUpProps = NativeStackScreenProps<
  RootStackParams & AuthStackParams & MainStackParams,
  "signUp"
>;

export type SignInProps = NativeStackScreenProps<
  RootStackParams & AuthStackParams & MainStackParams,
  "signIn"
>;

export type RegisterSuccessProps = NativeStackScreenProps<
  RootStackParams & AuthStackParams & MainStackParams,
  "registerSuccess"
>;

export type OTPProps = NativeStackScreenProps<
  RootStackParams & AuthStackParams & MainStackParams,
  "otpScreen"
>;

export type ForgotPasswordProps = NativeStackScreenProps<
  RootStackParams & AuthStackParams & MainStackParams,
  "forgotPassword"
>;

export type CreateNewPasswordProps = NativeStackScreenProps<
  RootStackParams & AuthStackParams & MainStackParams,
  "createNewPassword"
>;

export type PasswordSuccessProps = NativeStackScreenProps<
  RootStackParams & AuthStackParams & MainStackParams,
  "passwordSuccess"
>;

// HOME TAB SCREENS
export type HomeScreenProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams & HomeStackParam,
  "home"
>;

export type SearchHomeProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & HomeStackParam,
  "searchHome"
>;

export type CategoryProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & HomeStackParam & DiscoverStackParam,
  "categories"
>;

// SETTINGS SCREENS
export type SettingScreenProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams & SettingsStackParams,
  "settings"
>;

export type SettingsTermsAndConditionProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams & SettingsStackParams,
  "settingsTermsAndConditions"
>;

export type SettingsPrivacyPolicyProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams & SettingsStackParams,
  "settingsPrivacyPolicy"
>;

export type myAccountProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams & SettingsStackParams,
  "myAccount"
>;

export type FAQProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams & SettingsStackParams,
  "Faq"
>;

export type ContactUsProps = NativeStackScreenProps<
  MainStackParams & RootStackParams & BottomTabParams & SettingsStackParams,
  "contactUs"
>;

export type DiscoverProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams & DiscoverStackParam,
  "discover"
>;

export type LibraryProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams,
  "libraryTab"
>;

export type PlayerListProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams,
  "playerList"
>;

export type PlayerProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams,
  "player"
>;

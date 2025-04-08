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
  searchHome: undefined;
  categories: { id: string };
  myAccount: undefined;
  Faq: undefined;
  settingsTermsAndConditions: undefined;
  settingsPrivacyPolicy: undefined;
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

export type BottomTabParams = {
  homeTab: undefined;
  discoverTab: undefined;
  libraryTab: undefined;
  settingsTab: undefined;
};

export type SplashProps = NativeStackScreenProps<
  RootStackParams & AuthStackParams & MainStackParams,
  "splash"
>;

export type OnBoardingProps = NativeStackScreenProps<
  AuthStackParams,
  "onBoarding"
>;

export type TermsAndConditionProps = NativeStackScreenProps<
  RootStackParams & AuthStackParams & MainStackParams,
  "termsAndConditions"
>;

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

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams,
  "homeTab"
>;

export type SettingScreenProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams,
  "settingsTab"
>;

export type SettingsTermsAndConditionProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams,
  "settingsTermsAndConditions"
>;

export type SettingsPrivacyPolicyProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams,
  "settingsPrivacyPolicy"
>;

export type myAccountProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams,
  "myAccount"
>;

export type FAQProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams,
  "Faq"
>;

export type SearchHomeProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams,
  "searchHome"
>;

export type CategoryProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams,
  "categories"
>;

export type DiscoverProps = NativeStackScreenProps<
  RootStackParams & MainStackParams & BottomTabParams,
  "discoverTab"
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

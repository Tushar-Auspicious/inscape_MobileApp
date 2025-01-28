import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParams = {
  authStack: NavigatorScreenParams<AuthStackParams>;
  mainStack: NavigatorScreenParams<MainStackParams>;
};

export type AuthStackParams = {
  onBoarding: undefined;
  termsAndConditions: undefined;
  signUp: undefined;
  registerSuccess: undefined;
  otpScreen: undefined;
  signIn: undefined;
  forgotPassword: undefined;
  createNewPassword: undefined;
  passwordSuccess: undefined;
};

export type MainStackParams = {
  tabs: NavigatorScreenParams<BottomTabParams>;
  categories: undefined;
  myAccount: undefined;
  Faq: undefined;
  settingsTermsAndConditions: undefined;
  settingsPrivacyPolicy: undefined;
  playerList: undefined;
  player: undefined;
};

export type BottomTabParams = {
  homeTab: undefined;
  discoverTab: undefined;
  libraryTab: undefined;
  settingsTab: undefined;
};

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
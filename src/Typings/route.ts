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
  home: undefined;
  discover: undefined;
  library: undefined;
  settingStack: NavigatorScreenParams<SettingsStackParams>;
  playerList: undefined;
  player: undefined;
};

export type SettingsStackParams = {
  settings: undefined;
  myAccount: undefined;
  Faq: undefined;
  termsAndConditions: undefined;
  privacyPolicy: undefined;
};

export type OnBoardingProps = NativeStackScreenProps<
  AuthStackParams,
  "onBoarding"
>;

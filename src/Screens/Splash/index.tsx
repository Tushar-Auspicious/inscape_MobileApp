import React, { FC, useEffect } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IMAGES from "../../Assets/images";
import { useAppSelector } from "../../Redux/store";
import { SplashProps } from "../../Typings/route";
import styles from "./style";

const Splash: FC<SplashProps> = ({ navigation }) => {
  const { isOnBoarded, isTermsAccepted, token, isRegistered } = useAppSelector(
    (state) => state.initial
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (token) {
        navigation.replace("mainStack", {
          screen: "tabs",
          params: {
            screen: "homeTab",
          },
        });
      } else {
        if (isOnBoarded) {
          if (isTermsAccepted) {
            navigation.replace("authStack", { screen: "signIn" });
          } else {
            navigation.replace("authStack", { screen: "termsAndConditions" });
          }
        } else {
          navigation.replace("authStack", { screen: "onBoarding" });
        }
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [token, isOnBoarded, isTermsAccepted]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={IMAGES.logo} style={styles.logo} />
    </SafeAreaView>
  );
};

export default Splash;

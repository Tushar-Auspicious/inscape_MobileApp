import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import IMAGES from "../../Assets/images";

const Splash = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={IMAGES.logo} style={styles.logo} />
    </SafeAreaView>
  );
};

export default Splash;

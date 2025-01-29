import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomIcon from "./CustomIcon";
import ICONS from "../Assets/icons";
import COLORS from "../Utilities/Colors";

const TrackPlayer = () => {
  return (
    <View style={{ backgroundColor: "red", width: "100%" }}>
      <Text>TrackPlayer</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomIcon Icon={ICONS.shuffleIcon} height={24} width={24} />
        <CustomIcon Icon={ICONS.playPreviousIcon} height={24} width={24} />
        <TouchableOpacity
          onPress={() => {}}
          style={{
            backgroundColor: COLORS.navyBlue,
            padding: 15,
            borderRadius: 100,
          }}
        >
          <CustomIcon Icon={ICONS.playIcon} height={14} width={14} />
        </TouchableOpacity>
        <CustomIcon Icon={ICONS.playNextIcon} height={24} width={24} />
        <CustomIcon Icon={ICONS.downloadIcon} height={24} width={24} />
      </View>
    </View>
  );
};

export default TrackPlayer;

const styles = StyleSheet.create({});

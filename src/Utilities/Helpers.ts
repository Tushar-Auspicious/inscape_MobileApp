import { Platform } from "react-native";

export const getKeyboardBehaviour =
  Platform.OS === "ios" ? "padding" : "height";

// ToastConfig.js
import React from "react";
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";
import { getAdjustedFontSize } from "./Metrics";
// Assuming you use these for scaling

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      text1Style={{
        fontSize: getAdjustedFontSize(14), // Your desired font size for text1
        fontWeight: "semibold",
        color: "black",
      }}
      text2Style={{
        fontSize: getAdjustedFontSize(13), // Your desired font size for text2
        color: "gray",
      }}
    />
  ),

  /*
    Overwrite 'error' type,
    by default it uses the ErrorToast.
  */
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: getAdjustedFontSize(14), // Your desired font size for text1
        fontWeight: "semibold",
        color: "black",
      }}
      text2Style={{
        fontSize: getAdjustedFontSize(13), // Your desired font size for text2
        color: "gray",
      }}
    />
  ),
};

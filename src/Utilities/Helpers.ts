import { Alert, PermissionsAndroid, Platform } from "react-native";
import RNFS from "react-native-fs";
export const getKeyboardBehaviour =
  Platform.OS === "ios" ? "padding" : "height";

export const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Good Morning";
  } else if (currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

export const downloadFile = async (
  fileUrl: string,
  fileName: string
): Promise<string | null> => {
  try {
    let downloadPath = "";

    if (Platform.OS === "android") {
      // Request permission only for Android 9 (API 28) and below
      if (Platform.Version < 29) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message: "App needs access to your storage to download files",
            buttonPositive: "OK",
          }
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            "Permission Denied!",
            "You need to give storage permission to download the file."
          );
          return null;
        }
      }

      // Use "Downloads" directory for Android 10+
      downloadPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
    } else {
      // Use Documents directory for iOS
      downloadPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    }

    // Download the file
    const options = {
      fromUrl: fileUrl,
      toFile: downloadPath,
      background: true,
      progressDivider: 1,
      progress: (res: { bytesWritten: number; contentLength: number }) => {
        const percentage = (
          (res.bytesWritten / res.contentLength) *
          100
        ).toFixed(2);
        console.log(`Download Progress: ${percentage}%`);
      },
    };

    const result = await RNFS.downloadFile(options).promise;

    if (result.statusCode === 200) {
      console.log("File Downloaded:", downloadPath);
      return downloadPath;
    } else {
      Alert.alert("Error", "Failed to download file.");
      return null;
    }
  } catch (error) {
    Alert.alert("Error", "Something went wrong while downloading.");
    console.error(error);
    return null;
  }
};

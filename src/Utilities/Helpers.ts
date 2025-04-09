import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"; // Import the plugin
import { Alert, PermissionsAndroid, Platform } from "react-native";
import RNFS from "react-native-fs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEYS from "./Constants";
import { FileSystem } from "react-native-file-access";
import { getLocalStorageData } from "./Storage";
import { postData } from "../APIService/api";
import ENDPOINTS from "../APIService/endPoints";

export type audioItem = {
  id: string;
  url: string;
  artwork: string;
  collectionName: string;
  title: string;
  description: string;
  duration: string;
  level: any;
};

export const getKeyboardBehaviour =
  Platform.OS === "ios" ? "padding" : "height";

dayjs.extend(customParseFormat);

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
  fileName: string,
  onProgress?: (percentage: string) => void
): Promise<string | null> => {
  // Encode the URL to handle spaces and special characters
  const encodedUrl = encodeURI(fileUrl);
  const {} = RNFS;
  // Sanitize file name to remove special characters
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  try {
    // Define temporary and final paths
    const tempPath = `${RNFS.TemporaryDirectoryPath}/${sanitizedFileName}`;
    let finalPath = "";

    // Handle Android permissions and final path
    if (Platform.OS === "android") {
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
          throw new Error("Storage permission denied");
        }
      }
      finalPath = `${RNFS.DownloadDirectoryPath}/${sanitizedFileName}`;
    } else {
      // iOS: Use DocumentDirectory for audio files
      // This makes files accessible to the app and can be shared
      finalPath = `${RNFS.DocumentDirectoryPath}/${sanitizedFileName}`;
    }

    console.log("Temporary path:", tempPath);
    console.log("Final download path:", finalPath);

    // Remove existing files at temp and final paths to avoid conflicts
    if (await RNFS.exists(tempPath)) {
      console.log("Removing existing temp file...");
      await RNFS.unlink(tempPath);
    }
    if (await RNFS.exists(finalPath)) {
      console.log("Removing existing final file...");
      await RNFS.unlink(finalPath);
    }

    // Download file to temporary directory
    const downloadOptions = {
      fromUrl: encodedUrl,
      toFile: tempPath,
      background: true,
      progressDivider: 1,
      progress: (res: { bytesWritten: number; contentLength: number }) => {
        const percentage = (
          (res.bytesWritten / res.contentLength) *
          100
        ).toFixed(2);
        console.log(`Download Progress: ${percentage}%`);
        onProgress?.(percentage);
      },
      headers: {
        "Cache-Control": "no-cache",
      },
    };

    const result = await RNFS.downloadFile(downloadOptions).promise;
    console.log("Download result:", result);

    if (result.statusCode !== 200) {
      throw new Error(`Download failed with status code: ${result.statusCode}`);
    }

    // Verify temp file exists and has content
    const tempFileExists = await RNFS.exists(tempPath);
    if (!tempFileExists) {
      throw new Error("Temporary file not found after download");
    }
    const tempFileStats = await RNFS.stat(tempPath);
    if (tempFileStats.size === 0) {
      await RNFS.unlink(tempPath);
      throw new Error("Downloaded temporary file is empty");
    }

    // Copy file from temporary directory to final destination
    if (Platform.OS === "android") {
      // Use FileSystem.cpExternal for Android Downloads folder
      await FileSystem.cpExternal(tempPath, sanitizedFileName, "downloads");
    } else {
      // On iOS, move directly to Documents directory
      await RNFS.moveFile(tempPath, finalPath);

      // For iOS, log the file URL that can be used to access the file
      const fileUrl = `file://${finalPath}`;
      console.log("iOS file URL:", fileUrl);
    }

    // Verify final file exists
    const finalFileExists = await RNFS.exists(finalPath);
    if (!finalFileExists) {
      throw new Error("File not found in final destination after copy");
    }

    console.log("File successfully downloaded and copied to:", finalPath);
    return finalPath;
  } catch (error) {
    console.error("Download error:", error);
    Alert.alert(
      "Download Error",
      error instanceof Error ? error.message : "Failed to download file"
    );
    return null;
  } finally {
    // Clean up temporary file if it still exists
    const tempPath = `${RNFS.TemporaryDirectoryPath}/${sanitizedFileName}`;
    if (await RNFS.exists(tempPath)) {
      await RNFS.unlink(tempPath).catch((err) =>
        console.warn("Failed to clean up temp file:", err)
      );
    }
  }
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const convertDate = (inputDate: string): string => {
  // Parse the input date "26th Mar 2000" with the correct format
  const parsedDate = dayjs(inputDate, "Do MMM YYYY");

  // Check if parsing was successful
  if (!parsedDate.isValid()) {
    throw new Error("Invalid date format");
  }

  // Format to "MM-DD-YYYY"
  return parsedDate.format("MM-DD-YYYY");
};

export const convertStringToDate = (dateString: string) => {
  // The format "Do MMM YYYY" matches "20th Mar 2025"
  const date = dayjs(dateString, "Do MMM YYYY");

  if (date.isValid()) {
    // Convert to Date object if needed
    return date.toDate();
  } else {
    console.error("Invalid date string provided:", dateString);
    return null; // or throw an error, or return a default date
  }
};

// Save downloaded audio info
export const saveDownloadedAudio = async (audioItem: audioItem) => {
  try {
    const existingAudios = await getLocalStorageData(
      STORAGE_KEYS.downloadedAudios
    );

    try {
      await postData(ENDPOINTS.audioHistory, {
        type: "DOWNLOAD",
        audio_id: audioItem.id,
      });
    } catch (error) {
      console.log(error);
    }

    const audios = existingAudios ? existingAudios : [];

    // Check if audio already exists to avoid duplicates
    if (!audios.some((audio: { url: any }) => audio.url === audioItem.url)) {
      // Prepare the audio object to be saved
      const audioData = {
        id: audioItem.id,
        artwork: audioItem.artwork,
        collectionName: audioItem.collectionName,
        title: audioItem.title,
        description: audioItem.description,
        url: audioItem.url,
        downloadedAt: new Date().toISOString(),
        level: audioItem.level,
        duration: audioItem.duration,
      };

      // Save to local storage
      audios.push(audioData);
      await AsyncStorage.setItem(
        STORAGE_KEYS.downloadedAudios,
        JSON.stringify(audios)
      );

      // Make API call to record download history

      // Optional: You might want to handle the API response
      // console.log('API response:', response);
    }
  } catch (error) {
    console.error("Error saving downloaded audio:", error);
    // Optional: You might want to add additional error handling
    // For example, you could remove the item from local storage if the API call fails
  }
};

// Get all downloaded audios
export const getDownloadedAudios = async () => {
  try {
    const storedAudios = await AsyncStorage.getItem(
      STORAGE_KEYS.downloadedAudios
    );

    return storedAudios ? JSON.parse(storedAudios) : [];
  } catch (error) {
    console.error("Error retrieving audios:", error);
    return [];
  }
};

// Remove a specific audio
export const removeDownloadedAudio = async (id: any) => {
  try {
    const storedAudios = await AsyncStorage.getItem(
      STORAGE_KEYS.downloadedAudios
    );
    let audios = storedAudios ? JSON.parse(storedAudios) : [];

    audios = audios.filter((audio: { id: any }) => audio.id !== id);
    await AsyncStorage.setItem(
      STORAGE_KEYS.downloadedAudios,
      JSON.stringify(audios)
    );
  } catch (error) {
    console.error("Error removing audio:", error);
  }
};

export function timeStringToSeconds(timeString: string) {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

export function secondsToTimeString(input: string | number): string {
  const totalSeconds = typeof input === "string" ? parseInt(input, 10) : input;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const paddedHours = String(hours).padStart(2, "0");
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

export const formatPlayerSeconds = (time: number) => {
  return new Date(time * 1000).toISOString().slice(time >= 3600 ? 11 : 14, 19);
};

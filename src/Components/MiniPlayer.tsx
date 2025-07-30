import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useActiveTrack, useProgress } from "react-native-track-player";
import COLORS from "../Utilities/Colors";
import { horizontalScale, verticalScale } from "../Utilities/Metrics";
import CustomIcon from "./CustomIcon";
import ICONS from "../Assets/icons";
import { CustomText } from "./CustomText";
import { usePlayerContext } from "../Context/PlayerContext";

// MiniPlayer component for controlling music from anywhere in the app
const MiniPlayer = () => {
  // Use our custom player context
  const {
    isPlaying,
    playPause,
    currentTrackList,
    currentTrackIndex,
    loadTrack,
    skipToNext,
    skipToPrevious,
  } = usePlayerContext();

  // Get navigation for opening the full player
  const navigation = useNavigation<any>();

  // Get track info from TrackPlayer
  const activeTrack = useActiveTrack();
  const { position, duration } = useProgress();

  // If no track is active, don't render the mini player
  if (!activeTrack) {
    return null;
  }

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (position / duration) * 100 : 0;

  // Get current track data from context for more complete information
  const currentTrackData = currentTrackList[currentTrackIndex];

  // Use description from context track data if available, fallback to activeTrack
  const trackDescription =
    currentTrackData?.description ||
    activeTrack?.description ||
    "Unknown Artist";

  const trackTitle =
    activeTrack.title || currentTrackData?.title || "Unknown Track";
  const trackArtwork = activeTrack.artwork || currentTrackData?.artwork;

  // Navigate to full player screen
  const navigateToPlayer = () => {
    if (currentTrackList.length > 0) {
      navigation.navigate("player", {
        trackList: currentTrackList,
        currentTrackIndex: currentTrackIndex,
      });
    }
  };

  // Handle stopping playback
  const handleClosePlayer = async () => {
    await loadTrack([], 0); // Reset the player with empty tracks
  };

  console.log("activeTrack  ------>", activeTrack.description);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      // onPress={navigateToPlayer}
    >
      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <View
          style={[styles.progressBar, { width: `${progressPercentage}%` }]}
        />
      </View>

      <View style={styles.content}>
        {/* Track artwork and info */}
        <View style={styles.trackInfo}>
          {trackArtwork && (
            <Image source={{ uri: trackArtwork }} style={styles.artwork} />
          )}
          <View style={styles.textContainer}>
            <CustomText numberOfLines={1} style={styles.title}>
              {trackTitle}
            </CustomText>
            <CustomText numberOfLines={1} style={styles.artist}>
              {trackDescription}
            </CustomText>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controlsContainer}>
          {/* Previous button */}
          <TouchableOpacity
            style={styles.controlButton}
            onPress={skipToPrevious}
            disabled={currentTrackIndex <= 0}
          >
            <CustomIcon
              Icon={ICONS.playPreviousIcon}
              height={16}
              width={16}
              style={{ opacity: currentTrackIndex > 0 ? 1 : 0.5 }}
            />
          </TouchableOpacity>

          {/* Play/Pause button */}
          <TouchableOpacity style={styles.playButton} onPress={playPause}>
            <CustomIcon
              Icon={isPlaying ? ICONS.pauseIcon : ICONS.playIcon}
              height={18}
              width={18}
            />
          </TouchableOpacity>

          {/* Next button */}
          <TouchableOpacity
            style={styles.controlButton}
            onPress={skipToNext}
            disabled={currentTrackIndex >= currentTrackList.length - 1}
          >
            <CustomIcon
              Icon={ICONS.playNextIcon}
              height={16}
              width={16}
              style={{
                opacity:
                  currentTrackIndex < currentTrackList.length - 1 ? 1 : 0.5,
              }}
            />
          </TouchableOpacity>

          {/* Close button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClosePlayer}
          >
            <CustomIcon Icon={ICONS.WhiteCrossIcon} height={16} width={16} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex: 999,
    backgroundColor: COLORS.darkNavyBlue,
  },
  progressBarContainer: {
    width: "100%",
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  progressBar: {
    height: "100%",
    backgroundColor: COLORS.darkPink,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(10),
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  trackInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.6,
    marginRight: horizontalScale(8),
  },
  artwork: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: horizontalScale(10),
  },
  textContainer: {
    flex: 1,
    marginRight: horizontalScale(4),
  },
  title: {
    color: COLORS.white,
    fontSize: 14,
  },
  artist: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    flex: 1,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.navyBlue,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: horizontalScale(6),
  },
  controlButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.navyBlue,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: horizontalScale(4),
  },
  closeButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.navyBlue,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: horizontalScale(6),
  },
});

export default MiniPlayer;

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { FC, useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActiveTrack } from "react-native-track-player";
import ICONS from "../../Assets/icons";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale, wp } from "../../Utilities/Metrics";
import CustomIcon from "../CustomIcon";
import { CustomText } from "../CustomText";
import MiniPlayer from "../MiniPlayer";
import { CommonActions } from "@react-navigation/native";

const BottomTabBar: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets(); // Get safe area insets for dynamic padding adjustment
  const activeTrack = useActiveTrack(); // Get the active track to adjust bottom tab bar padding
  const [hasActiveTrack, setHasActiveTrack] = useState(false);

  const [tabCoords, setTabCoords] = useState({
    x: 0,
    y: 0,
    height: 0,
  });

  // Check if there's an active track
  useEffect(() => {
    setHasActiveTrack(!!activeTrack);
  }, [activeTrack]);

  // Dynamically render the appropriate icon for each tab based on its route name and focus state
  const renderIcon = (routeName: string, isFocused: boolean) => {
    const icons: Record<string, any> = {
      homeTab: isFocused ? ICONS.HomeSolid : ICONS.Home,
      libraryTab: isFocused ? ICONS.DiscoverSolid : ICONS.Discover,
      discoverTab: isFocused ? ICONS.SearchSolid : ICONS.Search,
      settingsTab: isFocused ? ICONS.SettingsSolid : ICONS.Settings,
    };

    return icons[routeName] || null; // Return the corresponding icon or null if not found
  };

  // Handle tab press events, including navigation and preventing default behavior if necessary
  // const handlePress = (
  //   routeKey: string,
  //   routeName: string,
  //   isFocused: boolean
  // ) => {
  //   const event = navigation.emit({
  //     type: "tabPress",
  //     target: routeKey,
  //     canPreventDefault: true, // Allow preventing navigation on tab press
  //   });

  //   if (!isFocused && !event.defaultPrevented) {
  //     navigation.navigate(routeName); // Navigate to the selected tab
  //   }
  // };

  const handlePress = (
    routeKey: string,
    routeName: string,
    isFocused: boolean
  ) => {
    const event = navigation.emit({
      type: "tabPress",
      target: routeKey,
      canPreventDefault: true,
    });

    if (routeName === "homeTab") {
      navigation.dispatch({
        ...CommonActions.reset({
          index: 0,
          routes: [{ name: "homeTab", state: { routes: [{ name: "home" }] } }],
        }),
      });
    }
    if (routeName === "discoverTab") {
      navigation.dispatch({
        ...CommonActions.reset({
          index: 0,
          routes: [
            { name: "discoverTab", state: { routes: [{ name: "discover" }] } },
          ],
        }),
      });
    }
    if (routeName === "settingsTab") {
      navigation.dispatch({
        ...CommonActions.reset({
          index: 0,
          routes: [
            { name: "settingsTab", state: { routes: [{ name: "settings" }] } },
          ],
        }),
      });
    }
    // }
    else {
      navigation.navigate(routeName); // Normal tab navigation
    }
  };

  return (
    <>
      <View
        style={{
          position: "absolute",
          top: tabCoords.y - tabCoords.height + insets.bottom + 3,
          left: tabCoords.x,
          zIndex: 100,
          width: wp(100),
        }}
      >
        <MiniPlayer />
      </View>
      <View
        onLayout={(e) => {
          setTabCoords({
            x: e.nativeEvent.layout.x,
            y: e.nativeEvent.layout.y,
            height: e.nativeEvent.layout.height,
          });
        }}
        style={[
          styles.tabContainer,
          {
            // Adjust bottom padding dynamically based on the safe area and platform
            paddingBottom:
              insets.bottom +
              verticalScale(
                Platform.OS === "ios" ? verticalScale(10) : verticalScale(12)
              ),
          },
        ]}
      >
        {/* Map over all tab routes and render each tab button */}
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]; // Get route options
          const label = options.tabBarLabel || options.title || route.name; // Determine the label for the tab
          const isFocused = state.index === index; // Check if the current tab is focused

          return (
            <Pressable
              key={route.key} // Unique key for each tab
              onPress={() => handlePress(route.key, route.name, isFocused)} // Handle tab press
              onLongPress={
                () =>
                  navigation.emit({ type: "tabLongPress", target: route.key }) // Emit long press event
              }
              accessibilityState={isFocused ? { selected: true } : {}} // Set accessibility state for the selected tab
              accessibilityLabel={options.tabBarAccessibilityLabel} // Add accessibility label
              style={styles.tabButton} // Style for the tab button
            >
              {/* Render the tab icon */}
              <CustomIcon
                Icon={renderIcon(route.name, isFocused)}
                height={20}
                width={20}
              />
              {/* Render the tab label */}
              <CustomText
                type="small"
                fontFamily={isFocused ? "bold" : "regular"} // Bold text for focused tab
                color={isFocused ? COLORS.darkNavyBlue : COLORS.mixGreyBlue} // Dynamic text color based on focus state
              >
                {label as string} {/* Display the label */}
              </CustomText>
            </Pressable>
          );
        })}
      </View>
    </>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row", // Arrange tabs in a row
    paddingHorizontal: horizontalScale(10), // Horizontal padding for the tab container
    paddingTop: verticalScale(12), // Top padding for the tab container
    backgroundColor: COLORS.white, // Background color for the tab bar
  },
  tabButton: {
    flex: 1, // Equal space for each tab
    alignItems: "center", // Center-align content horizontally
    justifyContent: "center", // Center-align content vertically
    gap: verticalScale(8), // Space between icon and label
  },
  icon: {
    width: horizontalScale(20), // Icon width
    height: verticalScale(20), // Icon height
  },
});

/**
 * @format
 */

import { AppRegistry } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import TrackPlayer from "react-native-track-player";
import { Provider } from "react-redux";
import App from "./App";
import { name as appName } from "./app.json";
import { PlaybackService } from "./src/PlayerServices/PlayBackService";
import { store } from "./src/Redux/store";

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(AppWrapper));
TrackPlayer.registerPlaybackService(() => PlaybackService);

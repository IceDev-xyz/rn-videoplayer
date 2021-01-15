/**
 * @format
 */

import { AppRegistry, LogBox } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

LogBox.ignoreLogs([
  "Remote debugger",
  "Warning:",
  "VirtualizedLists should never be nested",
  "Require cycle:",
]);

AppRegistry.registerComponent(appName, () => App);

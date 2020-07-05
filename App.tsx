import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "./app/scences/Login";
import Signup from "./app/scences/Signup";
import OtpInputScreen from "./app/scences/OtpInputScreen";
import HomeScreen from "./app/scences/HomeScreen/HomeScreen";
import UpdateProfile from "./app/scences/UpdateProfile";
import NetworkIssueScreen from "./app/scences/NetworkIssueScreen";
const MainNavigator = createStackNavigator({
  LogIn: { screen: Login },
  Signup: { screen: Signup },
  HomeScreen: { screen: HomeScreen },
  UpdateProfile: { screen: UpdateProfile },
  OtpScreen: { screen: OtpInputScreen },

  NetworkIssueScreen: { screen: NetworkIssueScreen },
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});
// static navigationOptions = {
//   header: null,
// };
const AppContainer = createAppContainer(MainNavigator);
export default class App extends Component<{}> {
  static navigationOptions = {
    header: null,
  };
  checkForRegistedDevices = function () { };
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#a4a4a4",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

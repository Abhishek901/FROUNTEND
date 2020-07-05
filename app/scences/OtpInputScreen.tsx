import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  Button,
  Alert,
} from "react-native";
import OtpInputs from "@twotalltotems/react-native-otp-input";
import Logo from "../component/Logo";
import { withNavigation } from "react-navigation";
import { AsyncStorage } from "react-native";
class OtpInputScreen extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      isTimeOut: false,
      goLogin: false,
      goSignUp: false,
      userVerified: false
    };
  }

  onCodeChangeHandler = async (userInputOTP) => {
    try {
      const phoneNumber = await AsyncStorage.getItem("phoneNumber");
      const fullName = await AsyncStorage.getItem("fullName");
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          otp: userInputOTP,
          phoneNumber: phoneNumber,
          fullName: fullName,
        }),
      };
      try {
        const requestPointer = await fetch(
          "http:localhost:5000/api/auth/verify",
          requestOptions
        );
        let data = await requestPointer;
        const text = await requestPointer.json();
        if (data.status == 300) {
          try {
            const asyncStorageKeys = await AsyncStorage.getAllKeys();
            if (asyncStorageKeys.length > 0) {
              await AsyncStorage.clear();
            }
            const setAccessToken = await AsyncStorage.setItem("token", text.tokens[0]);
            const setReffreshToken = await AsyncStorage.setItem(
              "reffreshToken",
              text.tokens[1]
            );
            if (text.moveto == "user_account") {
              console.log("Redirect to user accounts");
              const { navigate } = this.props.navigation.navigate(
                "HomeScreen"
              );
            }
          } catch (err) {
            console.log('error in keys set in local storage', err);
          }
        } else if (data.status == 301) {
          const asyncStorageKeys = await AsyncStorage.getAllKeys();
            if (asyncStorageKeys.length > 0) {
              await AsyncStorage.clear();
            }
            const setAccessToken = await AsyncStorage.setItem("token", text.tokens[0]);
            const setReffreshToken = await AsyncStorage.setItem(
              "reffreshToken",
              text.tokens[1]
            );
          Alert.alert(text.message)
          console.log("Redirect to Login");
          const { navigate } = this.props.navigation.navigate("UpdateProfile");
        } else if (data.status == 400) {
          Alert.alert(text.message)
          console.log("Redirect to Login");
          const { navigate } = this.props.navigation.navigate("LogIn");
        }
        else if (data.status == 201) {
          Alert.alert(text.message)
          console.log("Redirect to Login");
          const { navigate } = this.props.navigation.navigate("LogIn");
        } else if (data.status == 500) {
          Alert.alert(text.message)
        } else (
          Alert.alert("Other Issue")
        )
      } catch (error) { }
    } catch (err) { }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#494949" barStyle="light-content" />
        <Logo />
        <OtpInputs
          style={{ width: "100%", height: 200 }}
          pinCount={4}
          //code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeFilled={this.onCodeChangeHandler}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
        />
        <Text style={styles.buttonText}>
          {this.state.isTimeOut ? "Please wait for" : "Click on send again"}
        </Text>
        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit OTP</Text>
        </TouchableOpacity> */}
        <View style={styles.signTextContaint}>
          <Text style={styles.signUpText}>Did not get otp yet?</Text>
          <Text style={styles.loginButton}> Send again</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#819ca9",
    flexGrow: 1,
    paddingRight: 56,
    paddingLeft: 56,
  },
  button: {
    backgroundColor: "#494949",
    width: 251,
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
    flexDirection: "row",
    paddingLeft: 85,
    //alignItems: 'flex-end',
  },
  buttonText: {
    flexGrow: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    flexDirection: "column-reverse",
  },
  signTextContaint: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row",
  },
  signUpText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
  },
  loginButton: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#494949",
  },
  logoStyle: {},
});

export default withNavigation(OtpInputScreen);

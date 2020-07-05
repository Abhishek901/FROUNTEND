import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  processColor,
} from "react-native";
import Icon from "../component/Icon";
import PhoneInput from "../component/PhoneInput";
import UserTextInput from "../component/UserTextInput";
import { withNavigation } from "react-navigation";
import { AsyncStorage } from "react-native";
class Form extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: null,
      username: "",
    };
  }
  handleChangeUsername = (text: String) => {
    this.setState({ username: text });
  };
  handleChangePhoneNumber = (number: Number) => {
    this.setState({ phoneNumber: number });
  };
  signUpUser = async () => {
    const { navigate } = this.props.navigation;
    if (this.state.username == "" || this.state.phoneNumber == null) {
      Alert.alert("Please Enter name or password");
    } else {
      let results: Response;

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: this.state.username,
          phoneNumber: this.state.phoneNumber,
        }),
      };

      try {
        const singUpPointer = await fetch(
          "http://localhost:5000/api/auth/signup",
          requestOptions
        );
        let results = await singUpPointer.json();
        console.log(JSON.stringify(results));
        if (results.ok && singUpPointer.status === 200) {
          try {
            await AsyncStorage.setItem("phoneNumber", this.state.phoneNumber);
            await AsyncStorage.setItem("fullName", this.state.username);
            navigate("OtpScreen");
          } catch (err) {
            Alert.alert("There is some intrenal issue please reload the App");
          }
        } else {
          //Alert.alert("Problem with your network connection please check the same");
          console.log(results.ok, results.status);
          alert("Please check your Internet connection!!!");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  render() {
    const inputStyle = {
      position: "relative",
      width: 300,
      backgroundColor: "rgba(225,225,225,1)",
      borderRadius: 25,
      paddingHorizontal: 16,
      paddingLeft: 40,
      padding: 10,
      fontSize: 16,
      color: "#000000",
      margin: 5,
    };
    const iconStyle = {
      position: "absolute",
      zIndex: 1,
      top: 17,
      left: 16,
      color: "#ffffff",
    };
    return (
      <View style={styles.container}>
        <UserTextInput
          iconStyle={iconStyle}
          inputStyle={inputStyle}
          placeHolder="Enter Full Name"
          iconPath={require("../assets/icon/perm_identity-24px.svg")}
          handleChangeusername={this.handleChangeUsername}
        />

        <PhoneInput
          placeHolder="Enter Phone Number"
          iconStyle={iconStyle}
          inputStyle={inputStyle}
          iconPath={require("../assets/icon/stay_current_portrait-24px.svg")}
          handleChangePhoneNumber={this.handleChangePhoneNumber}
        />

        <TouchableOpacity style={styles.button} onPress={this.signUpUser}>
          <Icon imagePath={require("../assets/icon/donut_small-24px.svg")} />
          <Text style={styles.buttonText}>{this.props.type}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#494949",
    width: 300,
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
    flexDirection: "row",
    paddingLeft: 105,
    //alignItems: 'flex-end',
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "left",
    marginLeft: 10,
  },
});

export default withNavigation(Form);

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "../component/Icon";
import PhoneInput from "../component/PhoneInput";
import { withNavigation } from "react-navigation";
import { AsyncStorage } from "react-native";
class FormLogin extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: null,
    };
  }
  handleChangePhoneNumber = (number: Number) => {
    this.setState({ phoneNumber: number });
  };

  async componentDidMount() {
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
      AsyncStorage.clear();
    }
  }

  logIn = async () => {
    const { navigate } = this.props.navigation;
    if (this.state.phoneNumber == null) {
      Alert.alert("Please Enter phone number");
    } else {

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: this.state.phoneNumber,
        }),
      };

      console.log('FE PN state');
      console.log(this.state.phoneNumber);
      try {
        const singUpPointer = await fetch(
          "http://localhost:5000/api/auth/login",
          requestOptions
        );
        console.log('FE PN state');
        console.log(this.state.phoneNumber);
        let results = await singUpPointer.json();
        console.log(JSON.stringify(results));
        if (results.ok && singUpPointer.status === 200) {
          try {
            console.log('In Async Storge in App');
            await AsyncStorage.setItem("phoneNumber", this.state.phoneNumber);
            navigate("OtpScreen");
          } catch (err) {
            Alert.alert("There is some intrenal issue please reload the App");
          }


        } else {
          //Alert.alert("Problem with your network connection please check the same");

          alert("Please check your Internet connection!!!");
        }
      } catch (err) {
        Alert.alert("There is some intrenal issue please reload the App");
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
        <PhoneInput
          iconStyle={iconStyle}
          inputStyle={inputStyle}
          iconPath={require("../assets/icon/stay_current_portrait-24px.svg")}
          handleChangePhoneNumber={this.handleChangePhoneNumber}
        />
        <TouchableOpacity style={styles.button} onPress={this.logIn}>
          <Icon imagePath={require("../assets/icon/donut_small-24px.svg")} />
          <Text style={styles.buttonText}>Log in</Text>
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

export default withNavigation(FormLogin);

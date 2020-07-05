import React, { useState, Component, Props } from "react";
import { Alert, View, StyleSheet, TextInput } from 'react-native';
import Icon from "./Icon";
export default class PhoneInput extends Component<{}> {
    state: {
        phoneNumber: number,
    }
    constructor(props: Props) {
        super(props);
        this.state = {
            phoneNumber: null
        }
    }


    handleTextChange = async (text) => {
        await this.setState({ phoneNumber: text });
        this.props.handleChangePhoneNumber(this.state.phoneNumber)

    }

    render() {
        return (
            <View>
                <Icon IconStyle={this.props.iconStyle} imagePath={this.props.iconPath} />
                <TextInput
                    style={this.props.inputStyle}
                    placeholder={this.props.placeHolder}
                    maxLength={10}
                    onChangeText={(text) => this.handleTextChange(text)}
                    keyboardType="phone-pad"

                />
            </View>
        );
    }
}

// const PhoneInput = (props) => {
//     const [value, setPhoneNumber] = useState(null);
//     return (
//         <View>
//             <Icon IconStyle={props.iconStyle} imagePath={props.iconPath} />
//             <TextInput
//                 onBlur={() => props.handleChangePhoneNumber(value)}
//                 style={props.inputStyle}
//                 keyboardType="phone-pad"
//                 onChangeText={(text) => this.setState({ text })}
//                 value={this.state.text}
//                 maxLength={10}
//                 underlineColorAndroid="rgba(0,0,0,0)"
//                 placeholder="Enter Mobile Number" />
//         </View>
//     )

// }
//export default PhoneInput;
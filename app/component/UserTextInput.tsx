import React, { Component } from "react";
import { Alert, View, StyleSheet, TextInput } from 'react-native';
import Icon from "./Icon";

export default class UserTextInput extends Component<{}> {
    state: {
        userName: string,   
    }
    constructor(props: Props) {
        super(props);
        this.state = {
            userName: ''
        }
    }

    changeTextHandeler = async(text)=>{
        await this.setState({ userName: text });
        this.props.handleChangeusername(this.state.userName)
    }

    render() {
        return (
            <View>
                <Icon IconStyle={this.props.iconStyle} imagePath={this.props.iconPath} />
                <TextInput
                    style={this.props.inputStyle}
                    placeholder={this.props.placeHolder}
                    onChangeText={this.changeTextHandeler}
                    keyboardType="default"
                />
            </View>
        );
    }
}



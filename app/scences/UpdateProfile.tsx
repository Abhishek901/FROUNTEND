import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import PhotoUpload from '../component/PhotoUpload';
import FileUpload from '../component/FileUpload';
import dataLayer from '../../data-layer'
export default class UdateProfile extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            isValid: false,
            errors: false,
            user_id: {}
        };
    }

    componentDidMount() {
        dataLayer.getCurrentUserData().then((data) => {
            data.json().then(async (data) => {
                const id = data.message[0]._id;
                console.log(id)
                await this.setState({ user_id: id })
            })
        })
    }

    onNextStep = () => {
        if (!this.state.isValid) {
            this.setState({ errors: false });
        } else {
            this.setState({ errors: false });
        }
    };

    render() {
        const buttonTextStyle = {
            color: '#000000'
        };
        return (
            <View style={{ flex: 1 }}>
                <ProgressSteps borderWidth={2} >
                    <ProgressStep label="Upload profile picture" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}>
                        <View style={{ alignItems: 'center' }}>
                            <PhotoUpload user_id={this.state.user_id}></PhotoUpload>
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Upload documents" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}>
                        <View style={{ alignItems: 'center' }}>
                            <FileUpload user_id={this.state.user_id}></FileUpload>
                        </View>
                    </ProgressStep>
                </ProgressSteps>
            </View>
        );
    }
}

const styles = StyleSheet.create({


    container: {
        backgroundColor: '#819ca9',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoStyle: {
        flexGrow: 1,
    },
    signTextContaint: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row',
    },
    signUpText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16
    },
    loginButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
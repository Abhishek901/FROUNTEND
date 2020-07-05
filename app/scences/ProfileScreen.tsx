import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import Icon from '../component/Icon';
import UserTextInput from '../component/UserTextInput';
import PhoneInput from '../component/PhoneInput';
import LogoHeader from '../component/LogoHeader';
export default class ProfileScreen extends Component<{}> {
    static navigationOptions = {
        header: null,
    };
    handleChangeUsername = () => { }
    handleChangePhoneNumber = () => { }
    render() {
        const PhoneNumberIconPhone = {
            color: '#ffffff',
            marginRight: 7,
        }
        const DocsIcon = {
            color: '#ffffff',
            marginRight: 7,
        }
        return (
            <View style={styles.container}>

                <StatusBar backgroundColor="#494949" barStyle="light-content" />
                <LogoHeader></LogoHeader>
                <View style={styles.hearderStyle}>
                    <View style={styles.avatar}>
                        <Image source={require('../assets/icon/man.png')} style={styles.AvatarStyle} />
                    </View>
                    <View style={styles.details}>
                        <View style={styles.Name}>
                            <Text style={styles.NameText}>Robin Giusspe</Text>
                        </View>
                        <View style={styles.PhoneNumber}>
                            <Icon IconStyle={PhoneNumberIconPhone} imagePath={require('../assets/icon/white-phon.svg')} />
                            <Text style={styles.PhoneNumberText}>+91-7299773377</Text>
                            <Image style={styles.PhoneNumberIconVerified} source={require('../assets/icon/confirm.png')} />
                        </View>
                        <View style={styles.Docs}>
                            <Icon IconStyle={DocsIcon} imagePath={require('../assets/icon/assignment-24px.svg')} />
                            <Text style={styles.DocsText}>Documnets</Text>
                            <Image style={styles.DocsIconVerified} source={require('../assets/icon/confirm.png')} />
                        </View>
                        <View style={styles.Earing}>
                            <Text style={styles.EaringText}>My Earings</Text>
                            <Image style={styles.EaringIcon} source={require('../assets/icon/rupee.png')} />
                        </View>
                        <View style={styles.Price}>
                            <Image style={styles.PriceIcon} source={require('../assets/icon/rupee1.png')} />
                            <Text style={styles.AmountText}>1000.00</Text>
                        </View>


                    </View>

                </View>

                <View style={styles.bodyStyle}>
                    <UserTextInput
                        iconStyle={styles.InputIconStyle}
                        inputStyle={styles.inputStyle}
                        placeHolder="Update Full Name"
                        iconPath={require('../assets/icon/perm_identity-24px.svg')}
                        handleChangeusername={this.handleChangeUsername}
                    />
                    <PhoneInput
                        placeHolder="Update Phone Number"
                        iconStyle={styles.InputIconStyle}
                        inputStyle={styles.inputStyle}
                        iconPath={require('../assets/icon/stay_current_portrait-24px.svg')}
                        handleChangePhoneNumber={this.handleChangePhoneNumber}
                    />
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.UploadbuttonText}>Upload Documnets</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    UploadbuttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#494949',
        width: 300,
        borderRadius: 25,
        marginVertical: 7,
        paddingVertical: 12,
        alignItems: 'center'
    },
    container: {
        backgroundColor: '#819ca9',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    hearderStyle: {
        flex: 1,
        flexWrap: 'wrap',
        backgroundColor: '#546e7a',
        minWidth: '100%',
        minHeight: 200,
        // borderBottomRightRadius: 100,
        // borderBottomLeftRadius: 100,
        flexDirection: 'row'
    },
    AvatarStyle: {
        maxHeight: 130,
        maxWidth: 130,
        marginStart: 20,
        marginTop: 50
    },
    bodyStyle: {
        paddingTop: 40,
        flex: 8,
    },
    avatar: {
        flex: 3,
        //backgroundColor: '#ffffff',
    },
    details: {
        flex: 4,
        minHeight: 200,
        paddingTop: 40,
    },
    Name: {
        marginBottom: 10
    },
    NameText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20
    },
    PhoneNumber: {
        flexDirection: 'row',
        marginBottom: 10
    },
    PhoneNumberText: {
        color: '#ffffff',
        fontSize: 16,
        marginTop: 1
    },
    PhoneNumberIconVerified: {
        maxHeight: 20,
        maxWidth: 20,
        marginLeft: 7,
        marginTop: 2
    },
    Docs: {
        flexDirection: 'row',
    },
    DocsText: {
        color: '#ffffff',
        fontSize: 16,
        marginTop: 1
    },
    DocsIconVerified: {
        maxHeight: 20,
        maxWidth: 20,
        marginLeft: 7,
        marginTop: 2
    },
    Earing: {
        paddingTop: 15,
        flexDirection: 'row'
    },
    EaringText: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    EaringIcon: {
        maxWidth: 30,
        maxHeight: 30,
        marginLeft: 7
    },
    Price: {
        color: 'white',
        flexDirection: 'row',
    },
    PriceIcon: {
        maxWidth: 15,
        maxHeight: 15,
        marginTop: 5,
        marginRight: 7
    },
    AmountText: {
        color: '#ffffff',
        fontSize: 16,
        position: 'relative',
    },
    inputStyle: {
        position: 'relative',
        width: 300,
        backgroundColor: "rgba(225,225,225,1)",
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingLeft: 40,
        padding: 10,
        fontSize: 16,
        color: "#000000",
        margin: 5,
    },
    InputIconStyle: {
        position: 'absolute',
        zIndex: 1,
        top: 17,
        left: 16,
        color: '#ffffff'
    }
});
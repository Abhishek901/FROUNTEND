import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import LogoHeader from '../../../component/LogoHeader';
import { FontAwesome5, MaterialIcons, Feather, SimpleLineIcons, Octicons } from '@expo/vector-icons';
export default class Details extends Component<{}> {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <LogoHeader></LogoHeader>
                <View style={styles.hearderStyle}>
                    <View style={styles.avatar}>
                        <Image
                            style={styles.tinyLogo}
                            source={{ uri: this.props.profilePicture}}
                        />
                    </View>
                    <View style={styles.details}>
                        <View style={styles.Name}>
                            <Text style={styles.NameText}>{this.props.fullName}</Text>
                        </View>
                        <View style={styles.PhoneNumber}>
                            <Feather style={styles.PhoneNumberIconPhone} name="smartphone" size={15} color="white" />
                            <Text style={styles.PhoneNumberText}>+91-{this.props.phoneNumber}</Text>
                            <MaterialIcons style={styles.PhoneNumberIconVerified} name="verified-user" size={17} color="white" />
                        </View>
                        <View style={styles.Docs}>
                            <SimpleLineIcons style={styles.PhoneNumberIconPhone} name="docs" size={15} color="white" />
                            <Text style={styles.DocsText}>Documnets</Text>
                            <Octicons style={styles.PhoneNumberIconVerified} name="verified" size={17} color="white" />
                        </View>
                        <View style={styles.Earing}>
                            <FontAwesome5 style={styles.PhoneNumberIconPhone} name="money-check" size={15} color="black" />
                            <Text style={styles.EaringText}>My Earings</Text>
                        </View>
                        <View style={styles.Price}>
                            <FontAwesome5 style={styles.PhoneNumberIconPhone} name="rupee-sign" size={15} color="white" />
                            <Text style={styles.AmountText}>{this.props.income}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    //Search and filte
    PhoneNumberIconPhone: {
        color: '#ffffff',
        marginRight: 5,
        position: "relative",
        top: 2
    },
    tinyLogo: {
        width: 119,
        height: 119,
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
        minHeight: 160,
        // borderBottomRightRadius: 100,
        // borderBottomLeftRadius: 100,
        flexDirection: 'row'
    },
    bodyStyle: {
        paddingTop: 40,
        flex: 8,
    },
    avatar: {
        flex: 3,
        backgroundColor: '#ffffff',
        maxHeight: 120,
        maxWidth: 120,
        marginTop: 20,
        marginLeft: 25,
        borderRadius: 12,
        borderStyle: "dotted",
        borderWidth: 1,
        overflow: "hidden"
    },
    AvatarStyle: {
        position: "relative",
        bottom: 9,
        right: 29,
        padding: 10
    },
    details: {
        flex: 4,
        minHeight: 440,
        padding: 20,
        marginLeft: 10
    },
    Name: {
        marginBottom: 4
    },
    NameText: {
        color: '#ffffff',
        fontWeight: "600",
        fontSize: 17
    },
    PhoneNumber: {
        flexDirection: 'row',
        marginBottom: 1
    },
    PhoneNumberText: {
        color: '#ffffff',
        fontSize: 15,
        marginTop: 0
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
        fontSize: 15,
        marginTop: 1
    },
    DocsIconVerified: {
        maxHeight: 20,
        maxWidth: 20,
        marginLeft: 7,
        marginTop: 2
    },
    Earing: {
        paddingTop: 8,
        flexDirection: 'row'
    },
    EaringText: {
        fontSize: 15,
        color: '#ffffff',
        fontWeight: '600',
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

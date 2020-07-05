import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default class LogoHeader extends Component<{}>{
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <View style={styles.container}>
                <Image style={styles.logoStyle} source={require('../assets/img/Globo_logo_REV.png')} />
                <Ionicons style={styles.notification} name="ios-notifications-outline" size={30} color="white" />
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {

        container: {
            backgroundColor: '#29434e',
            minWidth: '100%',
            minHeight: 65,
            alignItems: 'flex-start',
            paddingTop: 9,
            zIndex: 1,
            flexDirection: 'row',
        },
        logoStyle: {
            flexGrow: 1,
            maxHeight: 50,
            maxWidth: 240
        },
        notification: {
           position:"relative",
           top:9 ,
           left: 65 
        },

    }
)
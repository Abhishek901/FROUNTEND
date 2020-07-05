import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
export default class Logo extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logoStyle}
                    source={require('../assets/img/Globo_logo_REV.png')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column-reverse'
    },
    logoStyle: {
        width: 300,
        height: 200,
    },
});


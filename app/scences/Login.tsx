import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import Logo from '../component/Logo';
import FormLogin from '../component/FormLogin';
export default class Login extends Component<{}> {
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#494949" barStyle="light-content" />
                <Logo style={styles.logoStyle} />
                <FormLogin type="Signup" ref={'signup'} />
                <View style={styles.signTextContaint} >
                    <Text style={styles.signUpText}>Do not have an account?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                        <Text style={styles.loginButton} > Sign in</Text>
                    </TouchableOpacity>
                </View>
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
import React, { Component, useState } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Button } from 'react-native';
const OTPTimmer = function (props) {
    const [timmer, setTimmer] = useState(props.timmer);

    let intervel = setInterval(() => {
        if (timmer === 0) {
            clearInterval(intervel);
        }
        console.log(timmer);
        setTimmer(timmer - 1);
    }, 1000);
    return (
        <View>
            <Text>{timmer}</Text>
        </View>
    )
}

export default OTPTimmer;
import React, { Component } from "react";
import { Alert, View, Image, StyleSheet } from 'react-native';
import SvgUri from 'react-native-svg-uri';

const Icon = (props) => {
    return (
        <SvgUri style={props.IconStyle} source={props.imagePath} />
    );
}

export default Icon;
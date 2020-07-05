import React, { useCallback } from 'react'
import { View, Text, StatusBar, StyleSheet, ScrollView } from 'react-native'
import { createNavigator } from 'react-navigation'
import AppTabRouter from './AppTabRouter'
import AppTabView from './AppTabView'
const HomeScreen = createNavigator(AppTabView, AppTabRouter, {})
export default HomeScreen
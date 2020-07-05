import React, { useCallback, useEffect, useState } from 'react'
import Details from './Details/Details'
import SearchAndFilter from './SerachAndFilter/SearchAndFilter'
import { View, StatusBar } from 'react-native'
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation'
import { EvilIcons, FontAwesome5 } from '@expo/vector-icons';
import dataLayer from '../../../data-layer'
const AppTabView = (props) => {
    const tabs = [
        { key: 'Profile', label: 'Profile', barColor: '#29434e', icon: 'user' },
        { key: 'Shipments', label: 'Shipments', barColor: '#29434e', icon: 'user' },
        { key: 'History', label: 'History', barColor: '#29434e', icon: 'user' }
    ]
    const { navigation, descriptors } = props
    const { routes, index } = navigation.state
    const activeScreenName = routes[index].key
    const descriptor = descriptors[activeScreenName]
    const ActiveScreen = descriptor.getComponent()
    const handleTabPress = useCallback(
        newTab => navigation.navigate(newTab.key),
        [navigation]
    )
    const [number, setPhonenumber] = useState(0);
    const [name, setName] = useState('User');
    const [incomeValue, setIncome] = useState(0);
    const [profile, setProfile] = useState(' ');
    useEffect(() => {
        dataLayer.getCurrentUserData().then((data) => {
            data.json().then((data) => {
                console.log(data.message[0])
                setPhonenumber(data.message[0].phoneNumber);
                setName(data.message[0].fullName);
                (Boolean(data.message[0].profilePic)) ? setProfile(`${dataLayer._imageUrl}/${data.message[0].profilePic}`) : setProfile('http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png');
                (Boolean(data.message.incomeType) && data.message.incomeType == "salaried") ? setIncome(data.message[0].income) : setIncome(5000)
            })
        })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#494949" barStyle="light-content" />
            <View style={{ flex: 4 }}>
                <Details fullName={name} phoneNumber={number} income={incomeValue} profilePicture={profile}></Details>
            </View>
            <View style={{ flex: 1 }}>
                <SearchAndFilter></SearchAndFilter>
            </View>
            <View style={{ flex: 6 }}>
                <ActiveScreen navigation={descriptor.navigation} />
            </View>
            <BottomNavigation
                tabs={tabs}
                activeTab={activeScreenName}
                onTabPress={handleTabPress}
                renderTab={
                    ({ tab, isActive }) => {
                        let Icon = undefined;

                        switch (tab.label) {
                            case 'Profile':
                                Icon = <EvilIcons name={tab.icon} size={30} color="white" />
                                break;
                            case 'Shipments':
                                Icon = <FontAwesome5 name="shipping-fast" size={20} color="white" />
                                break;
                            case 'History':
                                Icon = <FontAwesome5 name="history" size={20} color="white" />
                                break;
                        }

                        return (
                            <FullTab
                                isActive={isActive}
                                key={tab.key}
                                label={tab.label}
                                renderIcon={() => Icon}
                            />
                        )
                    }}
            />
        </View>
    )
}

export default AppTabView;

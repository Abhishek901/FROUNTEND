import React from 'react'
import { View, Text , StyleSheet} from 'react-native';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
const SearchAndFilter = () => (
    <View style={styles.search_And_filter}>
        <View style={styles.search}>
            <Octicons name="search" size={24} color="white" />
            <Text style={styles.search_text}>Search</Text>

        </View>
        <View style={styles.filter}>
            <MaterialIcons name="filter-list" size={26} color="white" />
            <Text style={styles.filter_text}>Filter</Text>
        </View>

    </View>
)

const styles = StyleSheet.create({
    //Search and filter
    search_And_filter: {
        minHeight: 50,
        backgroundColor: '#819ca9',
        marginTop: 0,
        flexDirection: 'row',
        padding: 10,
        paddingTop: 2,
        paddingHorizontal: 25,
    },
    search: {
        minWidth: '50%',
        flexDirection: 'row',
        borderRightColor: '#ffffff',
        borderRightWidth: 1,
        marginTop: 10
    },
    filter: {
        marginLeft: 30,
        marginTop: 10,
        minWidth: '50%',
        flexDirection: 'row'
    },

    search_text: {
        color: '#ffffff',
        marginLeft: 14,
        marginTop: 2
    },

    filter_text: {
        color: "#ffffff",
        marginLeft: 14,
        marginTop: 2
    },

});

export default SearchAndFilter;
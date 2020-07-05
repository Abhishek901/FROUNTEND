import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, Modal, Alert, TouchableOpacity, Picker, TouchableHighlight, FlatList } from 'react-native';
import { FontAwesome5, Feather, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import call from 'react-native-phone-call';
import dataLayer from '../../../../../data-layer';
export default class Shipment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            statusModel: false,
            status: 'pickup'
        }
    }
    makeCall = () => {
        const args = {
            number: this.props.shipment.user_info[0].phoneNumber,
            prompt: false,
        };
        call(args).catch(console.error);
    }

    changeStatus = () => {
        this.setState({ statusModel: true })
        dataLayer.updateShipmentStatus(this.props.shipment._id, this.state.status).then((shipment) => {
            console.log('in update sucesss..........')
            console.log(shipment.status)
            if (shipment.status == 200) {
                this.props.navigation.navigate('History')
            } else {

            }
        }).catch((err) => {
            console.log(err);
        })
    }
    openPopUp = () => {
        this.setState({ modalVisible: true })
    }
    render() {
        return (
            <View style={styles.shipment}>
                <View style={styles.cust_name_header}>
                    <Text style={styles.shipment_cust_name}>
                        {this.props.shipment.user_info[0].cust_name}
                    </Text>
                    <TouchableOpacity onPress={this.openPopUp}>
                        <Text style={styles.shipment_expend} >
                            <Ionicons name="ios-arrow-dropdown" size={24} color="black" />
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.shipment_status}>
                        {this.props.shipment.status}
                    </Text>
                    <TouchableOpacity onPress={this.makeCall}>
                        <Text style={styles.shipment_phone_call} >
                            <Feather name="phone-outgoing" size={20} color="black" />
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.shipment_address_container}>
                    <View style={styles.shipment_vandor_info}>
                        <Text style={styles.shipment_vandor_name}>
                            {this.props.shipment.vendor_name}
                        </Text>
                        <Text style={styles.shipment_address}>
                            {this.props.shipment.user_info[0].address1}, {this.props.shipment.user_info[0].city}, {this.props.shipment.user_info[0].zip}
                        </Text>
                    </View>
                    <View style={styles.shipment_price}><Text style={styles.cost_of_shipment}><FontAwesome5 name="rupee-sign" size={14} color="black" />{this.props.shipment.shipment_cost.$numberDecimal}</Text></View>
                </View>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalVisible}
                >
                    <View style={styles.headerStyle}>
                        <Text style={styles.headerTextStyle}>Shipment Details</Text>
                        <Text style={styles.statusTextStyle}>{this.props.shipment.status}</Text>
                    </View>
                    <FlatList
                        data={[
                            { key: 'Customer Name', value: this.props.shipment.user_info[0].cust_name },
                            { key: 'Address 1', value: this.props.shipment.user_info[0].address1 },
                            { key: 'Address 2', value: this.props.shipment.user_info[0].address2 },
                            { key: 'Street', value: this.props.shipment.user_info[0].street },
                            { key: 'City', value: this.props.shipment.user_info[0].city },
                            { key: 'State', value: this.props.shipment.user_info[0].state },
                            { key: 'Pin Code', value: this.props.shipment.user_info[0].zip },
                        ]}
                        renderItem={({ item }) => {
                            return (
                                <ScrollView style={styles.modelContainer}>
                                    <View style={styles.shipment_main_area}>
                                        <Text style={styles.item}>{item.key}</Text>
                                        <Text style={styles.value}>{item.value}</Text>
                                    </View>
                                </ScrollView>
                            )
                        }}
                    />
                    <View style={styles.bottomStyle}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ modalVisible: !this.state.modalVisible });
                            }}>
                            <Text style={styles.backButton}><MaterialCommunityIcons name="backburger" size={24} color="white" /></Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.changeStatus}>
                            <Text style={styles.backButton}><AntDesign name="edit" size={24} color="white" /></Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.makeCall}>
                            <Text style={styles.backButton}><Feather name="phone-outgoing" size={24} color="white" /></Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* this is for status change screen */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.statusModel}
                >
                    <View style={styles.pickerStyleContainer}>
                        <View>
                            <Text style={styles.headerStylePicker}>Change Status</Text>
                        </View>
                        <View style={styles.pickerStyle}>
                            <Picker
                                selectedValue={this.state.status}
                                style={{ height: 50, width: 200 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ status: itemValue })}>
                                <Picker.Item label="pickup" value="pickup" />
                                <Picker.Item label="Delivered" value="Delivered" />
                                <Picker.Item label="Out For Delivery" value="OFD" />
                                <Picker.Item label="Rejected By Customer" value="RBC" />

                            </Picker>
                        </View>
                        <View style={styles.bottomStylePicker}>
                            <TouchableOpacity onPress={() => { this.setState({ statusModel: !this.state.statusModel }) }}>
                                <Text style={styles.backButton}>
                                    <MaterialCommunityIcons name="backburger" size={24} color="white" />
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.changeStatus}>
                                <Text style={styles.backButton}>
                                    <AntDesign name="save" size={24} color="white" />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View >
        )
    }
}


const styles = StyleSheet.create({
    // Model Picker start form here
    pickerStyle: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'center',

        paddingStart: 25
    },
    pickerStyleContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    bottomStylePicker: {
        fontSize: 25,
        padding: 25,
        backgroundColor: "#ffffff",
        color: "#ffffff",
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopColor: '#194D3340',
        borderTopWidth: 1
    },
    headerStylePicker: {
        fontSize: 25,
        padding: 25,
        backgroundColor: "#29434e",
        color: "#ffffff"
    },
    //Model picker ends here
    // Model Stylings starts here
    statusTextStyle: {
        color: '#ffffff',
        backgroundColor: 'red',
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 2,
        borderRadius: 120
    },
    headerTextStyle: {
        fontSize: 20,
        color: "#ffffff"
    },
    bottomStyle: {
        fontSize: 25,
        padding: 25,
        backgroundColor: "#ffffff",
        color: "#ffffff",
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopColor: '#194D3340',
        borderTopWidth: 1
    },
    backButton: {
        color: "#ffffff",
        padding: 22,
        margin: 12,
        backgroundColor: "#29434e",
        flexDirection: 'column',
        borderRadius: 120
    },
    shipment_container: {
        backgroundColor: '#ffffff',
        minWidth: '100%',
        paddingHorizontal: 1,
    },
    shipment_main_area: {
        minWidth: '100%',
        overflow: 'scroll',
    },
    value: {
        padding: 10,
        paddingLeft: 10,
        fontSize: 18,
        height: 44,
        borderBottomColor: "#194D3340",
        borderBottomWidth: 1
    },
    container: {
        paddingTop: 22,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: "#29434e",
        fontWeight: 'bold'
    },

    modelContainer: {
        margin: 15,
    },

    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 25,
        backgroundColor: "#29434e",

    },
    // Model Stylings ends here


    //start for shipment cards styles

    shipment: {
        minWidth: '100%',
        minHeight: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    cost_of_shipment: {
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#f57c00',
        marginHorizontal: 10,
        marginLeft: 35,
        paddingTop: 10,
        paddingLeft: 8,
        borderRadius: 200,
        minWidth: 45,
        maxWidth: 45,
        minHeight: 45,
        maxHeight: 45,
        borderWidth: 4,
        borderColor: "#bb4d00"
    },
    cust_name_header: {
        paddingVertical: 5,
        marginHorizontal: 22,
        borderBottomColor: '#819ca9',
        borderStyle: "dotted",
        borderBottomWidth: 1,
        flexDirection: 'row',

    },
    shipment_cust_name: {
        marginTop: 4,
        fontWeight: 'bold',
    },
    shipment_status: {
        backgroundColor: '#000051',
        padding: 2,
        borderRadius: 30,
        paddingHorizontal: 10,
        color: '#ffffff',
        marginHorizontal: 5,
        marginLeft: 75
    },
    shipment_phone_call: {
        marginTop: 3,
    },
    shipment_expend: {
        marginLeft: 5
    },
    shipment_address_container: {

        minHeight: 65,
        flexDirection: 'row',
        padding: 5,
        paddingHorizontal: 25,
        marginTop: 4

    },
    shipment_vandor_info: {
        flex: 6,
        flexDirection: 'column'
    },
    shipment_vandor_name: {
        fontSize: 15,
    },
    shipment_address: {
        fontSize: 12
    },
    shipment_price: {
        flex: 3
    },
    //end for shipment cards styles
    //start for shipment styles

});


import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Shipment from './Shipment/Shipment';
import dataLayer from '../../../../data-layer';

export class Shipments extends Component<{}> {

    constructor(props) {
        super(props)
        this.state = {
            shipmants: [],
            error: false,
            loaded: false,
        }
    }
    componentDidMount = () => {
        console.log('Here in mounted in shipment component.......................');
        dataLayer.loadShipments().then((shipment) => {
            shipment.json().then(async (shipment) => {
                await this.setState({ shipmants: shipment.message })
                console.log(this.state.shipmants);
                this.setState({ loaded: true })
            }).catch(async (err) => {
                await this.setState({ error: true })
            })
        })
    }

    render() {
        const isLoaded = this.state.loaded;
        let shipments = [];
        if (isLoaded) {
            shipments = this.state.shipmants.map((shipmant, key) => {
                return (<Shipment key={key} shipment={shipmant}></Shipment>)
            })
        } else {
            shipments = (<View style={{ flex: 1, padding: 20 }}>
                <ActivityIndicator />
            </View>)
        }


        return (
            <ScrollView style={styles.shipment_container}>
                <ScrollView style={styles.shipment_main_area}>
                    {shipments}
                </ScrollView>
            </ScrollView>
        )
    }

}


const styles = StyleSheet.create({
    shipment_container: {
        backgroundColor: '#ffffff',
        minWidth: '100%',
        paddingHorizontal: 1,
    },
    shipment_main_area: {
        minWidth: '100%',
        overflow: 'scroll',
    },
});

export default Shipments
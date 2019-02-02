import React, {Component} from 'react';
import {View, Alert, AsyncStorage} from 'react-native';
import {ListItem} from "react-native-elements";
import {SERVER_URL} from "../../config/ServerConfig";
import CommonUtil from "../../util/CommonUtil";

export default class OwnerOrdersView extends Component {

    state = {
        orders: []
    };

    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#3F4752",
            elevation: null
        },
        title: 'Stocks',
        headerTintColor: 'white',
        headerLeft: null
    };

    componentDidMount() {
        this.loadOrders();
    }

    loadOrders = async () => {
        let token = await AsyncStorage.getItem('token').then(token => token);
        fetch(`${SERVER_URL}/api/owner/orders`, {headers: {'authorization': token}}).then(response => response.json())
            .then(data => {
                if (!data.error) {
                    this.setState({orders: data})
                } else {
                    Alert.alert("Error", data.error);
                }
            }).catch(() => {
            Alert.alert("Error", "No connection");
        })
    };


    render() {
        return (
            <View>
                {
                    this.state.orders.map((order, index) => (
                        <ListItem
                            key={index}
                            title={`Title: ${order.name} Client: ${order.client}`}
                            subtitle={`${CommonUtil.getLocalDate(order.date_departure, 'ru')} - ${CommonUtil.getLocalDate(order.date_arrival, 'ru')}`}
                        />
                    ))
                }
            </View>
        );
    }

}
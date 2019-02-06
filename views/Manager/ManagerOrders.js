import React, {Component} from 'react';
import {View, Alert, AsyncStorage} from 'react-native';
import {ListItem} from "react-native-elements";
import {SERVER_URL} from "../../config/ServerConfig";
import CommonUtil from "../../util/CommonUtil";
import OrdersList from "../../components/lists/OrdersList";

export default class ManagerOrdersView extends Component {

    state = {
        orders: []
    };

    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#3F4752",
            elevation: null
        },
        title: 'Orders',
        headerTintColor: 'white',
        headerLeft: null
    };

    componentDidMount() {
        this.loadOrders();
    }

    loadOrders = async () => {
        let token = await AsyncStorage.getItem('token').then(token => token);
        console.log(token);
        fetch(`${SERVER_URL}/api/manager/orders`, {headers: {'authorization': token}}).then(response => response.json())
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
                <OrdersList orders={this.state.orders}/>
            </View>
        );
    }

}
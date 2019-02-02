import React, {Component} from 'react';
import {View, Alert, AsyncStorage} from 'react-native';
import {ListItem} from "react-native-elements";
import {SERVER_URL} from "../../config/ServerConfig";

export default class OwnerStocksList extends Component {

    state = {
        stocks: []
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

    componentDidMount(){
        this.loadStocks();
    }

    loadStocks = async () => {
        let token = await AsyncStorage.getItem('token').then(token=>token);
        fetch(`${SERVER_URL}/api/owner/stocks`, {headers: {'authorization': token}}).then(response => {
            return response.json();
        }).then(data => {
            if (data.error === undefined) {
                this.setState({
                    stocks: data
                })
            } else {
                Alert.alert(data.error);
            }
        }).catch(() => {
            Alert.alert("Error", "No connection");
        })
    };


    render() {
        return (
            <View>
                {
                    this.state.stocks.map((stock, index) => (
                        <ListItem
                            key={index}
                            title={`Name: ${stock.name} Address: ${stock.address}`}
                            subtitle={index.toString()}
                        />
                    ))
                }
            </View>
        );
    }


}
import React from 'react';
import {View} from 'react-native';
import {ListItem, Text} from "react-native-elements";


export default class OrdersList extends React.Component {

    render() {
        return (
            <View>
                {
                    this.props.orders ? this.props.orders.map((order,index)=>{
                        return <ListItem
                            key={index}
                            title={order.name}
                            subtitle={`${order.date_departure} - ${order.date_arrival}`}
                        />
                    }) : <Text>No orders yet</Text>
                }
            </View>
        );
    }

}
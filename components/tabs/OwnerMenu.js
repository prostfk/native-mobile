import React from "react";
import {
    StyleSheet,
    Text,
    View,
    StatusBar
} from "react-native";
import { BottomNavigation } from 'react-native-material-ui';
import { Actions } from 'react-native-router-flux';


class OwnerMenu extends React.Component {


    state = {
        active: 'today'
    };

    changeTab = tab => {
        this.setState({
            active: tab
        });
        Actions.jump(tab);

    };

    render() {
        return (
            <View>
                <BottomNavigation active={this.state.active} hidden={false} >
                    <BottomNavigation.Action
                        key="index"
                        icon="home"
                        label="Index"
                        onPress={() => this.changeTab('index')}
                    />
                    <BottomNavigation.Action
                        key="ownerStocks"
                        icon="domain"
                        label="Stocks"
                        onPress={() => this.changeTab('ownerStocks')}
                    />
                    <BottomNavigation.Action
                        key="ownerOrders"
                        icon="shopping-cart"
                        label="Orders"
                        onPress={() => this.changeTab('ownerOrders')}
                    />
                    <BottomNavigation.Action
                        key="ownerUsers"
                        icon="people"
                        label="Users"
                        onPress={() => this.changeTab('ownerUsers')}
                    />
                </BottomNavigation>
            </View>
        );
    }
}
export default OwnerMenu;
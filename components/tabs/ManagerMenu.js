import React from "react";
import {
    StyleSheet,
    Text,
    View,
    StatusBar
} from "react-native";
import { BottomNavigation } from 'react-native-material-ui';
import { Actions } from 'react-native-router-flux';


export default class ManagerMenu extends React.Component {


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
                        key="managerOrders"
                        icon="domain"
                        label="Orders"
                        onPress={() => this.changeTab('managerOrders')}
                    />

                </BottomNavigation>
            </View>
        );
    }
}
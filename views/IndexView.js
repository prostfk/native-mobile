import React, {Component} from 'react';
import {View, AsyncStorage, Text} from 'react-native';
import { Actions } from 'react-native-router-flux';
import OwnerMenu from "../components/tabs/OwnerMenu";

export default class IndexView extends Component {

    componentDidMount(){
        this.initUser();
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#3F4752",
            elevation: null
        },
        headerTintColor: 'white'
    };

    initUser = async () => {
        await AsyncStorage.clear();
        // console.log(res);
        AsyncStorage.getItem("token").then(token=>{
            if (!token){
                Actions.auth();
            }else{
                Actions.user();
            }
        });
    };

    render() {
        return (
            <View>
                <Text>Lol index</Text>
            </View>
        );
    }


}
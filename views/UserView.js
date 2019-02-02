import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {View, Text} from 'react-native';


export default class UserView extends Component {

    state = {
        message: ''
    };

    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#3F4752",
            elevation: null
        },
        headerLeft: null,
        headerTintColor: 'white'
    };

    componentDidMount(){
        AsyncStorage.getItem('role').then(role=>{
            this.setState({
                message: role
            })
        })
    }

    render(){
        return <View>
            <Text>
                Auth user - {this.state.message}
            </Text>
        </View>
    }


}
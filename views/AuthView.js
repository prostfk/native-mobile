import React, {Component} from 'react';
import {View, Alert, AsyncStorage} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SERVER_URL} from "../config/ServerConfig";
import { Actions } from 'react-native-router-flux';


export default class AuthView extends Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#3F4752",
            elevation: null
        },
        headerTintColor: 'white',
        headerLeft: null

    };

    state = {
        username: 'owner1',
        password: 'zxccxz'
    };

    auth = () => {
        let formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        fetch(`${SERVER_URL}/api/auth`, {method: 'post', body: formData}).then(response=>response.json())
            .then(data=>{
                if (data.token){
                    AsyncStorage.setItem('role', data.userRole);
                    AsyncStorage.setItem('token', data.token).then(()=>{
                        Actions.user();
                    });
                }
            }).catch(e=>Alert.alert("Error",e.toString()))
    };

    changeInput = (field, value) => {
        this.setState({
            [field]: value
        })
    };

    render() {
        return (
            <View>
                <Input onChange={(value)=>this.changeInput('username', value)} value={this.state.username} placeholder={'username'}/>
                <Input onChange={(value)=>this.changeInput('password', value)} value={this.state.password} secureTextEntry={true} placeholder={'password'}/>
                <Button onPress={this.auth} title={'Submit'}/>

            </View>
        );
    }

}
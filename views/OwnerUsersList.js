import React, {Component} from 'react';
import {View, Alert, AsyncStorage} from 'react-native';
import {ListItem} from "react-native-elements";
import {SERVER_URL} from "../config/ServerConfig";

export default class OwnerUsersList extends Component {

    state = {
        users: []
    };

    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#3F4752",
            elevation: null
        },
        headerTintColor: 'white',
        headerLeft: null
    };

    componentDidMount(){
        this.loadUsers();
    }

    loadUsers = async () => {
        let token = await AsyncStorage.getItem('token').then(token=>token);
        console.log(token);
        fetch(`${SERVER_URL}/api/users?page=1`, {headers: {'authorization': token}}).then(response => {
            return response.json();
        }).then(data => {
            if (data.error) {
                console.log(data);
                this.setState({
                    users: data.content
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
                    this.state.users.map((user, index) => (
                        <ListItem
                            key={index}
                            title={`${user.firstName} ${user.secondName}`}
                            subtitle={this.__processRole(user.userRole)}
                        />
                    ))
                }
            </View>
        );
    }

    __processRole = role => {
        return role.split('_')[1].toLowerCase();
    }

}
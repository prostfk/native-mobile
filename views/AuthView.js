import React, {Component} from 'react';
import {View, Alert, AsyncStorage} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SERVER_URL} from "../config/ServerConfig";
import {Actions} from 'react-native-router-flux';
import connect from "react-redux/es/connect/connect";
import {LOGIN} from "../constants/actions/UserActions";


class AuthView extends Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#3F4752",
            elevation: null
        },
        headerTintColor: 'white',
        headerLeft: null

    };

    state = {
        username: 'manager1',
        password: 'zxccxz'
    };

    auth = () => {
        let formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        fetch(`${SERVER_URL}/auth`, {method: 'post', body: formData}).then(response => response.json())
            .then(async data => {
                if (data.token) {
                    this.props.setUser({
                        role: data.role,
                        token: data.token,
                        name: this.state.username
                    });
                    Actions.index();
                }
            }).catch(e => Alert.alert("Error", e.toString()))
    };

    changeInput = (field, value) => {
        this.setState({
            [field]: value
        })
    };

    render() {
        return (
            <View>
                <Input onChange={(value) => this.changeInput('username', value)} value={this.state.username}
                       placeholder={'username'}/>
                <Input onChange={(value) => this.changeInput('password', value)} value={this.state.password}
                       secureTextEntry={true} placeholder={'password'}/>
                <Button onPress={this.auth} title={'Submit'}/>

            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.userReducer
    };
};

const mapDispatchToProps = dispatch => {
    return ({
        setUser: (payload) => {
            dispatch({
                type: LOGIN, payload
            })
        }
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthView);

import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {View, Text} from 'react-native';
import {LOGOUT} from "../constants/actions/UserActions";
import connect from "react-redux/es/connect/connect";


class UserView extends Component {

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


    render(){
        return <View>
            <Text>
                Auth user - {this.props.user.role}
            </Text>
        </View>
    }
}
const mapStateToProps = state => {
    return {
        user: state.userReducer
    };
};

const mapDispatchToProps = dispatch => {
    return ({
        logout: () => {
            dispatch({
                type: LOGOUT
            })
        }
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(UserView);
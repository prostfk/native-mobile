import React, {Component} from 'react';
import {View, AsyncStorage, Text} from 'react-native';
import { Actions } from 'react-native-router-flux';
import OwnerMenu from "../components/tabs/OwnerMenu";
import {LOGIN, LOGOUT} from "../constants/actions/UserActions";
import connect from "react-redux/es/connect/connect";
import {Button} from "react-native-elements";

class IndexView extends Component {

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

    initUser = () => {
        console.log(this.props.user.role);
        this.props.user.role ? Actions.user() : Actions.auth();
    };

    render() {
        return (
            <View>
                <Text>Lol index</Text>
                <Button onPress={()=>{this.props.logout(); Actions.auth()}}>Logout</Button>
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
        logout: () => {
            dispatch({
                type: LOGOUT
            })
        }
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexView);

import React, {Component} from 'react';
import {View, Alert, AsyncStorage} from 'react-native';
import {ListItem} from "react-native-elements";
import {SERVER_URL} from "../config/ServerConfig";
import {SET_ORDERS} from "../constants/actions/OrderActions";
import connect from "react-redux/es/connect/connect";
import {SET_WORKERS} from "../constants/actions/WorkerActions";

class OwnerUsersList extends Component {

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
        let token = this.props.user.token;
        fetch(`${SERVER_URL}/api/users?page=1`, {headers: {'authorization': token}}).then(response => {
            return response.json();
        }).then(data => {
            if (!data.error) {
                console.log(data);
                this.props.setWorkers(data)
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
                    this.props.workers.map((user, index) => (
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
const mapStateToProps = state => {
    return {
        user: state.userReducer,
        workers: state.workerReducer
    };
};

const mapDispatchToProps = dispatch => {
    return ({
        setWorkers: payload => {
            dispatch({
                type: SET_WORKERS, payload
            })
        }
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerUsersList);

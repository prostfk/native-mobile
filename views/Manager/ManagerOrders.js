import React, {Component} from 'react';
import {View, Alert, AsyncStorage} from 'react-native';
import {ListItem} from "react-native-elements";
import {SERVER_URL} from "../../config/ServerConfig";
import CommonUtil from "../../util/CommonUtil";
import OrdersList from "../../components/lists/OrdersList";
import {LOGOUT} from "../../constants/actions/UserActions";
import connect from "react-redux/es/connect/connect";
import {SET_ORDERS} from "../../constants/actions/OrderActions";

class ManagerOrdersView extends Component {

    state = {
        orders: []
    };

    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#3F4752",
            elevation: null
        },
        title: 'Orders',
        headerTintColor: 'white',
        headerLeft: null
    };

    componentDidMount() {
        this.loadOrders();
    }

    loadOrders = async () => {
        let token = this.props.user.token;
        console.log(token);
        fetch(`${SERVER_URL}/api/manager/orders?page=1`, {headers: {'authorization': token}}).then(response => response.json())
            .then(data => {
                if (!data.error) {
                    this.props.setOrders(data);
                } else {
                    Alert.alert("Error", data.error);
                }
            }).catch(() => {
            Alert.alert("Error", "No connection");
        })
    };


    render() {
        return (
            <View>
                <OrdersList orders={this.props.orders}/>
            </View>
        );
    }

}
const mapStateToProps = state => {
    return {
        user: state.userReducer,
        orders: state.orderReducer
    };
};

const mapDispatchToProps = dispatch => {
    return ({
        setOrders: payload => {
            dispatch({
                type: SET_ORDERS, payload
            })
        }
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerOrdersView);
import React, {Component} from 'react';
import {AsyncStorage, View} from 'react-native';
import {ROLE_MANAGER, ROLE_OWNER} from "../../constants/Roles";
import OwnerMenu from "./OwnerMenu";
import ManagerMenu from "./ManagerMenu";
import {LOGIN} from "../../constants/actions/UserActions";
import connect from "react-redux/es/connect/connect";
import {Text} from "react-native-elements";

class Menu extends Component {

    getNav = () => {
        switch (this.props.user.role) {
            case ROLE_OWNER:
                return <OwnerMenu/>;
            case ROLE_MANAGER:
                return <ManagerMenu/>;
            default:
                return <Text>Anon</Text>;
        }
    };

    render() {
        console.log(this.props.user);
        return this.props.user.role ? this.getNav() : <View/>;
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer
    };
};
export default connect(mapStateToProps, null)(Menu);

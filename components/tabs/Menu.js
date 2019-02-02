import React from 'react';
import {AsyncStorage} from 'react-native';
import {ROLE_OWNER} from "../../constants/Roles";
import OwnerMenu from "./OwnerMenu";

export default class Menu extends React.Component {

    processRole = () => { //todo add roles menu
        AsyncStorage.getItem('role').then(role=>{
            switch (role) {
                case ROLE_OWNER:
                    return <OwnerMenu/>;
                default:
                    return <></>
            }
        });
    };

    render() {
        return (
            this.processRole()
        );
    }

}
import React from 'react';
import {StyleSheet, AsyncStorage, View} from 'react-native';
import {Router, Scene} from "react-native-router-flux";
import IndexView from "./views/IndexView";
import UserView from "./views/UserView";
import AuthView from "./views/AuthView";
import {Icon} from "react-native-elements";
import BottomNavigation, {FullTab} from 'react-native-material-bottom-navigation'
import OwnerUsersList from "./views/OwnerUsersList";
import OwnerMenu from "./components/tabs/OwnerMenu";
import OwnerOrdersView from "./views/Owner/OwnerOrdersView";
import OwnerStocksList from "./views/Owner/OwnerStocksView";
import Menu from "./components/tabs/Menu";

export default class App extends React.Component {

    state = {//todo = check tabs for role
        auth: false
    };

    componentDidMount(){
        AsyncStorage.getItem('role').then(role=>{
            if (role){
                this.setState({
                    auth: true
                })
            }
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Router>
                    <Scene key={'root'}>
                        <Scene key={'index'} component={IndexView} title={"Welcome"} initial/>
                        <Scene key={'user'} component={UserView} title={'user page'}/>
                        <Scene key={'auth'} component={AuthView} title={'Auth'}/>
                        <Scene key={'ownerUsers'} component={OwnerUsersList} title={'List'}/>
                        <Scene key={'ownerOrders'} component={OwnerOrdersView} title={'List'}/>
                        <Scene key={'ownerStocks'} component={OwnerStocksList} title={'List'}/>
                    </Scene>
                </Router>
                <Menu/>
            </View>
        )
    }





};
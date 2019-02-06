import {combineReducers} from "redux";
import userReducer from './UserReducer';
import orderReducer from './OrderReducer';
import workerReducer from './WorkerReducer';

export default combineReducers({
    userReducer,
    orderReducer,
    workerReducer

})
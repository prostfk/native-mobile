import {ADD_ORDER, SET_ORDERS} from "../constants/actions/OrderActions";

export default (state = [], action) => {
    switch (action.type) {
        case SET_ORDERS:
            return action.payload;
        case ADD_ORDER:
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
}
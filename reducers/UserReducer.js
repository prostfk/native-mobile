import {LOGIN, LOGOUT} from "../constants/actions/UserActions";

export default (state = {}, action) => {

    switch (action.type) {
        case LOGIN:
            let {role,token,name} = action.payload;
            return {role,token,name};
        case LOGOUT:
            return {};
        default:
            return state;
    }

}
import {SET_WORKERS} from "../constants/actions/WorkerActions";

export default (state = [], action) => {
    switch (action.type) {
        case SET_WORKERS:
            return action.payload;
        default:
            return state;
    }
}
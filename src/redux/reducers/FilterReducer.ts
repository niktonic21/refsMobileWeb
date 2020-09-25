import { FILTER_CHANGED } from '../actions';

const INITIAL_STATE = {
    liga: 0,
    mesiac: 0,
    rozhodca: ''
};
export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case FILTER_CHANGED: {
            const { key, value } = action.payload;
            return { ...state, [key]: value };
        }
        default:
            return state;
    }
};

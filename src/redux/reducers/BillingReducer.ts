import { SAVE_BILLING } from '../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case SAVE_BILLING: {
            const { season, gameId, data } = action.payload;
            return { ...state, [season]: { ...[season], [gameId]: data } };
        }
        default:
            return state;
    }
};

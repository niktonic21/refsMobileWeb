import { GAMES_REQUEST, GAMES_RECEIVE, GAMES_ERROR } from '../actions';

const INITIAL_STATE = { games: [], loading: false, error: '' };

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case GAMES_REQUEST:
            return { ...state, loading: true };
        case GAMES_RECEIVE:
            return { ...state, games: action.games, loading: false };
        case GAMES_ERROR:
            return { ...state, error: action.error, loading: false };
        default:
            return state;
    }
};

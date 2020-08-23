import {
    GAMES_REQUEST,
    GAMES_RECEIVE,
    GAMES_ERROR,
    REFS_REQUEST,
    REFS_RECEIVE,
    REFS_ERROR,
    GAMES_MONTHS,
    GAMES_UPDATE
} from '../actions';

const INITIAL_STATE = {
    games: [],
    refs: [],
    months: [],
    loading: false,
    error: '',
    lastUpdated: 0
};

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case GAMES_REQUEST:
            return { ...state, loading: true };
        case GAMES_RECEIVE:
            return { ...state, games: action.games, loading: false };
        case GAMES_ERROR:
            return { ...state, error: action.error, loading: false };
        case REFS_REQUEST:
            return { ...state, loading: true };
        case REFS_RECEIVE:
            return { ...state, refs: action.refs, loading: false };
        case REFS_ERROR:
            return { ...state, error: action.error, loading: false };
        case GAMES_MONTHS: {
            return { ...state, months: action.months };
        }
        case GAMES_UPDATE: {
            return { ...state, lastUpdated: action.lastUpdated };
        }
        default:
            return state;
    }
};

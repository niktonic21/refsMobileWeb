import { SAVE_GAME, SAVE_GAME_SUCCESS, SAVE_GAME_ERROR } from '../actions';

const INITIAL_STATE = {
    seasons: {}
};

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case SAVE_GAME: {
            const oldGame = state.seasons?.[action.season]?.[action.data.gameId];
            return {
                ...state,
                seasons: {
                    [action.season]: { [action.data.gameId]: { ...oldGame, ...action.data } }
                }
            };
        }
        case SAVE_GAME_SUCCESS:
        case SAVE_GAME_ERROR:
        default:
            return state;
    }
};

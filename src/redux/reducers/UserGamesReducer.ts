import { SAVE_GAME, SAVE_GAME_SUCCESS, SAVE_GAME_ERROR } from '../actions';

const INITIAL_STATE = {
    seasons: {}
};

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case SAVE_GAME: {
            const { season, data } = action;
            const gameId = data?.gameId;
            const oldGame = state.seasons?.[season]?.[gameId];
            const seasonsGame = { ...state.seasons?.[season], [gameId]: { ...oldGame, ...data } };
            return {
                ...state,
                seasons: {
                    [season]: seasonsGame
                }
            };
        }
        case SAVE_GAME_SUCCESS:
        case SAVE_GAME_ERROR:
        default:
            return state;
    }
};

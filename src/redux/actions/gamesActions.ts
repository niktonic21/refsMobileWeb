import backend from '../backend';

export const GAMES_REQUEST = 'games_request';
export const GAMES_RECEIVE = 'games_receive';
export const GAMES_ERROR = 'games_error';

export const requestGames = () => ({
    type: GAMES_REQUEST
});

export const receivedGames = (games: any) => ({
    type: GAMES_RECEIVE,
    games
});

export const fetchGameRejected = (games: any) => ({
    type: GAMES_ERROR,
    games
});

export const fetchGames = (monthId: number) => {
    return async (dispatch: any) => {
        try {
            dispatch(requestGames());
            const result = await backend.request({
                route: `/games/${monthId}`
            });
            dispatch(receivedGames(result));
        } catch (error) {
            console.log('Getting Games Error---------', error);
            dispatch(fetchGameRejected(error));
        }
    };
};

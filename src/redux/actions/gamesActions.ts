import { requestR, request } from '../backend';

export const GAMES_REQUEST = 'games_request';
export const GAMES_RECEIVE = 'games_receive';
export const GAMES_ERROR = 'games_error';
export const REFS_REQUEST = 'refs_request';
export const REFS_RECEIVE = 'refs_receive';
export const REFS_ERROR = 'refs_error';
export const GAMES_MONTHS = 'games_months';

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
            const result = await request({
                route: `/games/${monthId}`
            });
            dispatch(receivedGames(result));
        } catch (error) {
            console.log('Getting Games Error---------', error);
            dispatch(fetchGameRejected(error));
        }
    };
};

export const requestRefs = () => ({
    type: REFS_REQUEST
});

export const receivedRefs = (refs: any) => ({
    type: REFS_RECEIVE,
    refs
});

export const fetchRefsRejected = (refs: any) => ({
    type: REFS_ERROR,
    refs
});

export const fetchRefs = () => {
    return async (dispatch: any) => {
        try {
            dispatch(requestRefs());
            const result = await requestR();
            dispatch(receivedRefs(result));
        } catch (error) {
            console.log('Getting Referees Error---------', error);
            dispatch(fetchRefsRejected(error));
        }
    };
};

export const filterMonths = (months: Array<object>) => ({
    type: GAMES_MONTHS,
    months
});

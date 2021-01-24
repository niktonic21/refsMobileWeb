import * as firebase from 'firebase';
import { IGameDetail } from 'src/screens/GameScreen';

export const SAVE_GAME = 'user_game_data';
export const SAVE_GAME_SUCCESS = 'user_game_save_success';
export const SAVE_GAME_ERROR = 'user_game_save_error';

export const saveGame = (gameData: IGameDetail) => (dispatch: any, state) => {
    const season = state().auth.profile.season;
    dispatch({
        type: SAVE_GAME,
        data: gameData,
        season: season
    });
    const { user } = state().auth.user;

    if (!user) return;
    ///referees/jobbagymartin/seasons/20192020/games/2416
    firebase
        .firestore()
        .collection('referees')
        .doc(user.uid)
        .collection('seasons')
        .doc(season)
        .collection('games')
        .doc(gameData.gameId)
        .set(gameData, { merge: true })
        .then(() => {
            dispatch({
                type: SAVE_GAME_SUCCESS
            });
        })
        .catch(error => {
            dispatch({
                type: SAVE_GAME_ERROR,
                error
            });
        });
};

export const getGameById = (gameId: string) => (dispatch: any, state: any) => {
    const season = state().auth.profile.season;
    const { user } = state().auth.user;

    if (!user) return;

    firebase
        .firestore()
        .collection('referees')
        .doc(user.uid)
        .collection('seasons')
        .doc(season)
        .collection('games')
        .doc(gameId)
        .onSnapshot(doc => {
            if (doc.exists) {
                dispatch({
                    type: SAVE_GAME,
                    data: doc.data(),
                    season: season
                });
            } else {
                dispatch({
                    type: SAVE_GAME_ERROR,
                    error: 'No firebase data'
                });
            }
        });
};

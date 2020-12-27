import * as firebase from 'firebase';
import { IGameDetail } from 'src/screens/GameScreen';

export const SAVE_GAME = 'user_game_data';
export const SAVE_GAME_SUCCESS = 'user_game_save_success';
export const SAVE_GAME_ERROR = 'user_game_save_error';

export const saveGame = (gameData: IGameDetail) => (dispatch: any) => {
    const currentSeason = '20192020';
    const { currentUser } = firebase.auth();
    if (!currentUser) return;
    ///referees/jobbagymartin/seasons/20192020/games/2416
    firebase
        .firestore()
        .collection('referees')
        .doc(currentUser.uid)
        .collection('seasons')
        .doc(currentSeason)
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

    return {
        type: SAVE_GAME,
        data: gameData,
        season: currentSeason
    };
};

export const getGameById = (gameId: string) => (dispatch: any) => {
    const currentSeason = '20192020';
    const { currentUser } = firebase.auth();

    if (!currentUser) return;
    ///referees/jobbagymartin/seasons/20192020/games/2416

    firebase
        .firestore()
        .collection('referees')
        .doc(currentUser.uid)
        .collection('seasons')
        .doc(currentSeason)
        .collection('games')
        .doc(gameId)
        .onSnapshot(doc => {
            if (doc.exists) {
                dispatch({
                    type: SAVE_GAME,
                    data: doc.data(),
                    season: currentSeason
                });
            } else {
                console.warn('GAME DATA: no data to be stored for gameId', gameId);
                dispatch({
                    type: SAVE_GAME_ERROR,
                    error: 'No firebase data'
                });
            }
        });
};

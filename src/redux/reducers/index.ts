import { combineReducers } from 'redux';
import GamesReducer from './GamesReducer';

const reducers = {
    games: GamesReducer
};

export default combineReducers(reducers);

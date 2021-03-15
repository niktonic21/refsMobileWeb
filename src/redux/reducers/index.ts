import { combineReducers } from 'redux';
import GamesReducer from './GamesReducer';
import FilterReducer from './FilterReducer';
import AuthReducer from './AuthReducer';
import UserGamesReducer from './UserGamesReducer';

const reducers = {
    games: GamesReducer,
    filter: FilterReducer,
    auth: AuthReducer,
    userGames: UserGamesReducer
};

export default combineReducers(reducers);

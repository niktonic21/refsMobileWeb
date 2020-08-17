import { combineReducers } from 'redux';
import GamesReducer from './GamesReducer';
import FilterReducer from './FilterReducer';
import AuthReducer from './AuthReducer';

const reducers = {
    games: GamesReducer,
    filter: FilterReducer,
    auth: AuthReducer
};

export default combineReducers(reducers);

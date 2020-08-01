import { combineReducers } from 'redux';
import GamesReducer from './GamesReducer';
import FilterReducer from './FilterReducer';

const reducers = {
    games: GamesReducer,
    filter: FilterReducer
};

export default combineReducers(reducers);

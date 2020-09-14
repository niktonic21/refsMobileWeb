import { combineReducers } from 'redux';
import GamesReducer from './GamesReducer';
import FilterReducer from './FilterReducer';
import AuthReducer from './AuthReducer';
import BillingReducer from './BillingReducer';

const reducers = {
    games: GamesReducer,
    filter: FilterReducer,
    auth: AuthReducer,
    billing: BillingReducer
};

export default combineReducers(reducers);

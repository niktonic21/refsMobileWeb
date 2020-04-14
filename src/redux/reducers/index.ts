import { combineReducers } from "redux";
import ExampleReducer from "./ExampleReducer";

const reducers = {
    initial: ExampleReducer,
};

export default combineReducers(reducers);

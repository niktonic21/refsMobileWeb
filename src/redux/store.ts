import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from '../redux/reducers';

let middleware = applyMiddleware(thunk);

if (__DEV__) {
    middleware = composeWithDevTools(middleware);
}

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    version: 1
    // timeout: 10000,
    // throttle: isAndroid ? 1000 : 0,
    // whitelist: [],
    // blacklist: [],
};
const STORE_INIT_STATE = {};

const reduxStore = createStore(
    persistReducer(persistConfig, rootReducer),
    STORE_INIT_STATE,
    middleware
);
const persistor = persistStore(reduxStore);

export default {
    reduxStore,
    persistor
};

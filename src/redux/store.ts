import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import thunk from 'redux-thunk';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { composeWithDevTools } from 'redux-devtools-extension';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from '../redux/reducers';
import { initFirebase } from './firebase';
initFirebase();

const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: string) {
            return Promise.resolve(value);
        },
        removeItem(_key: string) {
            return Promise.resolve();
        }
    };
};

const isWeb = Platform.OS === 'web';
const webStorage = isWeb ? createWebStorage('local') : createNoopStorage();

let hasLoggedStorageError = false;
const logStorageErrorOnce = (error: unknown) => {
    if (hasLoggedStorageError) return;
    hasLoggedStorageError = true;
    console.warn('Persist storage unavailable, using in-memory fallback.', error);
};

const nativeStorage = {
    getItem: async (key: string) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            logStorageErrorOnce(error);
            return null;
        }
    },
    setItem: async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
            return value;
        } catch (error) {
            logStorageErrorOnce(error);
            return value;
        }
    },
    removeItem: async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            logStorageErrorOnce(error);
        }
    }
};

const storage = isWeb ? webStorage : nativeStorage;

let middleware = applyMiddleware(thunk);

if (__DEV__) {
    middleware = composeWithDevTools(middleware);
}

const persistConfig: PersistConfig<any> = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    version: 1
    // timeout: 10000,
    // throttle: isAndroid ? 1000 : 0,
    // whitelist: [],
    // blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer as any);
const reduxStore = createStore(persistedReducer, middleware);
const persistor = persistStore(reduxStore);

export default {
    reduxStore,
    persistor
};

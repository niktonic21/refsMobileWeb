import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'intl';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { initFirebase } from './src/redux/firebase';
import store from './src/redux/store';
import useCachedResources from './src/utils/hooks/useCachedResources';
import useColorScheme from './src/utils/hooks/useColorScheme';
import Navigation from './src/navigation';

console.ignoredYellowBox = ['Setting a timer'];

if (Platform.OS === 'android') {
    // See https://github.com/expo/expo/issues/6536 for this issue.
    if (typeof (Intl as any).__disableRegExpRestore === 'function') {
        (Intl as any).__disableRegExpRestore();
    }
}
import 'intl/locale-data/jsonp/sk';

export default function App() {
    initFirebase();
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <Provider store={store.reduxStore}>
                <PersistGate loading={null} persistor={store.persistor}>
                    <SafeAreaProvider>
                        <Navigation colorScheme={colorScheme} />
                        <StatusBar style="dark" />
                    </SafeAreaProvider>
                </PersistGate>
            </Provider>
        );
    }
}

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { initFirebase } from './src/redux/firebase';
import store from './src/redux/store';
import useCachedResources from './src/utils/hooks/useCachedResources';
import useColorScheme from './src/utils/hooks/useColorScheme';
import Navigation from './src/navigation';

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

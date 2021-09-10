import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { TouchableOpacity, ColorSchemeName } from 'react-native';
import { useSelector } from 'react-redux';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, LoggedOutStackParamList } from '../../types';
import TabNavigator from './TabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import MatchesScreen from '../screens/MatchesScreen';
import { isWeb } from '@layout';
import UserScreen from '../screens/UserScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import GameScreen from '../screens/GameScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <RootNavigator />
        </NavigationContainer>
    );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
    const isLoggedId = useSelector<{ auth: { loggedIn: boolean } }>(state => state.auth.loggedIn);
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedId ? (
                <Stack.Screen name="LoggedOut" component={LoggedOutNavigator} />
            ) : (
                <Stack.Screen name="Root" component={TabNavigator} />
            )}
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
    );
}

const headerMode = isWeb ? 'none' : 'screen';

const LoggedOut = createStackNavigator<LoggedOutStackParamList>();

function LoggedOutNavigator() {
    return (
        <LoggedOut.Navigator headerMode={headerMode}>
            <LoggedOut.Screen
                name="MatchesScreen"
                component={MatchesScreen}
                options={({ navigation }) => ({
                    headerTitle: 'Delegačné listy',
                    headerRight: ({ tintColor }) => (
                        <TouchableOpacity
                            style={{
                                width: 40,
                                alignItems: 'center',
                                marginRight: 8
                            }}
                            onPress={() => navigation.navigate('UserScreen')}
                        >
                            <Ionicons name="md-person" color={tintColor} size={26} />
                        </TouchableOpacity>
                    )
                })}
            />
            <LoggedOut.Screen
                name="GameScreen"
                component={GameScreen}
                options={{ headerTitle: 'Datial zápasu' }}
            />
            <LoggedOut.Screen
                name="UserScreen"
                component={UserScreen}
                options={{ headerTitle: '' }}
            />
            <LoggedOut.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
                options={{ headerTitle: '' }}
            />
        </LoggedOut.Navigator>
    );
}

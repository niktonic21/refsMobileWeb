import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../../constants/Colors';
import useColorScheme from '../utils/hooks/useColorScheme';
import MatchesScreen from '../screens/MatchesScreen';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import UserScreen from '../screens/UserScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import { BottomTabParamList, HomeParamList, MatchesParamList, UserParamList } from '../../types';
import { isWeb } from '../../constants/Layout';

const Tab = isWeb
    ? createMaterialTopTabNavigator<BottomTabParamList>()
    : createBottomTabNavigator<BottomTabParamList>();
const headerMode = isWeb ? 'none' : 'screen';

export default function TabNavigator() {
    const colorScheme = useColorScheme();
    return (
        <Tab.Navigator
            initialRouteName="Matches"
            tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
        >
            <Tab.Screen
                name="Matches"
                component={MatchesNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="ios-list" color={color} />
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />
                }}
            />
            <Tab.Screen
                name="Profile"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="ios-contacts" color={color} />
                }}
            />
        </Tab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const MatchesStack = createStackNavigator<MatchesParamList>();

function MatchesNavigator() {
    return (
        <MatchesStack.Navigator headerMode={headerMode}>
            <MatchesStack.Screen
                name="MatchesScreen"
                component={MatchesScreen}
                options={{ headerTitle: 'Delegacka' }}
            />
            <MatchesStack.Screen
                name="GameScreen"
                component={GameScreen}
                options={{ headerTitle: 'Datial zapasu' }}
            />
        </MatchesStack.Navigator>
    );
}

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
    return (
        <HomeStack.Navigator headerMode={headerMode}>
            <HomeStack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerTitle: 'Domov' }}
            />
        </HomeStack.Navigator>
    );
}

const UserStack = createStackNavigator<UserParamList>();

function UserNavigator() {
    return (
        <UserStack.Navigator headerMode={headerMode}>
            <UserStack.Screen
                name="UserScreen"
                component={UserScreen}
                options={{ headerTitle: 'Profil' }}
            />
            <UserStack.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
                options={{ headerTitle: '' }}
            />
        </UserStack.Navigator>
    );
}

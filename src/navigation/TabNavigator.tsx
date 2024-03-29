import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import get from 'lodash/get';
import { isWeb } from '@layout';
import store from '../redux/store';
import Colors from '../../constants/Colors';
import useColorScheme from '../utils/hooks/useColorScheme';
import MatchesScreen from '../screens/MatchesScreen';
import BillingScreen from '../screens/BillingScreen';
import PDFScreen from '../screens/PDFScreen';
import GameScreen from '../screens/GameScreen';
import UserScreen from '../screens/UserScreen';
import CitiesScreen from '../screens/CitiesScreen';
import GameRefListScreen from '../screens/GameRefListScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import StatsScreen from '../screens/StatsScreen';
import {
    BottomTabParamList,
    BillingParamList,
    MatchesParamList,
    UserParamList,
    StatsParamList
} from '../../types';
import { checkNewData } from '../redux/actions';

const Tab = isWeb
    ? createMaterialTopTabNavigator<BottomTabParamList>()
    : createBottomTabNavigator<BottomTabParamList>();
const headerMode = isWeb ? 'none' : 'screen';

export default function TabNavigator() {
    const colorScheme = useColorScheme();
    const dispatch = useDispatch();

    React.useEffect(() => {
        const lastUpdated = get(store.reduxStore.getState(), 'games.lastUpdated', 0);
        dispatch(checkNewData(lastUpdated));
    }, []);

    return (
        <Tab.Navigator
            swipeEnabled={!isWeb}
            initialRouteName="Matches"
            tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
        >
            <Tab.Screen
                name="Zápasy"
                component={MatchesNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="ios-list" color={color} />
                }}
            />
            <Tab.Screen
                name="Vyúčtovanie"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="ios-wallet" color={color} />
                }}
            />
            <Tab.Screen
                name="Štatistiky"
                component={StatsNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="ios-stats" color={color} />
                }}
            />
            <Tab.Screen
                name="Profil"
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
                options={{ headerTitle: 'Delegačné listy' }}
            />
            <MatchesStack.Screen
                name="GameScreen"
                component={GameScreen}
                options={{ headerTitle: 'Datial zápasu' }}
            />
        </MatchesStack.Navigator>
    );
}

const BillingStack = createStackNavigator<BillingParamList>();

function HomeNavigator() {
    return (
        <BillingStack.Navigator headerMode={headerMode}>
            <BillingStack.Screen
                name="BillingScreen"
                component={BillingScreen}
                options={{ headerTitle: 'Vyúčtovanie' }}
            />
            <BillingStack.Screen
                name="PDFScreen"
                component={PDFScreen}
                options={{ headerTitle: 'PDF' }}
            />
            <BillingStack.Screen
                name="GameScreen"
                component={GameScreen}
                options={{ headerTitle: 'Datial zápasu' }}
            />
            <BillingStack.Screen
                name="CitiesScreen"
                component={CitiesScreen}
                options={{ headerTitle: 'Mestá' }}
            />
            <BillingStack.Screen
                name="GameRefListScreen"
                component={GameRefListScreen}
                options={{ headerTitle: 'Rozhodcovia' }}
            />
        </BillingStack.Navigator>
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

const StatsStack = createStackNavigator<StatsParamList>();

function StatsNavigator() {
    return (
        <StatsStack.Navigator headerMode={headerMode}>
            <StatsStack.Screen
                name="StatsScreen"
                component={StatsScreen}
                options={{ headerTitle: 'Štatistiky' }}
            />
        </StatsStack.Navigator>
    );
}

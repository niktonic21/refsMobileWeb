import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import MatchesScreen from '../screens/MatchesScreen';
import RightButton from '../components/RightButton';

import { isWeb } from '../../constants/Layout';

// const { window, isBigDevice } = device;
const Tab = isWeb ? createMaterialTopTabNavigator() : createBottomTabNavigator();
const headerMode = isWeb ? 'none' : 'screen';
//const Screen = isWeb ? createMaterialTopTabNavigator() : createBottomTabNavigator();

const INITIAL_ROUTE_NAME = 'Matches';

const tabBarOptions = {
    showIcon: true
};

const HomeStack = createStackNavigator();
const MatchesStack = createStackNavigator();

function MatchesStackScreen({ navigation }: any) {
    return (
        <MatchesStack.Navigator headerMode={headerMode}>
            <MatchesStack.Screen
                name="Matches"
                options={{
                    headerRight: () => getRightButton({ navigation, label: 'Filter' })
                }}
                component={MatchesScreen}
            />
        </MatchesStack.Navigator>
    );
}

function HomeStackScreen() {
    return (
        <HomeStack.Navigator headerMode={headerMode}>
            <HomeStack.Screen name="Home" component={HomeScreen} />
            <HomeStack.Screen name="HomeLinks" component={LinksScreen} />
        </HomeStack.Navigator>
    );
}

export default function TabNavigator({ navigation, route }: { navigation: any; route: any }) {
    // Set the header title on the parent stack navigator depending on the
    // currently active tab. Learn more in the documentation:
    // https://reactnavigation.org/docs/en/screen-options-resolution.html
    // navigation.setOptions({
    //     headerTitle: getHeaderTitle(route),
    //     headerRight: (props: any) => getRightButton(navigation, route, props)
    //     //headerLeft: (props: any) => getLeftButton(navigation, route, props)
    // });

    return (
        <Tab.Navigator
            style={{ paddingHorizontal: 0 }}
            tabBarOptions={tabBarOptions}
            initialRouteName={INITIAL_ROUTE_NAME}
        >
            <Tab.Screen
                name="Matches"
                component={MatchesStackScreen}
                options={{
                    tabBarIcon: ({ focused }: { focused: () => {} }) => (
                        <TabBarIcon focused={focused} name="md-settings" />
                    )
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    title: 'Get Started',
                    tabBarIcon: ({ focused }: { focused: () => {} }) => (
                        <TabBarIcon focused={focused} name="md-code-working" />
                    )
                }}
            />
            <Tab.Screen
                name="Links"
                component={LinksScreen}
                options={{
                    title: 'Resources',
                    tabBarIcon: ({ focused }: { focused: () => {} }) => (
                        <TabBarIcon focused={focused} name="md-book" />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

const getRightButton = ({ navigation, label }: { navigation: any; label: string }) => {
    console.log('rightName', label);
    return <RightButton onPress={() => navigation.navigate(label)} label={label} />;
};

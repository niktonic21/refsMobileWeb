import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import { Platform } from 'react-native';
// import device from "../../constants/Layout";

// const { window, isBigDevice } = device;
const Tab = Platform.OS === 'web' ? createMaterialTopTabNavigator() : createBottomTabNavigator();
const Screen = Platform.OS === 'web' ? createMaterialTopTabNavigator() : createBottomTabNavigator();

const INITIAL_ROUTE_NAME = 'Home';

const tabBarOptions = {
    showIcon: true
};

const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator
            // screenOptions={{
            //     cardStyle: {
            //         width: isBigDevice ? 1000 : window.width,
            //         alignSelf: "center"
            //     }
            // }}
            headerMode={'none'}
        >
            <HomeStack.Screen name="Home" component={HomeScreen} />
            <HomeStack.Screen name="HomeLinks" component={LinksScreen} />
        </HomeStack.Navigator>
    );
}

export default function TabNavigator({ navigation, route }: { navigation: any; route: any }) {
    // Set the header title on the parent stack navigator depending on the
    // currently active tab. Learn more in the documentation:
    // https://reactnavigation.org/docs/en/screen-options-resolution.html
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });

    return (
        <Tab.Navigator
            style={{ paddingHorizontal: 0 }}
            tabBarOptions={tabBarOptions}
            initialRouteName={INITIAL_ROUTE_NAME}
        >
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
            <Tab.Screen
                name="Settings"
                component={LinksScreen}
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ focused }: { focused: () => {} }) => (
                        <TabBarIcon focused={focused} name="md-settings" />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

const getHeaderTitle = (route: any): string => {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case 'Home':
            return 'How to get started';
        case 'Links':
            return 'Links to learn more';
    }
    return '';
};

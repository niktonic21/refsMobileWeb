import * as Linking from 'expo-linking';

export default {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    Matches: {
                        screens: {
                            MatchesScreen: 'matches',
                            Game: 'game'
                        }
                    },
                    Home: {
                        screens: {
                            HomeScreen: 'home'
                        }
                    },
                    User: {
                        screens: {
                            UserScreen: 'user',
                            ForgotPasswordScreen: 'password'
                        }
                    }
                }
            },
            NotFound: '*'
        }
    }
};

import * as Linking from 'expo-linking';

export default {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    Zapasy: {
                        screens: {
                            MatchesScreen: 'matches',
                            Game: 'game'
                        }
                    },
                    Vyuctovanie: {
                        screens: {
                            HomeScreen: 'home',
                            Game: 'game'
                        }
                    },
                    Profil: {
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

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
                            GameScreen: 'game'
                        }
                    },
                    Vyuctovanie: {
                        screens: {
                            BillingScreen: 'billing',
                            GameScreen: 'game',
                            CitiesScreen: 'cities'
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

import * as Linking from 'expo-linking';

export default {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    Zapasy: {
                        path: 'matches',
                        screens: {
                            MatchesScreen: {
                                name: 'MatchesScreen',
                                path: '/'
                            },
                            GameScreen: {
                                name: 'GameScreen',
                                path: 'game/:gameId'
                            }
                        }
                    },
                    Vyuctovanie: {
                        path: 'billing',
                        screens: {
                            BillingScreen: {
                                name: 'BillingScreen',
                                path: '/'
                            },
                            PDFScreen: {
                                name: 'PDFScreen',
                                path: 'pdf/:gameId'
                            },
                            GameScreen: {
                                name: 'GameScreen',
                                path: 'game/:gameId/:isBilling?'
                            },
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

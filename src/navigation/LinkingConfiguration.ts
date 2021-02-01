import * as Linking from 'expo-linking';

export default {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    Zápasy: {
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
                    Vyúčtovanie: {
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

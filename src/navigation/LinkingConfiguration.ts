import * as Linking from 'expo-linking';

export default {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            LoggedOut: {
                path: 'loggedOut',
                screens: {
                    MatchesScreen: {
                        name: 'MatchesScreen',
                        path: '/'
                    },
                    GameScreen: {
                        name: 'GameScreen',
                        path: 'game/:gameId'
                    },
                    UserScreen: 'user',
                    ForgotPasswordScreen: 'password'
                }
            },
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
                    Štatistiky: {
                        screens: {
                            StatsScreen: 'stats'
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

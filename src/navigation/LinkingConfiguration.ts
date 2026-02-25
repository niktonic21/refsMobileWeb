import * as Linking from 'expo-linking';

export default {
    prefixes: [Linking.createURL('/')],
    config: {
        screens: {
            LoggedOut: {
                path: 'loggedOut',
                screens: {
                    MatchesScreen: {
                        path: '/'
                    },
                    GameScreen: {
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
                                path: '/'
                            },
                            GameScreen: {
                                path: 'game/:gameId'
                            }
                        }
                    },
                    Vyúčtovanie: {
                        path: 'billing',
                        screens: {
                            BillingScreen: {
                                path: '/'
                            },
                            PDFScreen: {
                                path: 'pdf/:gameId'
                            },
                            GameScreen: {
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

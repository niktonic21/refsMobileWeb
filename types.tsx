export type RootStackParamList = {
    Root: undefined;
    NotFound: undefined;
};

export type BottomTabParamList = {
    Matches: undefined;
    Home: undefined;
    Profile: undefined;
};

export type MatchesParamList = {
    MatchesScreen: undefined;
    GameScreen: {
        gameId: string;
    };
};

export type BillingParamList = {
    BillingScreen: undefined;
    GameScreen: {
        gameId: string;
    };
    CitiesScreen: undefined;
};

export type UserParamList = {
    UserScreen: undefined;
    ForgotPasswordScreen: undefined;
};

export type RootStackParamList = {
    Root: undefined;
    LoggedOut: undefined;
    NotFound: undefined;
};

export type LoggedOutStackParamList = {
    MatchesScreen: undefined;
    GameScreen: {
        gameId: string;
    };
    UserScreen: undefined;
    ForgotPasswordScreen: undefined;
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
    PDFScreen: {
        gameId: string;
    };
    CitiesScreen: {
        selectedCities: string[];
        onSelectedCities: () => {};
    };
    GameRefListScreen: {
        selectedRefsInCar: string[];
        onSelectedRefsInCar: () => {};
    };
};

export type UserParamList = {
    UserScreen: undefined;
    ForgotPasswordScreen: undefined;
};

export type StatsParamList = {
    StatsScreen: undefined;
};

export interface IListItem {
    external_id: number;
    game_date: string;
}
export interface ISec {
    id: string;
    sectionName: string;
    data: IGame;
}

export interface ISection {
    id: string;
    title: string;
    data: IGame;
}

export interface IRef {
    id: string;
    name: string;
}

export interface IGame {
    gameId: string;
    home: string;
    away: string;
    date: string;
    day: string;
    time: string;
    ligue: string;
    subligue: string;
    round: string;
    stadium: string;
    delegation: number;
    referees: IRef[];
}

export interface IItemButton {
    item: IGame;
}

export interface IFilter {
    rozhodca: string;
    mesiac: number;
    liga: number;
}

export enum EGameDetail {
    PLAYED = 'played',
    PLAYED_BEFORE = 'playedBefore',
    H1 = 'h1',
    H2 = 'h2',
    C1 = 'c1',
    C2 = 'c2',
    I = 'i',
    V = 'v',
    D = 'd',
    MEAL_ENABLED = 'mealEnabled',
    FROM_CITY = 'fromCity',
    TO_CITY = 'toCity',
    FROM_DAY = 'fromDay',
    TO_DAY = 'toDay',
    FROM_TIME = 'fromTime',
    TO_TIME = 'toTime',
    IS_DRIVER = 'isDriver',
    COUNT_CITY = 'countCity',
    CAR = 'car',
    REFS_IN_CAR = 'refsInCar',
    ROAD = 'road',
    DISTANCE = 'km',
    IS_REPEATED_GAME = 'isRepeatedGame',
    IS_SECOND_GAME = 'isSecondGame',
    SECOND_GAME = 'secondGame',
    NOTES = 'notes',
    RATE = 'rateMoney',
    TRAVEL = 'travelMoney',
    RATE_CITY = 'rateCityMoney',
    MEAL = 'mealMoney',
    NIGHT = 'nightMoney',
    POST = 'postMoney',
    OTHER = 'otherMoney',
    TOGETHER = 'together'
}

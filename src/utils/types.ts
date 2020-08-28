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
    referees: Array<IRef>;
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
    IS_DRIVER = 'isDriver',
    COUNT_CITY = 'countCity',
    CAR = 'car',
    ROAD = 'road',
    REFS_IN_CAR = 'refsInCar',
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
    TOGETHER = 'together',
    MEAL_ENABLED = 'mealEnabled',
    FROM_CITY = 'fromCity',
    TO_CITY = 'toCity',
    FROM_DAY = 'fromdDay',
    TO_DAY = 'toDay',
    FROM_TIME = 'fromTime',
    TO_TIME = 'toTime'
}

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

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
    id: number;
    name: string;
    date_add: string;
    date_uuid: string;
}

export interface IGame {
    home: string;
    away: string;
    external_id: number;
    game_date: string;
    game_uuid: string;
    referees: Array<IRef>;
}

export interface IItemButton {
    item: IGame;
}

export interface IFilter {
    rozhodca: number;
    mesiac: number;
    liga: number;
}

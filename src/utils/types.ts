export interface IListItem {
    external_id: number;
}
export interface ISec {
    id: string;
    sectionName: string;
    data: object[];
}

export interface ISection {
    id: string;
    title: string;
    data: object[];
}

export interface IRef {
    id: number;
    name: string;
}

export interface IItemButton {
    item: {
        home: string;
        away: string;
        external_id: string;
        game_date: string;
        referees: Array<IRef>;
    };
}

import { SectionListData } from 'react-native';
import { ISection, IListItem, ISec, IItemButton } from './types';

export const numberToLigue = (num: number): string => {
    if (num > 0 && num < 500) return 'Extraliga seniorov';
    if (num > 500 && num < 1000) return '1. Liga seniorov';
    if (num > 1000 && num < 2000) return 'Extraliga juniorov';
    if (num > 2000 && num < 3000) return 'Extraliga dorastu';
    if (num > 3000 && num < 4000) return '1. Liga juniorov';
    if (num > 4000 && num < 9000) return '1. Liga dorastu';
    if (num > 9000 && num < 10000) return 'Kadeti';
    if (num > 10000 && num < 11000) return '2. Liga seniorov';
    if (num > 15000 && num < 16000) return 'Extraliga žien';
    if (num > 30000 && num < 31000) return 'Prípravné SVK';
    if (num > 40000 && num < 41000) return 'Prípravné IIHF';
    if (num > 50000 && num < 51000) return 'Turnaje repre';
    return 'Ostatné';
};

export const createGameSections = (games: object[]): Array<SectionListData<IItemButton>> => {
    const categoryMap: any = {};
    const sections: any = [];
    games.forEach((listItem: IListItem): void => {
        const category: string = numberToLigue(listItem.external_id);
        if (!categoryMap[category]) {
            sections.push({ sectionName: category, id: listItem.external_id });
            // Create an entry in the map for the category if it hasn't yet been created
            categoryMap[category] = [];
        }
        categoryMap[category].push(listItem);
    });
    const result = sections.map((sec: ISec) => {
        const section: ISection = { id: '', title: '', data: [] };
        section.id = sec.id;
        section.title = sec.sectionName;
        section.data = categoryMap[sec.sectionName];
        return section;
    });
    return result;
};

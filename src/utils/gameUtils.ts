import { SectionListData } from 'react-native';
import { ISection, IListItem, ISec, IItemButton, IFilter } from './types';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';
import filter from 'lodash/filter';
import store from '../redux/store';

const numberToLigue = (num: number): string => {
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

const numberToLigueId = (num: number): number => {
    if (num > 0 && num < 500) return 1;
    if (num > 500 && num < 1000) return 2;
    if (num > 1000 && num < 2000) return 3;
    if (num > 2000 && num < 3000) return 4;
    if (num > 3000 && num < 4000) return 5;
    if (num > 4000 && num < 9000) return 6;
    if (num > 9000 && num < 10000) return 7;
    if (num > 10000 && num < 11000) return 8;
    if (num > 15000 && num < 16000) return 9;
    if (num > 30000 && num < 31000) return 10;
    if (num > 40000 && num < 41000) return 11;
    if (num > 50000 && num < 51000) return 12;
    return 13;
};

export const createGameSections = (games: object[]): Array<SectionListData<IItemButton>> => {
    const categoryMap: any = {};
    const sections: any = [];
    games.forEach((listItem: IListItem): void => {
        const category: string = numberToLigue(listItem.external_id);
        if (!categoryMap[category]) {
            sections.push({ sectionName: category, id: numberToLigueId(listItem.external_id) });
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

const filterGamesByRozhodca = (games: any, rozhodcaId: number) => {
    const filteredGames = games
        .map((section: ISection) => {
            const filterRefs = filter(
                section.data,
                ({ referees }): boolean => !referees.every(({ id }) => id != rozhodcaId)
            );
            if (filterRefs.length) {
                return { ...section, data: filterRefs };
            }
        })
        .filter((i: any) => i !== undefined);
    return filteredGames;
};

const filterGamesByLiga = (games: any, ligaId: number) => {
    const filteredGames = filter(games, ({ id }): boolean => id === ligaId);
    return filteredGames;
};

export const filterGameSections = (games: any, filter: IFilter) => {
    let result = games;
    console.log('filterGameSections', filter);

    if (filter.liga !== 0) {
        result = filterGamesByLiga(result, filter.liga);
    }

    // if (filter.mesiac !== 0) {
    //     result = filterGamesByMesiac(result, filter.mesiac);
    // }
    //console.log('result', result);

    if (filter.rozhodca !== 0) {
        result = filterGamesByRozhodca(result, filter.rozhodca);
    }
    return result;
};

export const getRefList = () => {
    const refs = get(store.reduxStore.getState(), 'games.refs', []);
    const sortedRefs = sortBy(refs, ['name']);
    const refList = sortedRefs.map(({ name, id }) => ({ label: name, key: 'Rozhodca', value: id }));
    const result = [{ label: 'Vsetci', key: 'Rozhodca', value: 0 }].concat(refList);
    return result;
};

export const getLigueList = (gameSections: ISection) => {
    const ligueList = gameSections.map(({ title, id }: { title: string; id: number }) => ({
        label: title,
        key: 'Liga',
        value: id
    }));
    const result = [{ label: 'Vsetky', key: 'liga', value: 0 }].concat(ligueList);
    return result;
};

export const getMonthList = () => {
    return [];
};

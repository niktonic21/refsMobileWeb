import { SectionListData } from 'react-native';
import { ISection, IListItem, ISec, IItemButton, IFilter, IRef, IGame } from './types';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';
import filter from 'lodash/filter';
import find from 'lodash/find';
import store from '../redux/store';
import { filterMonths } from '../redux/actions';

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

export const ligueToLig = str => {
    if (str === 'Liga') return 'Liga';
    if (str === 'Extraliga seniorov') return 'EXS';
    if (str === '1. Liga seniorov') return '1.LS';
    if (str === 'Extraliga juniorov') return 'EXJ';
    if (str === 'Extraliga dorastu') return 'EXD';
    if (str === '1. Liga juniorov') return '1.LJ';
    if (str === '1. Liga dorastu') return '1.LD';
    if (str === 'Kadeti') return 'Kadeti';
    if (str === '2. Liga seniorov') return '2.LS';
    if (str === 'Extraliga žien') return 'EXZ';
    if (str === 'Prípravné SVK') return 'Príp. SVK';
    if (str === 'Prípravné IIHF') return 'Príp. IIHF';
    if (str === 'Turnaje repre') return 'Turnaje';
    return 'Ostatné';
};
export const ligueIdToLigue = (num: number): string => {
    if (num === 1) return 'EXS';
    if (num === 2) return '1.LS';
    if (num === 3) return 'EXJ';
    if (num === 4) return 'EXD';
    if (num === 5) return '1.LJ';
    if (num === 6) return '1.LD';
    if (num === 7) return 'Kadeti';
    if (num === 8) return '2.LS';
    if (num === 9) return 'EXZ';
    if (num === 10) return 'Príp. SVK';
    if (num === 11) return 'Príp. IIHF';
    if (num === 12) return 'Turnaje';
    return 'Ostatné';
};

const defaultListMonth = [
    'Neznáme',
    'Júl',
    'August',
    'September',
    'Október',
    'November',
    'December',
    'Január',
    'Február',
    'Marec',
    'Apríl',
    'Máj',
    'Jún',
    'Mesiac'
];

export const numberToMonth2 = (num: number): string => {
    switch (num) {
        case 1:
            return 'Január';
        case 2:
            return 'Február';
        case 3:
            return 'Marec';
        case 4:
            return 'Apríl';
        case 5:
            return 'Máj';
        case 6:
            return 'Jún';
        case 7:
            return 'Júl';
        case 8:
            return 'August';
        case 9:
            return 'September';
        case 10:
            return 'Október';
        case 11:
            return 'November';
        case 12:
            return 'December';
        default:
            return 'Neznáme';
    }
};

export const monthToNumber = (str: string): number => {
    switch (str) {
        case 'Január':
            return 1;
        case 'Február':
            return 2;
        case 'Marec':
            return 3;
        case 'Apríl':
            return 4;
        case 'Máj':
            return 5;
        case 'Jún':
            return 6;
        case 'Júl':
            return 7;
        case 'August':
            return 8;
        case 'September':
            return 9;
        case 'Október':
            return 10;
        case 'November':
            return 11;
        case 'December':
            return 12;
        default:
            return 0;
    }
};

export const numberToMonth = (num: number): string => {
    switch (num) {
        case 1:
            return 'jan.';
        case 2:
            return 'feb.';
        case 3:
            return 'mar.';
        case 4:
            return 'apr.';
        case 5:
            return 'máj';
        case 6:
            return 'jún';
        case 7:
            return 'júl';
        case 8:
            return 'aug.';
        case 9:
            return 'sep.';
        case 10:
            return 'okt.';
        case 11:
            return 'nov.';
        case 12:
            return 'dec.';
        default:
            return '';
    }
};

export const parseDate = (date: string) => {
    const dataArray = date.split('.');
    return { day: dataArray[0], month: dataArray[1], year: dataArray[2] };
};

export const createGameSections = (games: object[]): Array<SectionListData<IItemButton>> => {
    const categoryMap: any = {};
    const sections: any = [];
    const months: any = [];
    games.forEach((game: IGame): void => {
        const month = numberToMonth2(parseInt(parseDate(game.date).month, 10));

        if (!months.includes(month)) {
            months.push(month);
        }
        const gameID = parseInt(game.gameId, 10);
        const category: string = numberToLigue(gameID);
        if (!categoryMap[category]) {
            sections.push({ sectionName: category, id: numberToLigueId(gameID) });
            // Create an entry in the map for the category if it hasn't yet been created
            categoryMap[category] = [];
        }
        categoryMap[category].push(game);
    });

    const result = sections.map((sec: ISec) => {
        const section: ISection = { id: '', title: '', data: [] };
        section.id = sec.id;
        section.title = sec.sectionName;
        section.data = categoryMap[sec.sectionName];
        return section;
    });

    if (months.length) {
        const monthsResult = months.map((month: string) => ({
            month: month,
            value: monthToNumber(month)
        }));
        store.reduxStore.dispatch(filterMonths(monthsResult));
    }

    return result;
};

const filterGamesByRozhodca = (gamesSections: any, rozhodcaId: string) => {
    const filteredGames = gamesSections
        .map((section: ISection) => {
            const filterRefs = filter(
                section.data,
                ({ referees }): boolean => !referees.every(({ id }) => id !== rozhodcaId)
            );
            if (filterRefs.length) {
                return { ...section, data: filterRefs };
            }
        })
        .filter((i: any) => i !== undefined);
    return filteredGames;
};

const filterGamesByMesiac = (games: any, mesiacId: number) => {
    const filteredGames = games
        .map((section: ISection) => {
            const filterMonths = filter(section.data, ({ date }): boolean => {
                return parseInt(parseDate(date).month, 10) === mesiacId;
            });
            if (filterMonths.length) {
                return { ...section, data: filterMonths };
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

    if (filter.liga !== 0) {
        result = filterGamesByLiga(result, filter.liga);
    }

    if (filter.mesiac !== 0) {
        result = filterGamesByMesiac(result, filter.mesiac);
    }

    if (filter.rozhodca !== '') {
        result = filterGamesByRozhodca(result, filter.rozhodca);
    }

    return result;
};

export const getRefList = () => {
    const refs = get(store.reduxStore.getState(), 'games.refs', []);
    const sortedRefs = sortBy(refs, ['name']);
    const refList = sortedRefs.map(({ name, id }) => ({ label: name, key: 'Rozhodca', value: id }));
    const result = [{ label: 'Vsetci', key: 'Rozhodca', value: '' }].concat(refList);
    return result;
};

export const getLigueList = (gameSections: ISection) => {
    const ligueList = gameSections.map(({ title, id }: { title: string; id: number }) => ({
        label: title,
        key: 'Liga',
        value: id
    }));
    const result = [{ label: 'Vsetky', key: 'Liga', value: 0 }].concat(ligueList);
    return result;
};

export const getMonthList = () => {
    const months = get(store.reduxStore.getState(), 'games.months', []);
    const monthList = months.map(({ month, value }: { month: string; value: number }) => ({
        label: month,
        key: 'Mesiac',
        value: value
    }));
    const result = [{ label: 'Vsetky', key: 'Mesiac', value: 0 }].concat(monthList);

    return result;
};

export const getFilterButtonLabel = (filterKey: string): string => {
    const { liga, mesiac, rozhodca } = get(store.reduxStore.getState(), 'filter', {});
    if (filterKey === 'Mesiac') {
        return mesiac === 0 ? filterKey : numberToMonth2(mesiac);
    }
    if (filterKey === 'Liga') {
        return liga === 0 ? filterKey : ligueIdToLigue(liga);
    }
    const refs = get(store.reduxStore.getState(), 'games.refs', []);
    const ref = refs.find((ref: IRef) => ref.id === rozhodca);
    return rozhodca === 0 || !ref ? filterKey : ref.name;
};

export const getGameData = (gameId: number): object => {
    const games = get(store.reduxStore.getState(), 'games.games', []);
    const game = find(games, (g: { external_id: number }) => g.external_id === gameId);
    return game;
};

const filterGamesListByRozhodca = (games: any, rozhodcaId: number) => {
    const filteredGames = filter(
        games,
        ({ referees }): boolean => !referees.every(({ id }) => id != rozhodcaId)
    ).filter((i: any) => i !== undefined);
    return filteredGames;
};

export const createBillingSections = (
    games: object[],
    userId: number
): Array<SectionListData<IItemButton>> => {
    const categoryMap: any = {};
    const sections: any = [];
    const filteredGames = filterGamesListByRozhodca(games, userId);

    filteredGames.forEach((listItem: IListItem): void => {
        const category: string = numberToMonth2(new Date(listItem.game_date).getMonth() + 1);
        if (!categoryMap[category]) {
            sections.unshift({
                sectionName: category,
                id: new Date(listItem.game_date).getMonth() + 1
            });
            // Create an entry in the map for the category if it hasn't yet been created
            categoryMap[category] = [];
        }
        categoryMap[category].unshift(listItem);
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

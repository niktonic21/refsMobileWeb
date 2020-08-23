//const BACKEND_URL = 'https://delegacky.herokuapp.com';
const BACKEND_URL = 'https://jobb.sk/seasons/'; // /seasons/20192020.json
//https://jobb.sk/seasons/20202021.json
//https://jobb.sk/seasons/20202021_updates.json
//https://jobb.sk/seasons/20192020_referees.json
// import json from './reducers/dataLocalGames21.json';
// import json2 from './reducers/dataLocalGames11.json';
// import jsonAll from './reducers/dataLocalGamesAll.json';
// import refsAll from './reducers/dataLocalReferees.json';

export const fetchSeasonGames = async (season: string = '20192020') => {
    const res = await fetch(`${BACKEND_URL}${season}.json`);
    return res.json();
};

export const fetchRefs = async (season: string = '20192020') => {
    const res = await fetch(`${BACKEND_URL}${season}_referees.json`);
    return res.json();
};

export const fetchUpdateTime = async (season: string = '20192020') => {
    const res = await fetch(`${BACKEND_URL}${season}_updates.json`);
    console.log('aaaaaaaa', res);

    return res.json();
};

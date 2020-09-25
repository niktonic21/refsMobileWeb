//const BACKEND_URL = 'https://delegacky.herokuapp.com';
const BACKEND_URL = 'https://jobb.sk/seasons/';

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
    return res.json();
};

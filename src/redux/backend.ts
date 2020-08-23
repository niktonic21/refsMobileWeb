//const BACKEND_URL = 'https://delegacky.herokuapp.com';
const BACKEND_URL = 'https://jobb.sk'; // /seasons/20192020.json
//https://jobb.sk/seasons/20202021.json
//https://jobb.sk/seasons/20202021_updates.json
//https://jobb.sk/seasons/20192020_referees.json
import json from './reducers/dataLocalGames21.json';
import json2 from './reducers/dataLocalGames11.json';
import jsonAll from './reducers/dataLocalGamesAll.json';
import refsAll from './reducers/dataLocalReferees.json';

export const fetchSeasonGames = async (season: string = '20192020') => {
    const res = await fetch(`${BACKEND_URL}/seasons/${season}.json`);
    return res.json();
};

export const fetchRefs = async (season: string = '20192020') => {
    const res = await fetch(`${BACKEND_URL}/seasons/${season}_referees.json`);
    return res.json();
};

export const request = async (args: any) => {
    const { method = 'GET', route, headers, payload } = args;
    const res = await fetch(`${BACKEND_URL}${route}`);

    // console.log('filter_args', args);
    // const fetchPromise = fetch('https://delegacky.herokuapp.com/lists', { mode: 'no-cors' });
    // fetchPromise.then(response => {
    //     console.log('response', response);
    // });
    // let res;
    // try {
    //     res = await fetch(`${BACKEND_URL}${route}`, {
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*'
    //         },
    //         // body: JSON.stringify(payload),
    //         method: 'GET',
    //         mode: 'no-cors'
    //     });
    // } catch (e) {
    //     //const text = await res.text();
    //     console.log('filter_error', e);
    //     throw Error(e);
    // }
    // // const res = .catch(error => {
    // //     const { message } = error;
    // //     console.log('filter_error', error);
    // //     throw Error(message);
    // // });
    // console.log('filter_data', await res.text(), await res.json());
    // let json;
    // // try {
    // //     json = await res.json();
    // // } catch (e) {
    // //     const text = await res.text();
    // //     console.log('filter_e', e);
    // //     throw Error(text);
    // // }
    console.log('filter_', jsonAll);
    return jsonAll;
};

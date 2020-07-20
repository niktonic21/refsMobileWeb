const BACKEND_URL = 'https://delegacky.herokuapp.com';
import json from './reducers/dataLocalGames21.json';

const request = async (args: any) => {
    const { method = 'GET', route, headers, payload } = args;
    // const res = await fetch(`${BACKEND_URL}${route}`, {
    //     method,
    //     headers: {
    //         Accept: 'application/json',
    //         ...(payload ? { 'Content-Type': 'application/json' } : {}),
    //         ...(headers || {})
    //     },
    //     body: payload && JSON.stringify(payload)
    // })

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
    console.log('filter_', json);
    return json;
};

export default {
    request
};

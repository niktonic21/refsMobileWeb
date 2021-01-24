import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    ERROR_REMOVED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGGED_IN_CHANGE,
    LOG_OUT_USER,
    PROFILE_UPDATE
} from '../actions/authActions';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
    loggedIn: null,
    profile: {
        season: '20202021',
        name: '',
        mesto: '',
        auto: '',
        email: '',
        refID: ''
    }
};

const WRONG_EMAIL = 'Zadaný nesprávny formát emailu.';
const WRONG_PASSWORD = 'Zadaný nesprávny email alebo heslo.';
const NO_INTERNET = 'Zadané nesprávne heslo.';
const NO_LOGIN = 'Prihlásenie neúspešné.';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case ERROR_REMOVED:
            return { ...state, error: '' };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            return { ...INITIAL_STATE, loggedIn: true, user: action.payload };
        case LOG_OUT_USER:
            return { ...INITIAL_STATE };
        case LOGIN_USER_FAIL: {
            const { code } = action.payload;
            let error;
            switch (code) {
                case 'auth/invalid-email':
                    error = WRONG_EMAIL;
                    break;
                case 'auth/wrong-password':
                    error = WRONG_PASSWORD;
                    break;
                case 'auth/network-request-failed':
                    error = NO_INTERNET;
                    break;
                default:
                    error = NO_LOGIN;
            }
            return { ...state, error, password: '', loading: false };
        }
        case LOGGED_IN_CHANGE: {
            const { usr, lgdIn } = action.payload;
            return { ...state, user: usr, loggedIn: lgdIn };
        }
        case PROFILE_UPDATE: {
            return { ...state, profile: { ...state.profile, ...action.payload } };
        }
        default:
            return state;
    }
};

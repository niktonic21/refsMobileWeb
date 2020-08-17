import * as firebase from 'firebase';
import store from '../store';
import get from 'lodash/get';

export const EMAIL_CHANGED = 'auth_email_changed';
export const PASSWORD_CHANGED = 'auth_password_changed';
export const ERROR_REMOVED = 'auth_error_removed';
export const LOGIN_USER_SUCCESS = 'auth_login_user_sucess';
export const LOGIN_USER_FAIL = 'auth_login_user_fail';
export const LOGIN_USER = 'auth_login_user';
export const LOG_OUT_USER = 'auth_log_out_user';
export const LOGGED_IN_CHANGE = 'auth_logged_in_change';
export const PROFILE_UPDATE = 'auth_profile_update';

export const emailChanged = (text: string) => ({
    type: EMAIL_CHANGED,
    payload: text
});

export const passwordChanged = (text: string) => ({
    type: PASSWORD_CHANGED,
    payload: text
});

export const removeError = () => ({
    type: ERROR_REMOVED
});

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    //Actions.pop();
};

const loginUserFail = (dispatch, error) => {
    dispatch({ type: LOGIN_USER_FAIL, payload: error });
};

export const loginUser = ({ email, password }) => dispatch => {
    dispatch({ type: LOGIN_USER });
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch(error => {
            console.log(error);
            loginUserFail(dispatch, error);
        });
};

export const loggedInChange = (usr, lgdIn) => ({
    type: LOGGED_IN_CHANGE,
    payload: { usr, lgdIn }
});

export const logOut = () => {
    firebase.auth().signOut();
    return {
        type: LOG_OUT_USER
    };
};

export const saveProfileData = (profileData: { mesto: string; auto: string; email: string }) => {
    const { currentUser } = firebase.auth();
    if (!profileData || !currentUser) return;
    return {
        type: PROFILE_UPDATE,
        payload: profileData
    };
    // firebase
    //     .database()
    //     .ref(`/referees/${currentUser.uid}`)
    //     .update({ rozhodca, liga, mesto, auto, kategoria, email })
    //     .then(() => console.log('data_saved'));
};

// export const authChanges = firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         // User is signed in.
//         const displayName = user.displayName;
//         const email = user.email;
//         const emailVerified = user.emailVerified;
//         const photoURL = user.photoURL;
//         const isAnonymous = user.isAnonymous;
//         const uid = user.uid;
//         const providerData = user.providerData;

//         console.log('authChanges', user);

//         // ...
//     } else {
//         console.log('authChanges_LOGOUT', user);

//         // User is signed out.
//         // ...
//     }
// });

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

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

const loginUserSuccess = (dispatch: any, user: any) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    //downloadProfileData(dispatch, user.user.uid);
};

export const downloadProfileData = (dispatch: any, userId: string) => {
    if (!userId) return;
    firebase
        .firestore()
        .collection('referees')
        .doc(userId)
        .onSnapshot(doc => {
            if (doc.exists) {
                dispatch({
                    type: PROFILE_UPDATE,
                    payload: doc.data()
                });
            } else {
                console.warn('Profile: no data to be stored');
            }
        });
    // .catch(error => {
    //     console.warn('Profile error written!', error);
    // });
};

const loginUserFail = (dispatch: any, error: { code: string; message?: string }) => {
    dispatch({ type: LOGIN_USER_FAIL, payload: error });
};

const shouldRetry = (error: { code?: string }, retryCount: number) => {
    return error?.code === 'auth/network-request-failed' && retryCount < 1;
};

export const loginUser =
    ({ email, password }: { email: string; password: string }) =>
    (dispatch: any) => {
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPassword = password.trim();

        const attemptLogin = (retryCount = 0) => {
            firebase
                .auth()
                .signInWithEmailAndPassword(normalizedEmail, normalizedPassword)
                .then(user => loginUserSuccess(dispatch, user))
                .catch(error => {
                    console.warn('Login error: ', error);

                    if (shouldRetry(error, retryCount)) {
                        setTimeout(() => attemptLogin(retryCount + 1), 1200);
                        return;
                    }

                    loginUserFail(dispatch, {
                        code: error?.code || 'auth/internal-error',
                        message: error?.message || 'Prihlásenie neúspešné.'
                    });
                });
        };

        dispatch({ type: LOGIN_USER });
        attemptLogin();
    };

export const logOut = () => {
    firebase.auth().signOut();
    return {
        type: LOG_OUT_USER
    };
};

export const updateProfileData = (profileData: {
    mesto: string;
    auto: string;
    email: string;
    season: string;
    name: string;
}) => {
    return {
        type: PROFILE_UPDATE,
        payload: profileData
    };
};

export const saveProfileData = (profileData: {
    mesto: string;
    auto: string;
    email: string;
    season: string;
    name: string;
}) => {
    const { currentUser } = firebase.auth();
    if (!profileData || !currentUser) return;

    firebase
        .firestore()
        .collection('referees')
        .doc(currentUser.uid)
        .set(profileData, { merge: true })
        .catch(error => {
            console.warn('Profile error written!', error);
        });

    return {
        type: PROFILE_UPDATE,
        payload: profileData
    };
};

// export const loggedInChange = (usr, lgdIn) => ({
//     type: LOGGED_IN_CHANGE,
//     payload: { usr, lgdIn }
// });

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

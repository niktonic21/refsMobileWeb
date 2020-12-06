import { IRef } from './types';
import get from 'lodash/get';
import store from '../redux/store';

export const emailValidator = (email: string) => {
    const re = /\S+@\S+\.\S+/;

    if (!email || email.length <= 0) return 'Email cannot be empty.';
    if (!re.test(email)) return 'Ooops! We need a valid email address.';

    return '';
};

export const passwordValidator = (password: string) => {
    if (!password || password.length <= 0) return 'Password cannot be empty.';

    return '';
};

export const nameValidator = (name: string) => {
    if (!name || name.length <= 0) return 'Name cannot be empty.';

    return '';
};

export const getCurrentRef = (refs: IRef[]) => {
    const profile = get(store.reduxStore.getState(), 'auth.profile', {});
    const ref = refs.find((ref: IRef) => ref.id === profile.refID);
    return { ...ref, ...profile };
};

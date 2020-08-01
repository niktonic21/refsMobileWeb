export const FILTER_CHANGED = 'filter_changed';

export const filterChanged = (key: string, value: string) => ({
    type: FILTER_CHANGED,
    payload: { key: key.toLocaleLowerCase(), value }
});

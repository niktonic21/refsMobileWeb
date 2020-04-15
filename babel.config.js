/* eslint-disable func-names */
module.exports = function (api: any) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo']
    };
};

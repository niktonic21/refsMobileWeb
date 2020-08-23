/* eslint-disable func-names */
module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        '@Modal': './src/components/Modal',
                        '@gameUtils': './src/utils/gameUtils.ts',
                        '@profileUtils': './src/utils/profileUtils.ts',
                        '@utils': './src/utils',
                        '@colors': './constants/Colors.ts',
                        '@layout': './constants/Layout.ts',
                        '@strings': './constants/Strings.ts',
                        '@actions': './src/redux/actions'
                    }
                }
            ]
        ]
    };
};

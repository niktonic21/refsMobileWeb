import { Dimensions, Platform } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const isWeb = Platform.OS === 'web';
export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const layout = {
    window: {
        width,
        height
    },
    isSmallDevice: width < 375,
    isBigDevice: width > 1300
};

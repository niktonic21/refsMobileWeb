import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1.5
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 5
    }
});

interface ICard {
    children: any;
    style?: object;
}

export const Card: React.FC<ICard> = ({ children, style }) => {
    return <View style={[styles.container, style]}>{children}</View>;
};

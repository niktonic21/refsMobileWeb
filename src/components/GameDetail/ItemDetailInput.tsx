import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 8
    },
    placeholderText: {
        color: '#888',
        fontSize: 16,
        marginBottom: 5
    },
    labelText: {
        fontSize: 18
    }
});

interface IProps {
    itemKey: string;
    value: string;
    placeholder: string;
    onChangeText?: (itemKey: string, text: string) => void;
}

export default function ItemDetailInput({ itemKey, placeholder, value, onChangeText }: IProps) {
    const _onChangeText = (text: string): void => {
        if (!onChangeText || !itemKey) return;
        onChangeText(itemKey, text);
    };

    return (
        <View style={styles.container}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.placeholderText}>
                {placeholder}
            </Text>
            <TextInput style={styles.labelText} onChangeText={_onChangeText} value={value} />
        </View>
    );
}

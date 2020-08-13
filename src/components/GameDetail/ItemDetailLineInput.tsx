import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8
    },
    moneyContainer: {
        flexDirection: 'row'
    },
    labelText: {
        fontSize: 18
    }
});

interface IProps {
    itemKey?: string;
    value: string;
    label: string;
    onChangeText?: (itemKey: string, text: string) => void;
}

export default function ItemDetailLineInput({
    itemKey,
    label,
    value = '22',
    onChangeText
}: IProps) {
    const _onChangeText = (text: string): void => {
        if (!onChangeText || !itemKey) return;
        onChangeText(itemKey, text);
    };

    return (
        <View style={styles.container}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.labelText}>
                {label}
            </Text>
            <View style={styles.moneyContainer}>
                <TextInput style={styles.labelText} onChangeText={_onChangeText} value={value} />
                <Text style={styles.labelText}> EUR</Text>
            </View>
        </View>
    );
}

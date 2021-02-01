import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8
    },
    moneyContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    inputText: {
        flex: 1,
        ...Platform.select({
            web: {
                outlineWidth: 0
            }
        }),
        textAlign: 'right',
        paddingRight: 5,
        fontSize: 18
    },
    labelText: {
        fontSize: 18
    }
});

interface IProps {
    itemKey?: string;
    value?: string;
    label: string;
    editable?: boolean;
    changeNumber?: (itemKey: string, number: string) => void;
}

export default function ItemDetailLineInput({
    itemKey,
    label,
    value = '0',
    editable = true,
    changeNumber
}: IProps) {
    const _onChangeText = (text: string): void => {
        if (!changeNumber || !itemKey) return;
        changeNumber(itemKey, text);
    };

    return (
        <View style={styles.container}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.labelText}>
                {label}
            </Text>
            <View style={styles.moneyContainer}>
                <TextInput
                    style={styles.inputText}
                    placeholder={'0.0'}
                    keyboardType="decimal-pad"
                    returnKeyType={'next'}
                    editable={editable}
                    onChangeText={_onChangeText}
                    value={value ? value : ''}
                />
                <Text style={styles.labelText}>€</Text>
            </View>
        </View>
    );
}

import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
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
    itemKey?: string;
    placeholder: string;
    label: string;
    onPress?: (itemKey: string) => void;
}

export default function ItemDetailButton({ itemKey, placeholder, label, onPress }: IProps) {
    const _onPress = () => {
        if (!onPress || !itemKey) return;
        onPress(itemKey);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={_onPress}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.placeholderText}>
                {placeholder}
            </Text>
            <Text style={styles.labelText}>{label}</Text>
        </TouchableOpacity>
    );
}

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8
    },
    placeholderText: {
        color: '#888',
        fontSize: 16,
        marginBottom: 5
    },
    labelText: {
        fontSize: 18
    },
    textContainer: {
        flexDirection: 'column'
    },
    tapContainer: {
        width: 50
    }
});

interface IProps {
    placeholder: string;
    value: string;
    onPress: () => void;
}

export default function ItemDetailIcon({ value = '', placeholder, onPress }: IProps) {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.placeholderText}>
                    {placeholder}
                </Text>
                <Text style={styles.labelText}>{value}</Text>
            </View>
            <RectButton style={styles.tapContainer} onPress={onPress}>
                <Ionicons name="ios-arrow-round-forward" size={34} color="black" />
            </RectButton>
        </View>
    );
}

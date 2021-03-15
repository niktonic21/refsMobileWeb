import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';
import { getDateString } from '@utils';

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
        minHeight: 21,
        fontSize: 18
    }
});

interface IProps {
    onChange: (data: any) => void;
    date?: Date | string;
    placeholder: string;
}

export default function DatePicker({ onChange, placeholder, date }: IProps) {
    const [visible, setVisible] = useState(false);
    const onDismiss = useCallback(() => {
        setVisible(false);
    }, [setVisible]);

    const _onChange = useCallback(({ date }) => {
        setVisible(false);
        onChange(date.toString());
    }, []);

    const correctDate = typeof date === 'string' ? new Date(date) : date;

    return (
        <View style={styles.container}>
            <DatePickerModal
                mode="single"
                visible={visible}
                onDismiss={onDismiss}
                date={correctDate || new Date()}
                onConfirm={_onChange}
                saveLabel="Ulož" // optional
                label="Vyber dátum" // optional
            />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.placeholderText}>
                {placeholder}
            </Text>
            <Text style={styles.labelText} onPress={() => setVisible(true)}>
                {getDateString(correctDate)}
            </Text>
        </View>
    );
}

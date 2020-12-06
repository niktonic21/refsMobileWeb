import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';

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

const getDateString = (date?: Date) => {
    if (!date) return;
    var DD = ('0' + date.getDate()).slice(-2);
    var MM = ('0' + (date.getMonth() + 1)).slice(-2);
    var YYYY = date.getFullYear();
    return `${DD}.${MM}.${YYYY}`;
};

interface IProps {
    onChange: (data: any) => void;
    date?: Date;
    placeholder: string;
}

export default function DatePicker({ onChange, placeholder, date }: IProps) {
    const [visible, setVisible] = useState(false);
    const onDismiss = useCallback(() => {
        setVisible(false);
    }, [setVisible]);

    const _onChange = useCallback(({ date }) => {
        setVisible(false);
        onChange(date);
    }, []);

    return (
        <View style={styles.container}>
            <DatePickerModal
                mode="single"
                visible={visible}
                onDismiss={onDismiss}
                date={date || new Date()}
                onConfirm={_onChange}
                saveLabel="Ulož" // optional
                label="Vyber dátum" // optional
            />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.placeholderText}>
                {placeholder}
            </Text>
            <Text style={styles.labelText} onPress={() => setVisible(true)}>
                {getDateString(date)}
            </Text>
        </View>
    );
}

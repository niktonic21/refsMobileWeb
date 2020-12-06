import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TimePickerModal } from 'react-native-paper-dates';

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
    time: string;
    placeholder: string;
}

export default function TimePicker({ onChange, placeholder, time }: IProps) {
    const [visible, setVisible] = useState(false);
    const onDismiss = useCallback(() => {
        setVisible(false);
    }, [setVisible]);

    const _onConfirm = useCallback(
        ({ hours, minutes }) => {
            setVisible(false);
            onChange(`${hours}:${('0' + minutes).slice(-2)}`);
        },
        [setVisible]
    );
    console.log('time__', time);

    return (
        <View style={styles.container}>
            <TimePickerModal
                visible={visible}
                onDismiss={onDismiss}
                onConfirm={_onConfirm}
                hours={12} // default: current hours
                minutes={30} // default: current minutes
                label="Vyber čas" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
            />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.placeholderText}>
                {placeholder}
            </Text>
            <Text style={styles.labelText} onPress={() => setVisible(true)}>
                {time}
            </Text>
        </View>
    );
}

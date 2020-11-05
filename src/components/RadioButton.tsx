import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    optionIconContainer: {
        height: 30,
        width: 25
    },
    option: {
        flex: 1,
        height: 46,
        alignSelf: 'stretch',
        paddingHorizontal: 15
    },
    optionText: {
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 1
    }
});

interface IRadioButton {
    label: string;
    checked: boolean;
    onPress: () => void;
}

export const RadioButton: React.FC<IRadioButton> = ({ label, checked, onPress }) => (
    <RectButton style={styles.option} onPress={onPress}>
        <View style={styles.container}>
            <Text style={styles.optionText}>{label}</Text>
            <View style={styles.optionIconContainer}>
                {checked && <Ionicons name={'ios-checkmark'} size={45} color="grey" />}
            </View>
        </View>
    </RectButton>
);

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
    value: string;
    checked: boolean;
    sortKey: string;
    onCheck: (sortKey: string, value: string | object) => void;
}

export const RadioButton: React.FC<IRadioButton> = ({
    label,
    value,
    sortKey,
    checked,
    onCheck
}) => {
    const _onPress = () => onCheck(sortKey, value);

    return (
        <RectButton style={styles.option} onPress={_onPress}>
            <View style={styles.container}>
                <Text style={styles.optionText}>{label}</Text>
                <View style={styles.optionIconContainer}>
                    {checked && <Ionicons name={'ios-checkmark'} size={45} color="grey" />}
                </View>
            </View>
        </RectButton>
    );
};

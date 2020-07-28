import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: 46,
        paddingHorizontal: 15,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    buttonContainer: {
        backgroundColor: 'white',
        height: 30,
        maxWidth: '30%',
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'grey'
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center'
    }
});

interface IProps {
    label: string;
}

const FilterButton = ({ label }: IProps) => {
    const _onPress = () => {
        console.log('log_fitler', label);
    };
    return (
        <RectButton style={styles.buttonContainer} onPress={_onPress}>
            <Text style={styles.buttonText}>{label}</Text>
        </RectButton>
    );
};

const data = [{ label: 'Liga' }, { label: 'Rozhodcovia' }, { label: 'Mesiac' }];

export default function FilterButtons() {
    return (
        <View style={styles.container}>
            {data.map(({ label }) => (
                <FilterButton key={label} label={label} />
            ))}
        </View>
    );
}

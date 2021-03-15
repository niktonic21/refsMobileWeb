import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getFilterButtonLabel } from '../utils/gameUtils';

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
        paddingHorizontal: 5,
        textAlign: 'center'
    }
});

interface IProps {
    filterKey: string;
    onPress: (label: string) => void;
}

const data = [{ filterKey: 'Liga' }, { filterKey: 'Rozhodca' }, { filterKey: 'Mesiac' }];

const FilterButton = ({ filterKey, onPress }: IProps) => {
    const _onPress = () => {
        onPress(filterKey);
    };
    const label = getFilterButtonLabel(filterKey);

    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={_onPress}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.buttonText}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default function FilterButtons({ onPress }) {
    return (
        <View style={styles.container}>
            {data.map(({ filterKey }) => (
                <FilterButton key={filterKey} filterKey={filterKey} onPress={onPress} />
            ))}
        </View>
    );
}

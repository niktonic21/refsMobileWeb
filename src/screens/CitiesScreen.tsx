import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import includes from 'lodash/includes';
import remove from 'lodash/remove';
import get from 'lodash/get';
import { getCitiesList } from '@utils';

import { RadioButton } from '../components/RadioButton';
import { BackButtonWeb } from '../components/BackButtonWeb';

const styles = StyleSheet.create({
    container: {
        maxWidth: 800,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    listContainer: {
        backgroundColor: 'white'
    },
    headerText: {
        fontWeight: 'bold',
        padding: 15
    },
    separator: {
        height: 1,
        marginLeft: 15,
        alignSelf: 'stretch',
        backgroundColor: 'grey'
    },
    separatorMain: {
        height: 1,
        alignSelf: 'stretch',
        backgroundColor: '#ccc'
    }
});

const _renderSeparator = () => <View style={styles.separator} />;
const _keyExtractor = (item: any) => item;

interface IProp {
    route: {
        onSelectedCities: (cities: string[]) => void;
        selectedCities: string[] | undefined;
        single: boolean;
    };
    navigation: any;
}

export default function CitiesScreen({ route }: IProp) {
    const onSelectedCities = get(route, 'params.onSelectedCities', () => {});
    const selectedCities = get(route, 'params.selectedCities', []);
    const isSingleCity = get(route, 'params.single', false);

    const [choosenCities, useChoosenCities] = useState(selectedCities);
    const data = getCitiesList();

    const _renderItem = ({ item }: any): JSX.Element => {
        const _onCheck = () => {
            let newChoosenCities: string[] = [];
            if (checked) {
                newChoosenCities = remove(choosenCities, (city: string) => city !== item);
            } else if (isSingleCity) {
                newChoosenCities[0] = item;
            } else {
                newChoosenCities = choosenCities.concat(item);
            }
            onSelectedCities(newChoosenCities);
            useChoosenCities(newChoosenCities);
        };

        const checked = includes(choosenCities, item);

        return <RadioButton checked={checked} label={item} onPress={_onCheck} />;
    };

    const headerPrefix = isSingleCity ? 'Mesto' : 'Mestá';
    return (
        <>
            <View style={styles.container}>
                <BackButtonWeb />
                <Text style={styles.headerText}>
                    {headerPrefix}: {choosenCities.toString()}
                </Text>
            </View>
            <View style={styles.separatorMain} />
            <FlatList
                style={styles.listContainer}
                contentContainerStyle={styles.container}
                data={data}
                extraData={choosenCities}
                initialNumToRender={10}
                windowSize={20}
                ItemSeparatorComponent={_renderSeparator}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
            />
        </>
    );
}

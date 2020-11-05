import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import includes from 'lodash/includes';
import remove from 'lodash/remove';
import { getCitiesList } from '@utils';

import { RadioButton } from '../components/RadioButton';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    contentContainer: {
        maxWidth: 800,
        width: '100%',
        flex: 1,
        alignSelf: 'center',
        paddingVertical: 15
    },
    headerText: {
        maxWidth: 800,
        width: '100%',
        alignSelf: 'center',
        fontWeight: 'bold',
        padding: 15
    },
    separator: {
        height: 1,
        marginLeft: 15,
        alignSelf: 'stretch',
        backgroundColor: 'grey'
    }
});

const _renderSeparator = () => <View style={styles.separator} />;
const _keyExtractor = (item: any) => item;

let choosenC = ['BOJNICE', 'BARDEJOV', 'BRESTOV', 'BRATISLAVA'];
export default function CitiesScreen({ navigation }: any) {
    const [choosenCities, useChoosenCities] = useState(choosenC);
    const data = getCitiesList();

    const _renderItem = ({ item }: any): JSX.Element => {
        const _onCheck = () => {
            let newChoosenCities = [];
            if (checked) {
                newChoosenCities = remove(choosenCities, (city: string) => city !== item);
            } else {
                newChoosenCities = choosenCities.concat(item);
            }
            useChoosenCities(newChoosenCities);
            //dispatch(filterChanged(item.key, item.value));
        };

        const checked = includes(choosenCities, item);

        return <RadioButton checked={checked} label={item} onPress={_onCheck} />;
    };

    return (
        <>
            <Text style={styles.headerText}>Cities: {choosenCities.toString()}</Text>
            <FlatList
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
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

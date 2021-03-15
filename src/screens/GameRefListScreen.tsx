import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import includes from 'lodash/includes';
import remove from 'lodash/remove';
import get from 'lodash/get';

import { RadioButton } from '../components/RadioButton';
import { BackButtonWeb } from '../components/BackButtonWeb';

const styles = StyleSheet.create({
    container: {
        maxWidth: 800,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center'
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
    }
});

const _renderSeparator = () => <View style={styles.separator} />;
const _keyExtractor = (item: string) => item;

export default function GameRefListScreen({ route }: any) {
    const refList = get(route, 'params.refList', []);
    const onSelectedRefsInCar = get(route, 'params.onSelectedRefsInCar', () => {});
    const selectedRefsInCar = get(route, 'params.selectedRefsInCar', []);
    const [choosenRefs, useChoosenRefs] = useState(selectedRefsInCar);

    const _renderItem = ({ item }: { item: string }): JSX.Element => {
        const _onCheck = () => {
            let newChoosenRefs = [];
            if (checked) {
                newChoosenRefs = remove(choosenRefs, (ref: string) => ref !== item);
            } else {
                newChoosenRefs = choosenRefs.concat(item);
            }
            onSelectedRefsInCar(newChoosenRefs);
            useChoosenRefs(newChoosenRefs);
        };

        const checked = includes(choosenRefs, item);

        return <RadioButton checked={checked} label={item} onPress={_onCheck} />;
    };

    return (
        <>
            <View style={styles.container}>
                <BackButtonWeb />
                <Text style={styles.headerText}>Rozhodcovia: {choosenRefs.toString()}</Text>
            </View>
            <FlatList
                contentContainerStyle={styles.container}
                data={refList}
                extraData={choosenRefs}
                initialNumToRender={10}
                windowSize={20}
                ItemSeparatorComponent={_renderSeparator}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
            />
        </>
    );
}

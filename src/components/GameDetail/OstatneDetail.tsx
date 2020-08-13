import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../Card';
import { IGame } from '../../utils/types';
import ItemDetailButton from './ItemDetailButton';
import ItemDetailSwitch from './ItemDetailSwitch';
import Separator from './Separator';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        marginBottom: 20
    },
    headerText: {
        marginLeft: 15,
        marginVertical: 10,
        fontSize: 20
    }
});

export default function OstatneDetail({ gameData }: { gameData: IGame }) {
    const isDriver = true;
    const spz = '123123';
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Ostatne</Text>
            <Card>
                <ItemDetailSwitch label={'Ine stretnutie'} />
                <Separator />
                <ItemDetailButton placeholder={'Cislo druheho stretnutia'} label={`${spz}`} />
                <Separator />
                <ItemDetailButton placeholder={'Poznamky'} label={`.....`} />
            </Card>
        </View>
    );
}

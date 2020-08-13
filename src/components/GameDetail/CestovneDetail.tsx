import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../Card';
import { IGame } from '../../utils/types';
import ItemDetailButton from './ItemDetailButton';
import ItemDetailSwitch from './ItemDetailSwitch';
import { ligueToLig } from '@gameUtils';
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

export default function CestovneDetail({ gameData }: { gameData: IGame }) {
    const isDriver = true;
    const spz = 'KS1000BS';
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Cestovne</Text>
            <Card>
                <ItemDetailSwitch label={'Bol som vodic'} />
                <Separator />
                <ItemDetailSwitch label={'Sadzba mesto'} />
                <Separator />
                <ItemDetailButton placeholder={'Spz auto'} label={`${spz}`} />
                <Separator />
                <ItemDetailButton placeholder={'Spolucestujuci'} label={`Bogdan Korba`} />
                <Separator />
                <ItemDetailButton placeholder={'Odkial a kam'} label={`Bogdan Korba`} />
            </Card>
        </View>
    );
}

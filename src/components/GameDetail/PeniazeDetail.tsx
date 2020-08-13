import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../Card';
import { IGame } from '../../utils/types';
import Separator from './Separator';
import ItemDetailLineInput from './ItemDetailLineInput';

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

export default function PeniazeDetail({ gameData }: { gameData: IGame }) {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Spolu</Text>
            <Card>
                <ItemDetailLineInput label={'Pausal'} value={'100'} />
                <Separator />
                <ItemDetailLineInput label={'Cestovne'} value={'0'} />
                <Separator />
                <ItemDetailLineInput label={'Sadzba mesto'} value={'0'} />
                <Separator />
                <ItemDetailLineInput label={'Stravne'} value={'0'} />
                <Separator />
                <ItemDetailLineInput label={'Noclazne'} value={'0'} />
                <Separator />
                <ItemDetailLineInput label={'Postovne'} value={'0'} />
                <Separator />
                <ItemDetailLineInput label={'Ostatne'} value={'0,60'} />
                <Separator />
                <Separator />
                <Separator />
                <ItemDetailLineInput label={'SPOLU'} value={'123'} />
            </Card>
        </View>
    );
}

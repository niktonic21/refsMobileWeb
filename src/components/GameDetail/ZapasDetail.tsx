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

export default function ZapasDetail({ gameData }: { gameData: IGame }) {
    const { home, away, external_id, game_date, referees } = gameData;
    const ligue = ligueToLig(external_id);
    const dateTime = game_date ? game_date.split(' ') : [];
    const refs = referees.map(ref => ref.name.split(',', 2)).join('\n');

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Zapas</Text>
            <Card>
                <ItemDetailButton
                    placeholder={'Liga, Kolo, C. zapasu'}
                    label={`${ligue}, ${''}, ${external_id}`}
                />
                <Separator />
                <ItemDetailButton
                    placeholder={'Datum a cas'}
                    label={`${dateTime[0]}, ${dateTime[1]}`}
                />
                <Separator />
                <ItemDetailButton placeholder={'Stadion'} label={home} />
                <Separator />
                <ItemDetailButton placeholder={'Domaci - Hostia'} label={`${home} - ${away}`} />
                <Separator />
                <ItemDetailButton placeholder={'Rozhodcovia'} label={refs} />
                <Separator />
                <ItemDetailSwitch label={'Stretnutie sa hralo'} />
            </Card>
        </View>
    );
}

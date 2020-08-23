import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../Card';
import { IGame } from '../../utils/types';
import ItemDetailButton from './ItemDetailButton';
import ItemDetailSwitch from './ItemDetailSwitch';
import { ligueToLig } from '@gameUtils';
import Separator from './Separator';
import { ZAPAS } from '@strings';

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

interface IProps {
    gameData: IGame;
    isBilling: boolean;
}

export default function ZapasDetail({ gameData, isBilling }: IProps) {
    const { home, away, gameId, date, time, subligue, stadium, round, referees } = gameData;
    const ligue = ligueToLig(gameId);
    const refs = referees.map(ref => ref.name.split(',', 2)).join('\n');

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{ZAPAS}</Text>
            <Card>
                <ItemDetailButton placeholder={'Časť'} label={`${subligue}`} />
                <Separator />
                <ItemDetailButton
                    placeholder={'Liga, Kolo, Č. zápasu'}
                    label={`${ligue}, ${round}, ${gameId}`}
                />
                <Separator />
                <ItemDetailButton placeholder={'Dátum a čas'} label={`${date}, ${time}`} />
                <Separator />
                <ItemDetailButton placeholder={'Štadión'} label={stadium} />
                <Separator />
                <ItemDetailButton placeholder={'Domáci - Hostia'} label={`${home} - ${away}`} />
                <Separator />
                <ItemDetailButton placeholder={'Rozhodcovia'} label={refs} />
                {isBilling ? (
                    <>
                        <Separator />
                        <ItemDetailSwitch label={'Stretnutie sa hralo'} />
                    </>
                ) : null}
            </Card>
        </View>
    );
}

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../Card';
import ItemDetailButton from './ItemDetailButton';
import ItemDetailSwitch from './ItemDetailSwitch';
import Separator from './Separator';
import {
    GAME,
    PART,
    KC,
    LIGUE,
    STADIUM,
    DATE_TIME,
    HOME_AWAY,
    REFS,
    GAME_PLAYED,
    GAME_PLAYED_BEFORE
} from '@strings';
import { EGameDetail, IGame } from '@utils';
import RefereeDownPicker from './RefereePicker';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        marginBottom: 40
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
    updateDetails: (data: any) => void;
}

export default function ZapasDetail({ gameData, isBilling, updateDetails }: IProps) {
    const { home, away, gameId, date, time, subligue, ligue, stadium, round, referees } = gameData;
    const refNameList = referees.map(ref => ref.name.split(',', 2)).join('\n');

    const [playedBefore, setPlayedBefore] = useState(false);
    const [played, setPlayed] = useState(true);
    const [refsWithType, setRefsWithType] = useState([]);

    useEffect(() => {
        updateDetails({ played, playedBefore });
    }, []);

    const _toggleSwitch = (itemKey: string) => {
        if (EGameDetail.PLAYED === itemKey) {
            setPlayed(!played);
            updateDetails({ played: !played });
            return;
        }
        if (EGameDetail.PLAYED_BEFORE === itemKey) {
            setPlayedBefore(!playedBefore);
            updateDetails({ playedBefore: !playedBefore });
        }
    };

    const _saveRefsType = (newRefs: Array<{ name: string; refType: string }>) => {
        setRefsWithType(newRefs);
        const objRefs = newRefs.reduce((acc, ref) => ({ ...acc, [ref.refType]: ref.name }), {});
        updateDetails(objRefs);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{GAME}</Text>
            <Card>
                <ItemDetailButton placeholder={LIGUE} label={ligue} />
                <Separator />
                <ItemDetailButton placeholder={PART} label={subligue} />
                <Separator />
                <ItemDetailButton placeholder={KC} label={`${gameId}, ${round}`} />
                <Separator />
                <ItemDetailButton placeholder={DATE_TIME} label={`${date}, ${time}`} />
                <Separator />
                <ItemDetailButton placeholder={STADIUM} label={stadium} />
                <Separator />
                <ItemDetailButton placeholder={HOME_AWAY} label={`${home} - ${away}`} />
                {isBilling ? (
                    <>
                        <Separator />
                        <ItemDetailSwitch
                            itemKey={EGameDetail.PLAYED_BEFORE}
                            label={GAME_PLAYED_BEFORE}
                            isEnabled={playedBefore}
                            toggleSwitch={_toggleSwitch}
                        />
                        <Separator />
                        <ItemDetailSwitch
                            itemKey={EGameDetail.PLAYED}
                            label={GAME_PLAYED}
                            isEnabled={played}
                            toggleSwitch={_toggleSwitch}
                        />
                        <Separator />
                    </>
                ) : null}
                {isBilling ? (
                    <RefereeDownPicker
                        referees={referees}
                        saveRefsType={_saveRefsType}
                        refsWithType={refsWithType}
                    />
                ) : (
                    <ItemDetailButton placeholder={REFS} label={refNameList} />
                )}
            </Card>
        </View>
    );
}

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
import { EGameDetail, IGame, IRef } from '@utils';
import RefereeDownPicker, { refsPickerData } from './RefereePicker';

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

const createRefsWithType = (referees: any) => {
    return referees.map((ref: IRef, index: number) => {
        const name = ref.name.split(',', 2).join();
        const refType =
            refsPickerData.find(r => r.class === ref.class)?.value || refsPickerData[index].value;
        return { refType: refType, name, id: ref.id };
    });
};

interface IProps {
    gameData: IGame;
    isBilling: boolean;
    played?: boolean;
    playedBefore?: boolean;
    updateDetails: (data: any) => void;
}
export interface IRefWithType {
    refType: string;
    name: string;
    id: string;
}

export default function ZapasDetail({
    gameData,
    isBilling,
    played = true,
    playedBefore = false,
    updateDetails
}: IProps) {
    const {
        home,
        away,
        gameId,
        day,
        date,
        time,
        subligue,
        ligue,
        stadium,
        round,
        referees
    } = gameData;
    const [refsWithType, setRefsWithType] = useState<IRefWithType[]>(createRefsWithType(referees));
    const refNameList = refsWithType
        .map(ref => `${ref.refType.toUpperCase()} - ${ref.name}`)
        .join('\n');

    useEffect(() => {
        updateDetails({ played, playedBefore, gameId, refs: refsWithType });
    }, []);

    const _toggleSwitch = (itemKey: string) => {
        if (EGameDetail.PLAYED === itemKey) {
            updateDetails({ played: !played });
            return;
        }
        if (EGameDetail.PLAYED_BEFORE === itemKey) {
            updateDetails({ playedBefore: !playedBefore });
        }
    };

    const _saveRefsType = (newRefs: IRefWithType[]) => {
        //const objRefs = newRefs.reduce((acc, ref) => ({ ...acc, [ref.refType]: ref.name }), {});
        setRefsWithType(newRefs);
        updateDetails({ refs: newRefs });
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
                <ItemDetailButton placeholder={DATE_TIME} label={`${day} ${date} o ${time}`} />
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
                    <RefereeDownPicker saveRefsType={_saveRefsType} refsWithType={refsWithType} />
                ) : (
                    <ItemDetailButton placeholder={REFS} label={refNameList} />
                )}
            </Card>
        </View>
    );
}

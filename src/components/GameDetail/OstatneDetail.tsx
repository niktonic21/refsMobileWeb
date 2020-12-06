import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../Card';
import { EGameDetail, IGame } from '@utils';
import { OTHER, ANOTHER_GAME, SECOND_GAME_NUM, GAME_REPETED, NOTE } from '@strings';
import ItemDetailInput from './ItemDetailInput';
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

interface IProps {
    updateDetails: (data: any) => void;
}

export default function OstatneDetail({ updateDetails }: IProps) {
    const [isSecondGame, setIsSecondGame] = useState(false);
    const [isRepeatedGame, setIsRepeatedGame] = useState(false);
    const [secondGameId, setSecondGameId] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        updateDetails({ isSecondGame, isRepeatedGame });
    }, []);

    const _toggleSwitch = (itemKey: string) => {
        if (EGameDetail.IS_SECOND_GAME === itemKey) {
            setIsSecondGame(!isSecondGame);
            updateDetails({ isSecondGame: !isSecondGame });
            return;
        }
        if (EGameDetail.IS_REPEATED_GAME === itemKey) {
            setIsRepeatedGame(!isRepeatedGame);
            updateDetails({ isRepeatedGame: !isRepeatedGame });
        }
    };

    const _changeText = (itemKey: string, text: string) => {
        if (EGameDetail.SECOND_GAME === itemKey) {
            setSecondGameId(text);
        }
        if (EGameDetail.NOTES === itemKey) {
            setNotes(text);
        }
        updateDetails({ [itemKey]: text });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{OTHER}</Text>
            <Card>
                <ItemDetailSwitch
                    label={GAME_REPETED}
                    itemKey={EGameDetail.IS_REPEATED_GAME}
                    isEnabled={isRepeatedGame}
                    toggleSwitch={_toggleSwitch}
                />
                <Separator />
                <ItemDetailSwitch
                    label={ANOTHER_GAME}
                    itemKey={EGameDetail.IS_SECOND_GAME}
                    isEnabled={isSecondGame}
                    toggleSwitch={_toggleSwitch}
                />
                {isSecondGame ? (
                    <>
                        <Separator />
                        <ItemDetailInput
                            itemKey={EGameDetail.SECOND_GAME}
                            placeholder={SECOND_GAME_NUM}
                            onChangeText={_changeText}
                            value={secondGameId}
                        />
                        <Separator />
                        <ItemDetailInput
                            itemKey={EGameDetail.NOTES}
                            placeholder={NOTE}
                            onChangeText={_changeText}
                            value={notes}
                        />
                    </>
                ) : null}
            </Card>
        </View>
    );
}

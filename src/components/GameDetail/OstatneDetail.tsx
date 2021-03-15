import React from 'react';
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
    isSecondGame?: boolean;
    isRepeatedGame?: boolean;
    secondGame?: string;
    notes?: string;
}

export default function OstatneDetail({
    updateDetails,
    isSecondGame = false,
    isRepeatedGame = false,
    secondGame = '',
    notes = ''
}: IProps) {
    const _toggleSwitch = (itemKey: string) => {
        if (EGameDetail.IS_SECOND_GAME === itemKey) {
            updateDetails({ [EGameDetail.IS_SECOND_GAME]: !isSecondGame });
            return;
        }
        if (EGameDetail.IS_REPEATED_GAME === itemKey) {
            updateDetails({ [EGameDetail.IS_REPEATED_GAME]: !isRepeatedGame });
        }
    };

    const _changeText = (itemKey: string, text: string) => {
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
                            value={secondGame}
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

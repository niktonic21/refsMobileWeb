import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../Card';
import { EGameDetail, IGame } from '@utils';
import { MEAL, FROM_CITY, TO_CITY, FROM_DAY, TO_DAY, FROM_TIME, TO_TIME } from '@strings';
import ItemDetailInput from './ItemDetailInput';
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
    gameData: IGame;
    updateDetails: (data: any) => void;
}

export default function StravneDetail({ gameData, updateDetails }: IProps) {
    const [fromCity, setfromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [fromDay, setFromDay] = useState('');
    const [toDay, setToDay] = useState('');
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');

    const _changeText = (itemKey: string, text: string) => {
        if (EGameDetail.FROM_CITY === itemKey) {
            setfromCity(fromCity);
        }
        if (EGameDetail.TO_CITY === itemKey) {
            setToCity(toCity);
        }
        if (EGameDetail.FROM_DAY === itemKey) {
            setFromDay(fromDay);
        }
        if (EGameDetail.TO_DAY === itemKey) {
            setToDay(toDay);
        }
        if (EGameDetail.FROM_TIME === itemKey) {
            setFromTime(fromTime);
        }
        if (EGameDetail.TO_TIME === itemKey) {
            setToTime(toTime);
        }
        updateDetails({ [itemKey]: text });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{MEAL}</Text>
            <Card>
                <ItemDetailInput
                    itemKey={EGameDetail.FROM_CITY}
                    placeholder={FROM_CITY}
                    onChangeText={_changeText}
                    value={fromCity}
                />
                <Separator />
                <ItemDetailInput
                    itemKey={EGameDetail.TO_CITY}
                    placeholder={TO_CITY}
                    onChangeText={_changeText}
                    value={toCity}
                />
                <ItemDetailInput
                    itemKey={EGameDetail.FROM_DAY}
                    placeholder={FROM_DAY}
                    onChangeText={_changeText}
                    value={fromDay}
                />
                <Separator />
                <ItemDetailInput
                    itemKey={EGameDetail.TO_DAY}
                    placeholder={TO_DAY}
                    onChangeText={_changeText}
                    value={toDay}
                />
                <ItemDetailInput
                    itemKey={EGameDetail.FROM_TIME}
                    placeholder={FROM_TIME}
                    onChangeText={_changeText}
                    value={fromTime}
                />
                <Separator />
                <ItemDetailInput
                    itemKey={EGameDetail.TO_TIME}
                    placeholder={TO_TIME}
                    onChangeText={_changeText}
                    value={toTime}
                />
            </Card>
        </View>
    );
}

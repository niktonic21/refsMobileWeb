import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../Card';
import { IGame, EGameDetail, stringToNumber } from '@utils';
import { RATE, RATE_CITY, TRAVEL, TOGETHER, MEAL, NIGHT, POST, OTHER } from '@strings';
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

interface IProps {
    gameData: IGame;
    updateDetails: (data: any) => void;
}

export default function PeniazeDetail({ gameData, updateDetails }: IProps) {
    const [rateMoney, setRateMoney] = useState('');
    const [travelMoney, setTravelMoney] = useState('');
    const [rateCityMoney, setRateCityMoney] = useState('');
    const [mealMoney, setMealMoney] = useState('');
    const [nightMoney, setNightMoney] = useState('');
    const [postMoney, setPostMoney] = useState('');
    const [otherMoney, setOtherMoney] = useState('');
    const [togetherMoney, setTogetherMoney] = useState(0);

    useEffect(() => {
        const all =
            stringToNumber(rateMoney) +
            stringToNumber(travelMoney) +
            stringToNumber(rateCityMoney) +
            stringToNumber(mealMoney) +
            stringToNumber(nightMoney) +
            stringToNumber(postMoney) +
            stringToNumber(otherMoney);
        setTogetherMoney(all);
        updateDetails({ togetherMoney: all });
    }, [rateMoney, travelMoney, rateCityMoney, mealMoney, nightMoney, postMoney]);

    const _changeText = (itemKey: string, text: string) => {
        if (EGameDetail.RATE === itemKey) {
            setRateMoney(text);
        }
        if (EGameDetail.TRAVEL === itemKey) {
            setTravelMoney(text);
        }
        if (EGameDetail.RATE_CITY === itemKey) {
            setRateCityMoney(text);
        }
        if (EGameDetail.MEAL === itemKey) {
            setMealMoney(text);
        }
        if (EGameDetail.NIGHT === itemKey) {
            setNightMoney(text);
        }
        if (EGameDetail.POST === itemKey) {
            setPostMoney(text);
        }
        if (EGameDetail.OTHER === itemKey) {
            setOtherMoney(text);
        }
        const number = stringToNumber(text);
        updateDetails({ [itemKey]: number });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{TOGETHER}</Text>
            <Card>
                <ItemDetailLineInput
                    itemKey={EGameDetail.RATE}
                    changeNumber={_changeText}
                    label={RATE}
                    value={rateMoney}
                />
                <Separator />
                <ItemDetailLineInput
                    itemKey={EGameDetail.TRAVEL}
                    changeNumber={_changeText}
                    label={TRAVEL}
                    value={travelMoney}
                />
                <Separator />
                <ItemDetailLineInput
                    itemKey={EGameDetail.RATE_CITY}
                    changeNumber={_changeText}
                    label={RATE_CITY}
                    value={rateCityMoney}
                />
                <Separator />
                <ItemDetailLineInput
                    itemKey={EGameDetail.MEAL}
                    changeNumber={_changeText}
                    label={MEAL}
                    value={mealMoney}
                />
                <Separator />
                <ItemDetailLineInput
                    itemKey={EGameDetail.NIGHT}
                    changeNumber={_changeText}
                    label={NIGHT}
                    value={nightMoney}
                />
                <Separator />
                <ItemDetailLineInput
                    itemKey={EGameDetail.POST}
                    changeNumber={_changeText}
                    label={POST}
                    value={postMoney}
                />
                <Separator />
                <ItemDetailLineInput
                    itemKey={EGameDetail.OTHER}
                    changeNumber={_changeText}
                    label={OTHER}
                    value={otherMoney}
                />
                <Separator />
                <Separator />
                <Separator />
                <ItemDetailLineInput
                    editable={false}
                    itemKey={EGameDetail.TOGETHER}
                    changeNumber={_changeText}
                    label={TOGETHER}
                    value={String(togetherMoney)}
                />
            </Card>
        </View>
    );
}

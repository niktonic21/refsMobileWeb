import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../Card';
import { EGameDetail, stringToNumber } from '@utils';
import { RATE, RATE_CITY, TRAVEL, TOGETHER, MEAL, NIGHT, POST, OTHER } from '@strings';
import Separator from './Separator';
import ItemDetailLineInput from './ItemDetailLineInput';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        marginBottom: 20
    },
    headerText: {
        marginLeft: 15,
        marginVertical: 10,
        fontSize: 20
    },
    rateContainer: {
        marginHorizontal: 15,
        maxWidth: 120
    }
});

interface IProps {
    rateMoney?: number;
    travelMoney?: number;
    rateCityMoney?: number;
    mealMoney?: number;
    nightMoney?: number;
    postMoney?: number;
    otherMoney?: number;
    updateDetails: (data: any) => void;
}

export default function PeniazeDetail({
    rateMoney: rateMoneyProp,
    travelMoney: travelMoneyProp,
    rateCityMoney: rateCityMoneyProp,
    mealMoney: mealMoneyProp,
    nightMoney: nightMoneyProp,
    postMoney: postMoneyProp,
    otherMoney: otherMoneyProp,
    updateDetails
}: IProps) {
    const [rateMoney, setRateMoney] = useState(rateMoneyProp?.toString() || '');
    const [rateCityMoney, setRateCityMoney] = useState(rateCityMoneyProp?.toString() || '');
    const [nightMoney, setNightMoney] = useState(nightMoneyProp?.toString() || '');
    const [travelMoney, setTravelMoney] = useState(travelMoneyProp?.toString() || '');
    const [postMoney, setPostMoney] = useState(postMoneyProp?.toString() || '');
    const [mealMoney, setMealMoney] = useState(mealMoneyProp?.toString() || '');
    const [otherMoney, setOtherMoney] = useState(otherMoneyProp?.toString() || '');
    const [togetherMoney, setTogetherMoney] = useState(0);

    useEffect(() => {
        updateDetails({ [EGameDetail.RATE]: rateMoney });
    }, []);

    useEffect(() => {
        rateMoneyProp && setRateMoney(rateMoneyProp.toString());
    }, [rateMoneyProp]);

    useEffect(() => {
        travelMoneyProp && setTravelMoney(travelMoneyProp.toString());
    }, [travelMoneyProp]);

    useEffect(() => {
        rateCityMoneyProp && setRateCityMoney(rateCityMoneyProp.toString());
    }, [rateCityMoneyProp]);

    useEffect(() => {
        mealMoneyProp && setMealMoney(mealMoneyProp.toString());
    }, [mealMoneyProp]);

    useEffect(() => {
        nightMoneyProp && setNightMoney(nightMoneyProp.toString());
    }, [nightMoneyProp]);

    useEffect(() => {
        postMoneyProp && setPostMoney(postMoneyProp.toString());
    }, [postMoneyProp]);

    useEffect(() => {
        otherMoneyProp && setOtherMoney(otherMoneyProp.toString());
    }, [otherMoneyProp]);

    useEffect(() => {
        const all =
            stringToNumber(travelMoney) +
            stringToNumber(rateCityMoney) +
            stringToNumber(mealMoney) +
            stringToNumber(nightMoney) +
            stringToNumber(postMoney) +
            stringToNumber(otherMoney);
        const allFixed = stringToNumber(all.toFixed(2));
        setTogetherMoney(allFixed);
        updateDetails({ [EGameDetail.TOGETHER]: allFixed });
    }, [travelMoney, rateCityMoney, mealMoney, nightMoney, postMoney, otherMoney]);

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
            <View style={styles.rateContainer}>
                <ItemDetailLineInput
                    itemKey={EGameDetail.RATE}
                    changeNumber={_changeText}
                    label={RATE}
                    value={rateMoney}
                />
            </View>
            <Card>
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
                    value={togetherMoney?.toString()}
                />
            </Card>
        </View>
    );
}

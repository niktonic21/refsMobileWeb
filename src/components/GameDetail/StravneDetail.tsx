import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../Card';
import { EGameDetail } from '@utils';
import {
    MEAL,
    COUNT_MEAL,
    FROM_CITY,
    TO_CITY,
    FROM_DAY,
    TO_DAY,
    FROM_TIME,
    TO_TIME
} from '@strings';
import ItemDetailSwitch from './ItemDetailSwitch';
import Separator from './Separator';
import ItemDetailIcon from './ItemDetailIcon';
import { useNavigation } from '@react-navigation/native';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';

const timeStringToFloat = (time: string): number => {
    const hoursMinutes = time.split(/[.:]/);
    const hours = parseInt(hoursMinutes[0], 10);
    const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
};

const timeDiff = (start: string, end: string): number => {
    const startArr: string[] = start.split(':');
    const endArr: string[] = end.split(':');
    const startDate = new Date(0, 0, 0, parseInt(startArr[0]), parseInt(startArr[1]), 0);
    const endDate = new Date(0, 0, 0, parseInt(endArr[0]), parseInt(endArr[1]), 0);
    let diff = endDate.getTime() - startDate.getTime();
    let hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(diff / 1000 / 60);

    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0) hours = hours + 24;
    const stringRes = (hours <= 9 ? '0' : '') + hours + ':' + (minutes <= 9 ? '0' : '') + minutes;
    const numberRes = timeStringToFloat(stringRes);
    return numberRes;
};

const getMealMoney = (hours: number): string => {
    if (hours >= 18) {
        return '11.60';
    }
    if (hours >= 12) {
        return '7.60';
    }
    if (hours >= 5) {
        return '5.10';
    }
    return '';
};

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
    fromCity?: string;
    toCity?: string;
    fromDay?: Date;
    fromTime?: string;
    toDay?: Date;
    toTime?: string;
    updateDetails: (data: any) => void;
}

export default function StravneDetail({
    fromCity = '',
    toCity = '',
    fromDay,
    fromTime = '',
    toDay,
    toTime = '',
    updateDetails
}: IProps) {
    const navigation = useNavigation();
    const [isMealEnabled, setIsMealEnabled] = useState(Boolean(fromCity));

    useEffect(() => {
        if (fromTime && toTime) {
            const hoursNum = timeDiff(fromTime, toTime);
            const mealMoney = getMealMoney(hoursNum);

            updateDetails({ [EGameDetail.MEAL]: mealMoney });
        }
    }, [fromTime, toTime]);

    const _toggleSwitch = (itemKey: string) => {
        if (EGameDetail.MEAL_ENABLED === itemKey) {
            setIsMealEnabled(!isMealEnabled);
        }
    };

    const _onSelectedFromCities = (cities: string[]) => {
        if (!toCity) {
            updateDetails({ [EGameDetail.FROM_CITY]: cities[0], [EGameDetail.TO_CITY]: cities[0] });
        } else {
            updateDetails({ [EGameDetail.FROM_CITY]: cities[0] });
        }
    };

    const _goToCitiesFrom = () => {
        // TODO: stop sending function here use setparaps instead
        navigation.navigate('CitiesScreen', {
            selectedCity: fromCity,
            onSelectedCities: _onSelectedFromCities,
            single: true
        });
    };

    const _onSelectedToCities = (cities: string[]) => {
        updateDetails({ [EGameDetail.TO_CITY]: cities[0] });
    };

    const _goToCitiesTo = () => {
        // TODO: stop sending function here use setparaps instead
        navigation.navigate('CitiesScreen', {
            selectedCity: toCity,
            onSelectedCities: _onSelectedToCities,
            single: true
        });
    };

    const _changeDateFrom = (date: Date) => {
        updateDetails({ [EGameDetail.FROM_DAY]: date });
    };
    const _changeDateTo = (date: Date) => {
        updateDetails({ [EGameDetail.TO_DAY]: date });
    };

    const _changeTimeFrom = (time: string) => {
        updateDetails({ [EGameDetail.FROM_TIME]: time });
    };
    const _changeTimeTo = (time: string) => {
        updateDetails({ [EGameDetail.TO_TIME]: time });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{MEAL}</Text>
            <Card>
                <ItemDetailSwitch
                    label={COUNT_MEAL}
                    itemKey={EGameDetail.MEAL_ENABLED}
                    isEnabled={isMealEnabled}
                    toggleSwitch={_toggleSwitch}
                />
                {isMealEnabled ? (
                    <>
                        <Separator />
                        <ItemDetailIcon
                            key={EGameDetail.FROM_CITY}
                            placeholder={FROM_CITY}
                            onPress={_goToCitiesFrom}
                            value={fromCity}
                        />
                        <Separator />
                        <DatePicker
                            onChange={_changeDateFrom}
                            key={EGameDetail.FROM_DAY}
                            placeholder={FROM_DAY}
                            date={fromDay}
                        />
                        <Separator />
                        <TimePicker
                            onChange={_changeTimeFrom}
                            key={EGameDetail.FROM_TIME}
                            placeholder={FROM_TIME}
                            time={fromTime}
                        />
                        <Separator />
                        <ItemDetailIcon
                            key={EGameDetail.TO_CITY}
                            placeholder={TO_CITY}
                            onPress={_goToCitiesTo}
                            value={toCity}
                        />
                        <Separator />
                        <DatePicker
                            onChange={_changeDateTo}
                            key={EGameDetail.TO_DAY}
                            placeholder={TO_DAY}
                            date={toDay}
                        />
                        <Separator />
                        <TimePicker
                            onChange={_changeTimeTo}
                            key={EGameDetail.TO_TIME}
                            placeholder={TO_TIME}
                            time={toTime}
                        />
                    </>
                ) : null}
            </Card>
        </View>
    );
}

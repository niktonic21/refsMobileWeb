import React, { useState } from 'react';
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
import ItemDetailInput from './ItemDetailInput';
import ItemDetailSwitch from './ItemDetailSwitch';
import Separator from './Separator';
import ItemDetailIcon from './ItemDetailIcon';
import { useNavigation } from '@react-navigation/native';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';

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
    updateDetails: (data: any) => void;
}

export default function StravneDetail({ fromCity = '', toCity = '', updateDetails }: IProps) {
    const navigation = useNavigation();
    const [isMealEnabled, setIsMealEnabled] = useState(true);
    const [fromDay, setFromDay] = useState<Date>();
    const [toDay, setToDay] = useState<Date>();
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');

    const _toggleSwitch = (itemKey: string) => {
        if (EGameDetail.MEAL_ENABLED === itemKey) {
            setIsMealEnabled(!isMealEnabled);
        }
    };

    const _onSelectedFromCities = (cities: string[]) => {
        if (!toCity) {
            updateDetails({ fromCity: cities[0], toCity: cities[0] });
        } else {
            updateDetails({ fromCity: cities[0] });
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
        updateDetails({ toCity: cities[0] });
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
        setFromDay(date);
    };
    const _changeDateTo = (date: Date) => {
        setToDay(date);
    };

    const _changeTimeFrom = (time: string) => {
        setFromTime(time);
        console.log(time);
    };
    const _changeTimeTo = (time: string) => {
        setToTime(time);
        console.log(time);
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

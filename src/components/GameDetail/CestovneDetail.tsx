import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import uniq from 'lodash/uniq';
import remove from 'lodash/remove';
import { EGameDetail, getTravelInfo, IRef, stringToNumber } from '@utils';
import { TRAVEL, CAR_ID, RATE_CITY, PASSENGERS, FROM_TO, WAS_DRIVER, DISTANCE_KM } from '@strings';
import ItemDetailInput from './ItemDetailInput';
import ItemDetailSwitch from './ItemDetailSwitch';
import Separator from './Separator';
import ItemDetailIcon from './ItemDetailIcon';
import { Card } from '../Card';

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
    referees: IRef[];
    countCity?: boolean;
    refsInCar?: IRef[];
    road?: String[];
    distance?: number;
    currentRef: { auto: string; refID: string };
    updateDetails: (data: any) => void;
}

export default function CestovneDetail({
    referees,
    currentRef,
    countCity = false,
    refsInCar = [],
    road = [],
    distance: distanceProp,
    updateDetails
}: IProps) {
    const navigation = useNavigation();
    const [isDriver, setIsDriver] = useState(road.length > 0);
    const [distance, setDistance] = useState(distanceProp ? String(distanceProp) : '');
    const [car, setCar] = useState(currentRef.auto);

    useEffect(() => {
        updateDetails({ isDriver, countCity });
    }, []);

    useEffect(() => {
        distanceProp && setDistance(String(distanceProp));
    }, [distanceProp]);

    const _toggleSwitch = (itemKey: string) => {
        if (EGameDetail.IS_DRIVER === itemKey) {
            setIsDriver(!isDriver);
            return;
        }
        if (EGameDetail.COUNT_CITY === itemKey) {
            updateDetails({ [EGameDetail.COUNT_CITY]: !countCity });
        }
    };

    const _changeText = (itemKey: string, text: string) => {
        if (EGameDetail.CAR === itemKey) {
            setCar(text);
        }
        if (EGameDetail.DISTANCE === itemKey) {
            setDistance(text);
            updateDetails({ [itemKey]: stringToNumber(text) });
            return;
        }
        updateDetails({ [itemKey]: text });
    };

    const _onSelectedCities = (cities: string[]) => {
        const distance = getTravelInfo(cities) * 2;
        const travelMoney = distance * 0.2;
        setDistance(distance.toString());
        updateDetails({
            [EGameDetail.ROAD]: cities,
            [EGameDetail.DISTANCE]: distance,
            [EGameDetail.TRAVEL]: travelMoney.toFixed(2)
        });
    };
    const _goToCities = () => {
        // TODO: stop sending function here use setparaps instead
        navigation.navigate('CitiesScreen', {
            selectedCities: road,
            onSelectedCities: _onSelectedCities
        });
    };

    const _onSelectedRefsInCar = (refs: string[]) => {
        updateDetails({ [EGameDetail.REFS_IN_CAR]: refs });
    };

    const _goToGameRefList = () => {
        const otherRefs = remove([...referees], ({ id }) => id !== currentRef.refID);
        const refList = uniq(
            otherRefs.map(({ name }) => name.split(',', 2).join('')),
            false
        );
        // TODO: stop sending function here use setparams instead
        navigation.navigate('GameRefListScreen', {
            selectedRefsInCar: refsInCar,
            onSelectedRefsInCar: _onSelectedRefsInCar,
            refList: refList
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{TRAVEL}</Text>
            <Card>
                <ItemDetailSwitch
                    itemKey={EGameDetail.IS_DRIVER}
                    label={WAS_DRIVER}
                    toggleSwitch={_toggleSwitch}
                    isEnabled={isDriver}
                />
                {isDriver ? (
                    <>
                        <Separator />
                        <ItemDetailSwitch
                            itemKey={EGameDetail.COUNT_CITY}
                            isEnabled={countCity}
                            toggleSwitch={_toggleSwitch}
                            label={RATE_CITY}
                        />
                        <Separator />
                        <ItemDetailInput
                            itemKey={EGameDetail.CAR}
                            placeholder={CAR_ID}
                            onChangeText={_changeText}
                            value={car}
                        />
                        <Separator />
                        <ItemDetailIcon
                            key={EGameDetail.REFS_IN_CAR}
                            placeholder={PASSENGERS}
                            onPress={_goToGameRefList}
                            value={refsInCar.toString()}
                        />
                        <Separator />
                        <ItemDetailIcon
                            key={EGameDetail.ROAD}
                            placeholder={FROM_TO}
                            onPress={_goToCities}
                            value={road.toString()}
                        />
                        <Separator />
                        <ItemDetailInput
                            itemKey={EGameDetail.DISTANCE}
                            placeholder={DISTANCE_KM}
                            onChangeText={_changeText}
                            value={distance}
                        />
                    </>
                ) : null}
            </Card>
        </View>
    );
}

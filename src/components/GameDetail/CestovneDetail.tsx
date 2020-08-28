import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../Card';
import { EGameDetail, IGame } from '@utils';
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
    gameData: IGame;
    updateDetails: (data: any) => void;
}

export default function CestovneDetail({ gameData, updateDetails }: IProps) {
    const [isDriver, setIsDriver] = useState(false);
    const [countCity, setCountCity] = useState(false);
    const [car, setCar] = useState('KS-1000BS');
    const [refsInCar, setRefsInCar] = useState('');
    const [road, setRoad] = useState('');

    useEffect(() => {
        updateDetails({ isDriver, countCity });
    }, []);

    const _toggleSwitch = (itemKey: string) => {
        if (EGameDetail.IS_DRIVER === itemKey) {
            setIsDriver(!isDriver);
            updateDetails({ isDriver: !isDriver });
            return;
        }
        if (EGameDetail.COUNT_CITY === itemKey) {
            setCountCity(!countCity);
            updateDetails({ countCity: !countCity });
        }
    };

    const _changeText = (itemKey: string, text: string) => {
        if (EGameDetail.CAR === itemKey) {
            setCar(text);
            updateDetails({ car: text });
            return;
        }
        if (EGameDetail.REFS_IN_CAR === itemKey) {
            setRefsInCar(text);
            updateDetails({ refsInCar: text });
            return;
        }
        if (EGameDetail.ROAD === itemKey) {
            setRoad(text);
            updateDetails({ road: text });
            return;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Cestovne</Text>
            <Card>
                <ItemDetailSwitch
                    itemKey={EGameDetail.IS_DRIVER}
                    label={'Bol som vodic'}
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
                            label={'Sadzba mesto'}
                        />
                        <Separator />
                        <ItemDetailInput
                            itemKey={EGameDetail.CAR}
                            placeholder={'Spz auto'}
                            onChangeText={_changeText}
                            value={car}
                        />
                        <Separator />
                        <ItemDetailInput
                            itemKey={EGameDetail.REFS_IN_CAR}
                            placeholder={'Spolucestujuci'}
                            onChangeText={_changeText}
                            value={refsInCar}
                        />
                        <Separator />
                        <ItemDetailInput
                            itemKey={EGameDetail.ROAD}
                            placeholder={'Odkial a kam'}
                            onChangeText={_changeText}
                            value={road}
                        />
                    </>
                ) : null}
            </Card>
        </View>
    );
}

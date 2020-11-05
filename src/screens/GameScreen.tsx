import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import ZapasDetail from '../components/GameDetail/ZapasDetail';
import StravneDetail from '../components/GameDetail/StravneDetail';
import CestovneDetail from '../components/GameDetail/CestovneDetail';
import OstatneDetail from '../components/GameDetail/OstatneDetail';
import PeniazeDetail from '../components/GameDetail/PeniazeDetail';
import { Button } from 'react-native-paper';
import { SAVE_CHANGES } from '@strings';
import { getCitiesList, getCityObject, getDistance } from '@utils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    contentContainer: {
        maxWidth: 800,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingVertical: 15
    },
    button: { marginHorizontal: 15 }
});

interface IGameDetail {}

export default function GameScreen({ navigation, route }: any) {
    let gameDetailsData = {};
    const dispatch = useDispatch();
    // const [gameDetailsData, setGameDetailsData] = useState({});
    const gameData = get(route, 'params.item', null);
    const isBilling = get(route, 'params.isBilling', null);

    const _updateDetails = (data: IGameDetail) => {
        gameDetailsData = { ...gameDetailsData, ...data };
        console.log('_updateDetails', gameDetailsData);
        //setGameDetailsData({ ...gameDetailsData, ...data });
        //dispatch(saveGameData(gameData.gameId));
    };

    const _saveChanges = () => {
        const lists = getCitiesList();
        const cityObject = getCityObject('KOŠICE');
        const distance = getDistance(cityObject, 'MISKOLC');
        console.log('KM', lists, cityObject, distance);
        //console.log('saveBilling', gameData.gameId);
        //dispatch(saveGameData(gameData.gameId));
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <ZapasDetail gameData={gameData} isBilling={isBilling} updateDetails={_updateDetails} />
            {isBilling ? (
                <>
                    <StravneDetail gameData={gameData} updateDetails={_updateDetails} />
                    <CestovneDetail
                        navigation={navigation}
                        gameData={gameData}
                        updateDetails={_updateDetails}
                    />
                    <OstatneDetail updateDetails={_updateDetails} />
                    <PeniazeDetail updateDetails={_updateDetails} />
                    <Button style={styles.button} mode="contained" onPress={_saveChanges}>
                        {SAVE_CHANGES}
                    </Button>
                </>
            ) : null}
        </ScrollView>
    );
}

import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import ZapasDetail, { IRefWithType } from '../components/GameDetail/ZapasDetail';
import StravneDetail from '../components/GameDetail/StravneDetail';
import CestovneDetail from '../components/GameDetail/CestovneDetail';
import OstatneDetail from '../components/GameDetail/OstatneDetail';
import PeniazeDetail from '../components/GameDetail/PeniazeDetail';
import { Button } from 'react-native-paper';
import { SAVE_CHANGES } from '@strings';
import { EGameDetail, getCurrentRef, getGameData, getGameRate, IRef, stringToNumber } from '@utils';
import { useDispatch, useSelector } from 'react-redux';
import { getGameById, saveGame } from '@actions';

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

const getcurrentRefGameType = (name: string, gameRefs: IRefWithType[] = []): string => {
    let ref = gameRefs.find(ref => ref.name == name.split(',', 2).join());
    return ref?.refType || EGameDetail.H1;
};
export interface IGameDetail {
    gameId: string;
    fromDay?: Date;
    fromTime?: string;
    toDay?: Date;
    toTime?: string;
    countCity?: boolean;
    refsInCar?: IRef[];
    road?: String[];
    distance?: number;
    travelMoney?: number;
    mealMoney?: number;
    rateMoney?: number;
    rateCityMoney?: number;
    nightMoney?: number;
    postMoney?: number;
    otherMoney?: number;
    togetherMoney?: number;
    refs?: IRefWithType[];
    fromCity?: string;
    toCity?: string;
    playedBefore?: boolean;
    played?: boolean;
    isSecondGame?: boolean;
    isRepeatedGame?: boolean;
    secondGame?: string;
    notes?: string;
}

export default function GameScreen({ route }: any) {
    const dispatch = useDispatch();

    const gameId = get(route, 'params.gameId', '');
    const gameData = getGameData(gameId);
    const isBilling = get(route, 'params.isBilling', null);
    const currentRef = getCurrentRef(gameData.referees);
    const currentSeason = useSelector(state => get(state, 'auth.profile.season', '20192020'));
    const gameUserData = useSelector(state =>
        get(state, `userGames.seasons.${currentSeason}.${gameId}`, {})
    );
    const [gameDetailsData, setGameDetailsData] = useState<IGameDetail>(gameUserData);

    console.log('gameLocalData', gameData, gameDetailsData);
    console.log('gameReduxData', gameUserData);

    // download latest data from server
    useEffect(() => {
        isBilling && dispatch(getGameById(gameId));
    }, []);

    useEffect(() => {
        !isEmpty(gameUserData) &&
            setGameDetailsData(prevState => ({ ...gameUserData, ...prevState }));
    }, [gameUserData]);

    const _updateDetails = (data: IGameDetail) => {
        setGameDetailsData(prevState => ({ ...prevState, ...data }));
    };

    const _saveChanges = () => {
        dispatch(saveGame(gameDetailsData));
    };

    const currentRefGameType = getcurrentRefGameType(currentRef.name, gameDetailsData?.refs);
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <ZapasDetail
                gameData={gameData}
                played={gameDetailsData?.played}
                playedBefore={gameDetailsData?.playedBefore}
                isBilling={isBilling}
                updateDetails={_updateDetails}
            />
            {isBilling ? (
                <>
                    <StravneDetail
                        fromCity={gameDetailsData.fromCity}
                        toCity={gameDetailsData.toCity}
                        fromDay={gameDetailsData.fromDay}
                        fromTime={gameDetailsData.fromTime}
                        toDay={gameDetailsData.toDay}
                        toTime={gameDetailsData.toTime}
                        updateDetails={_updateDetails}
                    />
                    <CestovneDetail
                        referees={gameData.referees}
                        countCity={gameDetailsData.countCity}
                        refsInCar={gameDetailsData.refsInCar}
                        road={gameDetailsData.road}
                        distance={gameDetailsData.distance}
                        currentRef={currentRef}
                        updateDetails={_updateDetails}
                    />
                    <OstatneDetail
                        updateDetails={_updateDetails}
                        isSecondGame={gameDetailsData.isSecondGame}
                        isRepeatedGame={gameDetailsData.isRepeatedGame}
                        secondGame={gameDetailsData.secondGame}
                        notes={gameDetailsData.notes}
                    />
                    <PeniazeDetail
                        rateMoney={getGameRate(
                            currentRefGameType,
                            stringToNumber(gameId),
                            gameData.subligue,
                            gameDetailsData.playedBefore
                        )}
                        countCity={gameDetailsData.countCity}
                        rateCityMoney={gameDetailsData.rateCityMoney}
                        nightMoney={gameDetailsData.nightMoney}
                        postMoney={gameDetailsData.postMoney}
                        otherMoney={gameDetailsData.otherMoney}
                        travelMoney={gameDetailsData.travelMoney}
                        mealMoney={gameDetailsData.mealMoney}
                        updateDetails={_updateDetails}
                    />
                    <Button style={styles.button} mode="contained" onPress={_saveChanges}>
                        {SAVE_CHANGES}
                    </Button>
                </>
            ) : null}
        </ScrollView>
    );
}

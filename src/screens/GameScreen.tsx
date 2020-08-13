import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import get from 'lodash/get';
import ZapasDetail from '../components/GameDetail/ZapasDetail';
import CestovneDetail from '../components/GameDetail/CestovneDetail';
import OstatneDetail from '../components/GameDetail/OstatneDetail';
import PeniazeDetail from '../components/GameDetail/PeniazeDetail';

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
    }
});

export default function GameScreen({ navigation, route }: any) {
    const gameData = get(route, 'params.item', null);
    console.log('gameData', gameData);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <ZapasDetail gameData={gameData} />
            <CestovneDetail gameData={gameData} />
            <OstatneDetail />
            <PeniazeDetail />
        </ScrollView>
    );
}

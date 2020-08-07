import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import get from 'lodash/get';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    contentContainer: {
        paddingTop: 15
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1
    }
});

export default function GameScreen({ navigation, route }) {
    const gameId = get(route, 'params.gameId', null);
    const gameData = get(route, 'params.gameId', null);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.optionText}>game: {gameId}</Text>
        </ScrollView>
    );
}

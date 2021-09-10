import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SectionListData, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import {
    createBillingSections,
    createGameSections,
    filterGameSections,
    getRefList,
    IGame
} from '@utils';
import { RefsModal } from '../components/RefsModal';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    contentContainer: {
        maxWidth: 800,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 15,
        paddingHorizontal: 8
    },
    refText: {
        fontSize: 28,
        flex: 1,
        textAlign: 'center',
        padding: 4
    },
    headerText: {
        fontSize: 26,
        paddingHorizontal: 8,
        paddingBottom: 5
    },
    touchContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 10
    },
    monthContainer: {
        backgroundColor: '#fff',
        marginTop: 15,
        padding: 8,
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed'
    },
    rowHeader: {
        fontSize: 24,
        paddingVertical: 8,
        fontWeight: '500',
        fontStyle: 'italic'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        alignItems: 'center',
        height: 40
    },
    rowTitle: {
        fontSize: 18
    },
    numText: {
        fontSize: 18,
        fontWeight: '500'
    }
});

const StatRow = ({ title, num }): JSX.Element => (
    <View key={`${title}_${num}`} style={styles.rowContainer}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.numText}>{num}</Text>
    </View>
);

export default function StatsScreen() {
    const refId: string = useSelector(state => get(state, 'auth.profile.refID', ''));
    const games = useSelector(state => get(state, 'games.games', []));
    const refs = getRefList();
    const [selectedRefID, setSelectedRefID] = useState(refId);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const selectedRef = refs.find(({ value }) => value === selectedRefID);
    const billingSections: Array<SectionListData<any>> = createBillingSections(
        games,
        selectedRefID
    );
    const gameSections = createGameSections(games);
    const filteredGameSections: SectionListData<IGame>[] = filterGameSections(gameSections, {
        liga: 0,
        mesiac: 0,
        rozhodca: selectedRefID
    });
    const numOfAllGames = billingSections.reduce((sum, { data }) => sum + data.length, 0);

    useEffect(() => {
        setSelectedRefID(refId);
    }, [refId]);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <RefsModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSelected={newRefId => setSelectedRefID(newRefId)}
                currentRefId={selectedRefID}
            />
            <View>
                <TouchableOpacity
                    style={styles.touchContainer}
                    onPress={() => setIsModalVisible(true)}
                >
                    <Text style={styles.refText}>{selectedRef?.label}</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>ZÁPASY SPOLU: {numOfAllGames}</Text>
            </View>
            <View style={styles.monthContainer}>
                <Text style={styles.rowHeader}>MESIACE</Text>
                {billingSections.map(({ title, data }) => (
                    <StatRow title={title} num={data.length} />
                ))}
            </View>
            <View style={styles.monthContainer}>
                <Text style={styles.rowHeader}>LIGY</Text>
                {filteredGameSections.map(({ title, data }) => (
                    <StatRow title={title} num={data.length} />
                ))}
            </View>
        </ScrollView>
    );
}

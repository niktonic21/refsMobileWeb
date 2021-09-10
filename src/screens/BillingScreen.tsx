import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SectionList,
    SectionListData,
    TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { createBillingSections } from '@utils';
import { IItemButton } from '../utils/types';
import ScreenContainer from '../components/ScreenContainer';
import SectionHeader from '../components/SectionHeader';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    contentContainer: {
        paddingTop: 0,
        paddingBottom: 15
    },
    pdfContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pdfText: {
        fontSize: 16,
        marginTop: 1
    },
    option: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1
    },
    loginText: {
        textDecorationLine: 'underline',
        textAlign: 'center',
        fontSize: 22
    },
    loginContainer: {
        flex: 1,
        margin: 15,
        justifyContent: 'center'
    },
    refText: {
        fontSize: 13,
        alignSelf: 'flex-start',
        margin: 2
    },
    separatorItem: { width: 1, alignSelf: 'stretch', backgroundColor: 'grey' },
    separator: { height: 10, alignSelf: 'stretch' },
    noMatches: {
        alignSelf: 'center',
        margin: 15,
        marginTop: 100,
        fontSize: 18,
        fontWeight: '700'
    },
    matchInfo: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    refsContainer: { flex: 2, paddingLeft: 4, flexDirection: 'column' }
});

const _renderSeparator = () => <View style={styles.separator} />;

const _keyExtractor = (item: { gameId: string }) => item.gameId;

const _renderEmptyListItem = () => <Text style={styles.noMatches}>Žiadne zápasy</Text>;

export default function BillingScreen({ navigation }) {
    const refId: string = useSelector(state => get(state, 'auth.profile.refID', ''));
    const games = useSelector(state => get(state, 'games.games', []));
    const billingSections: Array<SectionListData<any>> = createBillingSections(games, refId);

    const _onPDFPress = (data: any) => {
        const idList = data.map(({ gameId }) => gameId);
        navigation.navigate('PDFScreen', { gameId: idList.join('-') });
    };

    const _renderSectionHeader = ({ section }: any) => (
        <SectionHeader
            section={section}
            buttonLabel="PDF"
            onPress={() => _onPDFPress(section.data)}
        />
    );

    const _renderItem = ({ item }: IItemButton) => {
        const { home, away, gameId, ligue, day, time, date } = item;

        const _onPress = () => {
            navigation.navigate('GameScreen', { gameId: gameId, isBilling: true });
        };

        return (
            <ScreenContainer>
                <View style={styles.option} key={gameId}>
                    <TouchableOpacity style={styles.matchInfo} onPress={_onPress}>
                        <Text style={styles.optionText}>{ligue}</Text>
                        <Text style={styles.optionText}>{home}</Text>
                        <Text style={styles.optionText}>{away}</Text>
                        <Text style={styles.optionText}>
                            {date} o {time}, {day}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScreenContainer>
        );
    };

    return (
        <View style={styles.container}>
            <SectionList
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                sections={billingSections}
                keyExtractor={_keyExtractor}
                ListEmptyComponent={_renderEmptyListItem}
                stickySectionHeadersEnabled={true}
                renderItem={_renderItem}
                renderSectionHeader={_renderSectionHeader}
                ItemSeparatorComponent={_renderSeparator}
                SectionSeparatorComponent={_renderSeparator}
            />
        </View>
    );
}

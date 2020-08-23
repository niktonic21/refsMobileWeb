import * as React from 'react';
import { StyleSheet, Text, View, SectionList, SectionListData } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { createBillingSections } from '@utils';
import { IItemButton, IGame } from '../utils/types';

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
    separatorItem: { width: 1, alignSelf: 'stretch', backgroundColor: 'red' },
    separator: { height: 10, alignSelf: 'stretch' },
    sectionHeader: {
        height: 35,
        flex: 1,
        paddingHorizontal: 17,
        justifyContent: 'center',
        backgroundColor: '#ccc'
    },
    sectionText: {
        fontSize: 18,
        fontWeight: '700'
    },
    noMatches: {
        alignSelf: 'center',
        margin: 15,
        marginTop: 100,
        fontSize: 18,
        fontWeight: '700'
    },
    matchInfo: { flex: 3, flexDirection: 'column', justifyContent: 'space-between' },
    refsContainer: { flex: 2, paddingLeft: 4, flexDirection: 'column' }
});

const _renderSectionHeader = ({ section }: any) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionText}>
            {section.title} ({section.data.length})
        </Text>
    </View>
);

const _renderSeparator = () => <View style={styles.separator} />;

const _keyExtractor = (item: { gameId: string }) => item.gameId;

const _renderEmptyListItem = () => <Text style={styles.noMatches}>Ziadne zapasy</Text>;

export default function BillingScreen({ navigation }) {
    const isLoggedId = useSelector<{ auth: { loggedIn: boolean } }>(state => state.auth.loggedIn);
    const userId = 'jobbagymartinmgr';
    console.log('aaa_Logged_in', isLoggedId);
    const games = useSelector(state => get(state, 'games.games', []));
    const billingSections: Array<SectionListData<any>> = createBillingSections(games, userId);

    const _goToLogin = () => {
        navigation.navigate('Profil');
    };

    const _renderItem = ({ item }: IItemButton) => {
        const { home, away, gameId, ligue, day, time, date } = item;

        const _onPress = () => {
            navigation.navigate('GameScreen', { gameId: gameId, item: item, isBilling: true });
        };

        return (
            <RectButton key={gameId} style={styles.option} onPress={_onPress}>
                <View style={styles.matchInfo}>
                    <Text style={styles.optionText}>{ligue}</Text>
                    <Text style={styles.optionText}>{home}</Text>
                    <Text style={styles.optionText}>{away}</Text>
                    <Text style={styles.optionText}>
                        {date} o {time}, {day}
                    </Text>
                </View>
            </RectButton>
        );
    };

    return (
        <View style={styles.container}>
            {!isLoggedId ? (
                <View style={styles.loginContainer}>
                    <Text onPress={_goToLogin} style={styles.loginText}>
                        Na vytvaranie vyuctovani musis byt prihlaseny
                    </Text>
                </View>
            ) : (
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
            )}
        </View>
    );
}

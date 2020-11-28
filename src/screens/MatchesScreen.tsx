import * as React from 'react';
import { StyleSheet, Text, View, SectionList, SectionListData } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { createGameSections, filterGameSections } from '../utils/gameUtils';
import { IItemButton, IGame } from '../utils/types';
import FilterButtons from '../components/FilterButtons';
import { FilterModal } from '../components/FilterModal';
import ScreenContainer from '../components/ScreenContainer';
import SectionHeader from '../components/SectionHeader';

const styles = StyleSheet.create({
    container: {
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
    refText: {
        fontSize: 13,
        alignSelf: 'flex-start',
        margin: 2
    },
    separatorItem: { width: 1, alignSelf: 'stretch', backgroundColor: 'grey' },
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

const _renderSectionHeader = ({ section }: any) => <SectionHeader section={section} />;

const _renderSeparator = () => <View style={styles.separator} />;

const _keyExtractor = (item: { gameId: string }) => item.gameId;

export default function MatchesScreen({ navigation }) {
    const [modalKey, setModalKey] = React.useState('');
    const games = useSelector(state => get(state, 'games.games', []));
    const filterData = useSelector(state => get(state, 'filter', []));
    const gameSections: Array<SectionListData<any>> = createGameSections(games);
    const filteredGameSections: Array<SectionListData<IGame>> = filterGameSections(
        gameSections,
        filterData
    );

    const _onFilterButtonPresed = (filterKey: string) => {
        if (modalKey === filterKey) {
            setModalKey('');
        } else {
            setModalKey(filterKey);
        }
    };

    const _renderItem = ({ item }: IItemButton) => {
        const { home, away, gameId, date, day, time, stadium, referees } = item;

        const _onPress = () => {
            navigation.navigate('GameScreen', { gameId: gameId });
        };

        return (
            <ScreenContainer>
                <RectButton key={gameId} style={styles.option} onPress={_onPress}>
                    <View style={styles.matchInfo}>
                        <Text style={styles.optionText}>{home}</Text>
                        <Text style={styles.optionText}>{away}</Text>
                        <Text style={styles.optionText}>
                            {day} {date}
                        </Text>
                        <Text style={styles.optionText}>
                            {stadium} {time}
                        </Text>
                    </View>
                    <View style={styles.separatorItem} />
                    <View style={styles.refsContainer}>
                        {referees
                            ? referees.map((ref, idx) => (
                                  <Text
                                      key={idx}
                                      numberOfLines={1}
                                      ellipsizeMode="tail"
                                      style={styles.refText}
                                  >
                                      {ref.name.split(',', 2)}
                                  </Text>
                              ))
                            : null}
                    </View>
                </RectButton>
            </ScreenContainer>
        );
    };

    return (
        <View style={styles.container}>
            <FilterModal
                gameSections={gameSections}
                isVisible={Boolean(modalKey)}
                onClose={_onFilterButtonPresed}
                filterKey={modalKey}
            />
            <FilterButtons onPress={_onFilterButtonPresed} />
            {filteredGameSections.length ? (
                <SectionList
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    sections={filteredGameSections}
                    keyExtractor={_keyExtractor}
                    ListEmptyComponent={() => null}
                    stickySectionHeadersEnabled={true}
                    renderItem={_renderItem}
                    renderSectionHeader={_renderSectionHeader}
                    ItemSeparatorComponent={_renderSeparator}
                    SectionSeparatorComponent={_renderSeparator}
                />
            ) : (
                <Text style={styles.noMatches}>Ziadne zapasy</Text>
            )}
        </View>
    );
}

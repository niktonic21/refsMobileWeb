import * as React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { createGameSections } from '../utils/gameUtils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    contentContainer: {
        paddingTop: 0
    },
    optionIconContainer: {
        marginRight: 12
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
    separatorItem: { width: 1, alignSelf: 'stretch', backgroundColor: 'red' },
    separator: { height: 10, alignSelf: 'stretch' },
    sectionHeader: {
        height: 35,
        flex: 1,
        marginBottom: 10,
        paddingHorizontal: 17,
        justifyContent: 'center',
        backgroundColor: 'grey'
    },
    sectionText: {
        fontSize: 18,
        fontWeight: '700'
    }
});

interface IRef {
    id: number;
    name: string;
}

interface IItemButton {
    item: {
        home: string;
        away: string;
        external_id: string;
        game_date: string;
        referees: Array<IRef>;
    };
}

const _renderItem = ({ item }: IItemButton) => {
    const { home, away, external_id, game_date, referees } = item;
    const datTime = game_date.split(' ');
    const _onPress = () => {
        console.log('tap', external_id);
    };
    return (
        <RectButton key={game_date} style={styles.option} onPress={_onPress}>
            <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-between' }}>
                <Text style={styles.optionText}>{home}</Text>
                <Text style={styles.optionText}>{away}</Text>
                <Text style={styles.optionText}>{datTime[0]}</Text>
                <Text style={styles.optionText}>{datTime[1]}</Text>
            </View>
            <View style={styles.separatorItem} />
            <View style={{ flex: 2, paddingLeft: 4, flexDirection: 'column' }}>
                {referees.map((ref, idx) => (
                    <Text key={idx} numberOfLines={1} ellipsizeMode="tail" style={styles.refText}>
                        {ref.name.split(',', 2)}
                    </Text>
                ))}
            </View>
        </RectButton>
    );
};

const _renderSectionHeader = ({ section }: { section: { title: string } }) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionText}>{section.title}</Text>
    </View>
);

const _renderSeparator = () => <View style={styles.separator} />;

export default function MatchesScreen() {
    const games = useSelector(state => get(state, 'games.games', []));
    const gameSections = createGameSections(games);

    return (
        <SectionList
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            sections={gameSections}
            keyExtractor={item => String(item.external_id)}
            ListEmptyComponent={() => null}
            stickySectionHeadersEnabled={true}
            renderItem={_renderItem}
            renderSectionHeader={_renderSectionHeader}
            ItemSeparatorComponent={_renderSeparator}
        />
    );
}

import * as React from 'react';
import { StyleSheet, Text, View, SectionList, SectionListData } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { createGameSections } from '../utils/gameUtils';
import { IItemButton } from '../utils/types';
import FilterButtons from '../components/FilterButtons';
import { Modal } from '@Modal';

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
        backgroundColor: '#ccc'
    },
    sectionText: {
        fontSize: 18,
        fontWeight: '700'
    },
    //aaaaa
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    }
});

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

const _renderSectionHeader = ({ section }: any) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionText}>
            {section.title} {section.data.length}
        </Text>
    </View>
);

const _renderSeparator = () => <View style={styles.separator} />;

export default function MatchesScreen() {
    //const [modalVisible, setModalVisible] = React.useState(true);
    const games = useSelector(state => get(state, 'games.games', []));
    const gameSections: Array<SectionListData<any>> = createGameSections(games);

    return (
        <View style={styles.container}>
            <Modal />
            <FilterButtons />
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
        </View>
    );
}

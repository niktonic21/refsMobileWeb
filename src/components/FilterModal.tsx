import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal } from '@Modal';
import get from 'lodash/get';
import { getRefList, getLigueList, getMonthList } from '../utils/gameUtils';
import { FlatList } from 'react-native-gesture-handler';
import { RadioButton } from './RadioButton';
import { useDispatch, useSelector } from 'react-redux';
import { filterChanged } from '../redux/actions';
import { ISection } from 'src/utils/types';

const dataMesiac = [
    { label: 'Vsetky', key: 'mesiac', value: 0 },
    { label: 'Januar', key: 'mesiac', value: 1 },
    { label: 'Februar', key: 'mesiac', value: 2 },
    { label: 'Marec', key: 'mesiac', value: 3 }
];

const dataRozhodca = [
    { label: 'Vsetci', key: 'rozhodca', value: 0 },
    { label: 'Jobbagy', key: 'rozhodca', value: 1 },
    { label: 'Bogdan', key: 'rozhodca', value: 2 },
    { label: 'Korba', key: 'rozhodca', value: 3 }
];

const dataLiga = [
    { label: 'Vsetky', key: 'liga', value: 0 },
    { label: 'Extraliga', key: 'liga', value: 1 },
    { label: '1.liga', key: 'liga', value: 2 },
    { label: '2.liga', key: 'liga', value: 3 }
];

const styles = StyleSheet.create({
    separator: {
        height: 1,
        marginLeft: 15,
        alignSelf: 'stretch',
        backgroundColor: 'grey'
    }
});

const getFilterList = (label: string, games: ISection): Array<object> => {
    if (label === 'Rozhodca') {
        return getRefList();
    }
    if (label === 'Mesiac') {
        return getMonthList();
    }
    return getLigueList(games);
};

const _renderSeparator = () => <View style={styles.separator} />;
const _keyExtractor = (item: any) => item.label;

interface IProps {
    filterKey: string;
    gameSections: ISection;
    onClose: (label: string) => void;
    isVisible: boolean;
}

const FilterModal: React.FC<IProps> = ({ isVisible, filterKey, onClose, gameSections }) => {
    const dispatch = useDispatch();
    const filterData = useSelector(state => get(state, 'filter', []));
    const data = getFilterList(filterKey, gameSections);

    const _renderItem = ({ item }: any): JSX.Element => {
        const _onCheck = () => {
            dispatch(filterChanged(item.key, item.value));
        };

        const checked = item.value === filterData[filterKey.toLocaleLowerCase()];

        return <RadioButton checked={checked} label={item.label} onPress={_onCheck} />;
    };

    return (
        <Modal isVisible={isVisible} label={filterKey} onClose={onClose}>
            <FlatList
                data={data}
                initialNumToRender={10}
                windowSize={20}
                ItemSeparatorComponent={_renderSeparator}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
            />
        </Modal>
    );
};

export { FilterModal };

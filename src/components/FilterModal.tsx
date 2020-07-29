import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal } from '@Modal';
import { FlatList } from 'react-native-gesture-handler';
import { RadioButton } from './RadioButton';

const styles = StyleSheet.create({
    separator: {
        height: 1,
        marginLeft: 15,
        alignSelf: 'stretch',
        backgroundColor: 'grey'
    }
});

const dataMesiac = [
    { label: 'Vsetky', key: 'Mesiac', value: 0 },
    { label: 'Januar', key: 'Mesiac', value: 1 },
    { label: 'Februar', key: 'Mesiac', value: 2 },
    { label: 'Marec', key: 'Mesiac', value: 3 }
];

const dataRozhodca = [
    { label: 'Vsetci', key: 'Rozhodca', value: 0 },
    { label: 'Jobbagy', key: 'Rozhodca', value: 1 },
    { label: 'Bogdan', key: 'Rozhodca', value: 2 },
    { label: 'Korba', key: 'Rozhodca', value: 3 }
];

const dataLiga = [
    { label: 'Vsetky', key: 'Liga', value: 0 },
    { label: 'Extraliga', key: 'Liga', value: 1 },
    { label: '1.liga', key: 'Liga', value: 2 },
    { label: '2.liga', key: 'Liga', value: 3 }
];

const getFilterList = (label: string): Array<object> => {
    if (label === 'Rozhodca') {
        return dataRozhodca;
    }
    if (label === 'Mesiac') {
        return dataMesiac;
    }
    return dataLiga;
};

const FilterModal: React.FC<{ label: string; onClose: (label: string) => void }> = ({
    label,
    onClose
}) => {
    const _renderItem = ({ item }: any): JSX.Element => {
        const checked = item.value === 2;
        return (
            <RadioButton
                checked={checked}
                label={item.label}
                value={item.value}
                sortKey={item.key}
                onCheck={() => console.log('radioButton_tapped')}
            />
        );
    };

    const _renderSeparator = () => <View style={styles.separator} />;
    const _keyExtractor = (item: any) => item.label;
    const data = getFilterList(label);

    return (
        <Modal isVisible={true} label={label} onClose={onClose}>
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

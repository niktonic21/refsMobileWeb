import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal } from '@Modal';
import { getRefList } from '../utils/gameUtils';
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
const _renderSeparator = () => <View style={styles.separator} />;
const _keyExtractor = (item: any) => item.label;

interface IProps {
    currentRefId: string;
    onSelected: (label: string) => void;
    onClose: () => void;
    isVisible: boolean;
}

export const RefsModal: React.FC<IProps> = ({ isVisible, currentRefId, onClose, onSelected }) => {
    const data = getRefList();

    const _renderItem = ({ item }: any): JSX.Element => {
        const _onCheck = () => {
            onSelected(item.value);
            onClose();
        };

        const checked = item.value === currentRefId;

        return <RadioButton checked={checked} label={item.label} onPress={_onCheck} />;
    };

    return (
        <Modal isVisible={isVisible} label={'Rozhodcovia'} onClose={onClose}>
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

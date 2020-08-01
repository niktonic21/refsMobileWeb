import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { layout } from '@layout';
import { IModal } from './index';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';

const styles = StyleSheet.create({
    modalView: { justifyContent: 'flex-end', margin: 0 },
    centerdView: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 0,
        height: layout.window.height * 0.85
    },
    separator: {
        height: 1,
        backgroundColor: 'grey'
    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 15,
        textAlign: 'center'
    }
});

const ModalMobile: React.FC<IModal> = ({ isVisible, onClose, label, children }) => {
    const _onClose = () => {
        onClose(label);
    };

    return (
        <Modal isVisible={isVisible} onBackdropPress={_onClose} style={styles.modalView}>
            <SafeAreaView style={styles.centerdView}>
                <Text style={styles.modalText}>{label}</Text>
                <View style={styles.separator} />
                {children}
                <View style={styles.separator} />
                <Button title="OK" onPress={_onClose} />
            </SafeAreaView>
        </Modal>
    );
};

export { ModalMobile };

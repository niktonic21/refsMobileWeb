import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Modal from 'modal-enhanced-react-native-web';
import { IModal } from './index';
import { layout } from '@layout';

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        alignSelf: 'center',
        maxWidth: 500,
        width: layout.window.width - 30,
        alignItems: 'stretch',
        maxHeight: 800,
        backgroundColor: 'white',
        borderRadius: 20
    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 15,
        textAlign: 'center'
    },
    saveButton: {
        padding: 15
    },
    separator: {
        height: 1,
        backgroundColor: 'grey'
    }
});

const ModalWeb: React.FC<IModal> = ({ onClose, isVisible, label, children }) => {
    const _onClose = () => {
        onClose(label);
    };

    return (
        <Modal
            animationInTiming={0.1}
            animationOutTiming={0.1}
            isVisible={isVisible}
            onBackdropPress={_onClose}
        >
            <View style={styles.modalView}>
                <Text style={styles.modalText}>{label}</Text>
                <View style={styles.separator} />
                {children}
                <View style={styles.separator} />
                <View style={styles.saveButton}>
                    <Button title="Ok" onPress={_onClose} />
                </View>
            </View>
        </Modal>
    );
};

export { ModalWeb };

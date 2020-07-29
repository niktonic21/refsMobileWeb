import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Modal from 'modal-enhanced-react-native-web';
import { IModal } from './index';

const styles = StyleSheet.create({
    centeredView: {
        flex: 1
    },
    modalView: {
        flex: 1,
        alignSelf: 'center',
        width: 400,
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

const ModalWeb: React.FC<IModal> = ({ onClose, isVisible = true, label = 'Modal', children }) => {
    return (
        <Modal isVisible={isVisible} onBackdropPress={() => onClose(label)}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>{label}</Text>
                <View style={styles.separator} />
                {children}
                <View style={styles.separator} />
                <View style={styles.saveButton}>
                    <Button title="Uloz" onPress={() => {}} />
                </View>
            </View>
        </Modal>
    );
};

export { ModalWeb };

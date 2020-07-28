import * as React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { layout } from '@layout';

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)'
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        width: layout.window.width,
        height: layout.window.height * 0.85,
        elevation: 5
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        flex: 1,
        marginBottom: 15,
        textAlign: 'center'
    }
});

const ModalMobile = ({ onClose, isVisible = false, label = 'HEADER', children }) => {
    return (
        <Modal visible={isVisible} transparent={true} animationType="slide">
            <TouchableOpacity style={styles.centeredView} onPress={onClose}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{label}</Text>
                    {children}
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export { ModalMobile };

import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Modal from 'modal-enhanced-react-native-web';
import { layout } from '@layout';

import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        maxWidth: 800,
        width: layout.window.width,
        height: layout.window.height * 0.85,
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

const ModalWeb = ({ isVisible = true, onClose, label = 'lable', children }) => {
    return (
        <Modal isVisible={isVisible}>
            <TouchableOpacity onPress={onClose} style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{label}</Text>
                    {children}
                </View>
                <Button title="Hide modal" onPress={() => {}} />
            </TouchableOpacity>
        </Modal>
    );
};

export { ModalWeb };

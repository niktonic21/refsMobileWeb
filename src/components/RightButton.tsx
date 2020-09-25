import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        marginRight: 16
    },
    buttonText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1
    }
});

interface IProps {
    label: string;
    onPress: () => void;
}

export default function RightButton({ label, onPress }: IProps) {
    return (
        <RectButton style={styles.container} onPress={onPress}>
            <View>
                <Text style={styles.buttonText}>{label}</Text>
            </View>
        </RectButton>
    );
}

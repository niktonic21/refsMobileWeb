import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    separator: {
        height: 1,
        flex: 1,
        backgroundColor: '#aaa'
    }
});

export default function Separator() {
    return <View style={styles.separator} />;
}

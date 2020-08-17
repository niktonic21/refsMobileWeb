import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#aaa'
    }
});

export default function Separator() {
    return <View style={styles.separator} />;
}

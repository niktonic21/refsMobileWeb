import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    contentContainer: {
        paddingTop: 15
    }
});

export default function FilterScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View>
                <Text>AAAA</Text>
                <Text>AAAA</Text>
                <Text>AAAA</Text>
                <Text>AAAA</Text>
            </View>
        </ScrollView>
    );
}

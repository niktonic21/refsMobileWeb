import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from './ScreenContainer';

const styles = StyleSheet.create({
    sectionHeader: {
        height: 32,
        flex: 1,
        paddingHorizontal: 17,
        justifyContent: 'center',
        backgroundColor: '#ccc'
    },
    sectionText: {
        fontSize: 18,
        lineHeight: 32,
        justifyContent: 'center',
        fontWeight: '700'
    }
});

interface IProps {
    section: {
        title: string;
        data: { length: number };
    };
}

export default function SectionHeader({ section }: IProps) {
    return (
        <View style={styles.sectionHeader}>
            <ScreenContainer>
                <Text style={styles.sectionText}>
                    {section.title} ({section.data.length})
                </Text>
            </ScreenContainer>
        </View>
    );
}

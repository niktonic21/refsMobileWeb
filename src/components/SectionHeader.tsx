import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ScreenContainer from './ScreenContainer';

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
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
    onPress?: () => void;
    buttonLabel?: string;
}

export default function SectionHeader({ section, onPress, buttonLabel }: IProps) {
    return (
        <View style={styles.sectionHeader}>
            <ScreenContainer>
                <View style={styles.headerContainer}>
                    <Text style={styles.sectionText}>
                        {section.title} ({section.data.length})
                    </Text>
                    {buttonLabel ? (
                        <TouchableOpacity onPress={onPress}>
                            <Text style={styles.sectionText}>{buttonLabel}</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </ScreenContainer>
        </View>
    );
}

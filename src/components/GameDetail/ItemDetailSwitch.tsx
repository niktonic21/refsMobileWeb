import * as React from 'react';
import { StyleSheet, Text, Switch, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8
    },
    labelText: {
        fontSize: 18
    }
});

interface IProps {
    itemKey?: string;
    isEnabled: boolean;
    label: string;
    toggleSwitch?: (itemKey: string) => void;
}

export default function ItemDetailSwitch({
    itemKey,
    label,
    isEnabled = true,
    toggleSwitch
}: IProps) {
    const _toggleSwitch = () => {
        if (!toggleSwitch || !itemKey) return;
        toggleSwitch(itemKey);
    };

    return (
        <View style={styles.container}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.labelText}>
                {label}
            </Text>
            <Switch
                //trackColor={{ false: '#767577', true: '#81b0ff' }}
                //thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                //ios_backgroundColor="#3e3e3e"
                onValueChange={_toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
}

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SEASON } from '@strings';

export const seasonsPickerData = [
    {
        label: '2021/2022',
        value: '20212022'
    },
    {
        label: '2020/2021',
        value: '20202021'
    },
    {
        label: '2019/2020',
        value: '20192020'
    }
];

const styles = StyleSheet.create({
    container: {
        paddingTop: 18,
        alignItems: 'center'
    },
    placeholderText: {
        color: '#111',
        fontSize: 16,
        marginBottom: 5
    },
    labelText: { paddingLeft: 10, fontSize: 18 },
    dropDownWrapper: {
        height: 105,
        flexDirection: 'row'
    },
    containerSize: { height: 40, width: 160 },
    itemStyle: { justifyContent: 'flex-start' }
});

interface IPicker {
    label: string;
    value: string;
}

interface IProps {
    saveSeason: (season: string) => void;
    season: string;
}

export default function SeasonPicker({ saveSeason, season }: IProps) {
    return (
        <View style={styles.container}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.placeholderText}>
                {SEASON}
            </Text>
            <View style={styles.dropDownWrapper}>
                <DropDownPicker
                    zIndex={10}
                    items={seasonsPickerData}
                    defaultValue={seasonsPickerData.find(s => s.value === season)?.value}
                    dropDownMaxHeight={65}
                    containerStyle={styles.containerSize}
                    itemStyle={styles.itemStyle}
                    onChangeItem={(item: IPicker) => saveSeason(item.value)}
                />
            </View>
        </View>
    );
}

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { REFS } from '@strings';
import { EGameDetail } from '@utils';
import { IRefWithType } from './ZapasDetail';

export const refsPickerData = [
    {
        label: 'H1',
        value: EGameDetail.H1
    },
    {
        label: 'H2',
        value: EGameDetail.H2
    },
    {
        label: 'Č1',
        value: EGameDetail.C1
    },
    {
        label: 'Č2',
        value: EGameDetail.C2
    },
    {
        label: 'I',
        value: EGameDetail.I
    },
    {
        label: 'V',
        value: EGameDetail.V
    },
    {
        label: 'D',
        value: EGameDetail.D
    }
];

const styles = StyleSheet.create({
    container: { flex: 1, paddingVertical: 8 },
    placeholderText: {
        color: '#888',
        fontSize: 16,
        marginBottom: 5
    },
    labelText: { paddingLeft: 10, fontSize: 18 },
    dropDownWrapper: { flexDirection: 'row', marginVertical: 5, alignItems: 'center' },
    containerSize: { height: 40, width: 60 },
    itemStyle: { justifyContent: 'flex-start' }
});

interface IProps {
    saveRefsType: (refsWithType: IRefWithType[]) => void;
    refsWithType: IRefWithType[];
}

interface IPicker {
    label: string;
    value: string;
}

export default function RefereePicker({ saveRefsType, refsWithType }: IProps) {
    React.useEffect(() => {
        saveRefsType(refsWithType);
    }, []);

    const _onPress = (index: number, refType: string) => {
        refsWithType[index] = { ...refsWithType[index], refType };
        saveRefsType(refsWithType);
    };

    return (
        <View style={styles.container}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.placeholderText}>
                {REFS}
            </Text>
            <View>
                {refsWithType.map((ref: { name: string }, index: number) => {
                    return (
                        <View
                            key={index}
                            style={[
                                styles.dropDownWrapper,
                                {
                                    zIndex: refsWithType.length - index,
                                    elevation: refsWithType.length + 1 - index
                                }
                            ]}
                        >
                            <DropDownPicker
                                key={index}
                                zIndex={10}
                                items={refsPickerData}
                                defaultValue={refsPickerData[index].value}
                                dropDownMaxHeight={95}
                                containerStyle={styles.containerSize}
                                itemStyle={styles.itemStyle}
                                onChangeItem={(item: IPicker) => _onPress(index, item.value)}
                            />
                            <Text style={styles.labelText}>{ref.name}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

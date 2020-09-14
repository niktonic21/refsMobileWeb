import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { REFS } from '@strings';
import { EGameDetail } from '@utils';

const refsPickerData = [
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
        value: EGameDetail.H1
    },
    {
        label: 'V',
        value: EGameDetail.H1
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
    referees: any;
    saveRefsType;
    refsWithType;
}

interface IPicker {
    label: string;
    value: string;
}

interface IRefsTypes {
    refType: string;
    name: string;
}

const createRefsWithType = (referees: any) => {
    return referees.map((ref: { name: string }, index: number) => {
        const name = ref.name.split(',', 2).join();
        return { refType: refsPickerData[index].value, name };
    });
};

export default function RefereePicker({ referees, saveRefsType, refsWithType }: IProps) {
    const refereeWithTypes: Array<IRefsTypes> = refsWithType.length
        ? refsWithType
        : createRefsWithType(referees);

    React.useEffect(() => {
        if (!refsWithType.length) {
            saveRefsType(refereeWithTypes);
        }
    }, []);

    const _onPress = (index: number, refType: string) => {
        refereeWithTypes[index] = { ...refereeWithTypes[index], refType };
        saveRefsType(refereeWithTypes);
    };

    return (
        <View style={styles.container}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.placeholderText}>
                {REFS}
            </Text>
            <View>
                {refereeWithTypes.map((ref: { name: string }, index: number) => {
                    return (
                        <View
                            key={index}
                            style={[
                                styles.dropDownWrapper,
                                {
                                    zIndex: referees.length - index,
                                    elevation: referees.length + 1 - index
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

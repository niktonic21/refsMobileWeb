import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { isWeb } from '@layout';
import { getFilterButtonLabel } from '../utils/gameUtils';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: 46,
        paddingHorizontal: 8,
        paddingVertical: 8
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
        width: '100%',
        maxWidth: 1040
    },
    button: {
        backgroundColor: 'white',
        height: 30,
        flex: 1,
        marginHorizontal: isWeb ? 8 : 4,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'grey'
    },
    buttonText: {
        fontSize: 15,
        paddingHorizontal: 5,
        textAlign: 'center'
    },
    loginButton: { width: 80, alignItems: 'center', maxWidth: 120 }
});

interface IProps {
    filterKey: string;
    onPress: (label: string) => void;
}

const data = [{ filterKey: 'Liga' }, { filterKey: 'Rozhodca' }, { filterKey: 'Mesiac' }];

const FilterButton = ({ filterKey, onPress }: IProps) => {
    const _onPress = () => {
        onPress(filterKey);
    };
    const label = getFilterButtonLabel(filterKey);

    return (
        <TouchableOpacity style={styles.button} onPress={_onPress}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.buttonText}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default function FilterButtons({ onPress }) {
    const navigation = useNavigation();
    const isLoggedId = useSelector<{ auth: { loggedIn: boolean } }>(state => state.auth.loggedIn);

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                {data.map(({ filterKey }) => (
                    <FilterButton key={filterKey} filterKey={filterKey} onPress={onPress} />
                ))}
                {isWeb && !isLoggedId && (
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => navigation.navigate('UserScreen')}
                    >
                        <Ionicons name="md-person" color={'black'} size={26} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { isWeb } from '@layout';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
    button: {
        justifyContent: 'flex-start',
        marginTop: 20,
        marginBottom: 10
    }
});

interface IProps {
    title?: string;
    onPress?: () => void;
    style?: object;
}

export const BackButtonWeb: React.FC<IProps> = ({ title = 'Uložiť', style, onPress }) => {
    const navigation = useNavigation();

    const _onBack = () => {
        onPress ? onPress : navigation.canGoBack() && navigation.goBack();
    };

    return (
        <>
            {isWeb ? (
                <Button
                    icon="arrow-left"
                    contentStyle={[styles.button, style]}
                    mode="text"
                    color="blue"
                    onPress={_onBack}
                >
                    {title}
                </Button>
            ) : null}
        </>
    );
};

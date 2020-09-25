import React, { memo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/UserItems/profileUI/Header';
import Button from '../components/UserItems/profileUI/Button';
import TextInput from '../components/UserItems/profileUI/TextInput';
import { emailValidator } from '@utils';
import { resetPassword } from '../redux/firebase';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginTop: 12
    },
    label: {
        color: 'blue',
        width: '100%'
    }
});

type Props = {
    navigation: any;
};

const ForgotPasswordScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState({ value: '', error: '' });

    const _onSendPressed = () => {
        const emailError = emailValidator(email.value);

        if (emailError) {
            setEmail({ ...email, error: emailError });
            return;
        }

        resetPassword(email.value);

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Header>Reset hesla</Header>
            <TextInput
                label="E-mail address"
                returnKeyType="done"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                //autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
                Posli instrukcie na email
            </Button>
        </View>
    );
};

export default memo(ForgotPasswordScreen);

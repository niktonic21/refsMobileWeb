import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, removeError } from '@actions';
import Header from './profileUI/Header';
import Button from './profileUI/Button';
import Paragraph from './profileUI/Paragraph';
import TextInput from './profileUI/TextInput';
import { emailValidator, passwordValidator } from '@utils';

type Props = {
    navigation: any;
};

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24
    },
    container: {
        flex: 1,
        marginHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        color: 'black'
    }
});

const LoginScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const dispatch = useDispatch();
    const { error: firebaseError, loading } = useSelector(state => state.auth);

    const _onLoginPressed = () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        dispatch(loginUser({ email: email.value, password: password.value }));
    };

    const _onFocus = () => {
        if (!firebaseError) return;
        dispatch(removeError());
    };

    return (
        <View style={styles.container}>
            <Header>Prihlásenie</Header>
            <TextInput
                label="Email"
                returnKeyType="next"
                onFocus={_onFocus}
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                //autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                label="Heslo"
                returnKeyType="done"
                onFocus={_onFocus}
                value={password.value}
                onChangeText={text => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            <View style={styles.forgotPassword}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                    <Text style={styles.label}>Zabudnuté heslo?</Text>
                </TouchableOpacity>
            </View>
            <Button mode="contained" onPress={_onLoginPressed}>
                {loading ? <ActivityIndicator /> : 'Prihlásiť'}
            </Button>
            {firebaseError ? <Paragraph>{firebaseError}</Paragraph> : null}
        </View>
    );
};

export default memo(LoginScreen);

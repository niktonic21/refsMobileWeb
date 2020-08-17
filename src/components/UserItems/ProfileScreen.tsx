import React, { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from './profileUI/Logo';
import Header from './profileUI/Header';
import Button from './profileUI/Button';
import TextInput from './profileUI/TextInput';
import { useSelector, useDispatch } from 'react-redux';
import { logOut, saveProfileData } from '@actions';
import { emailValidator } from '@utils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: 16,
        alignItems: 'center'
    }
});

type Props = {
    navigation: any;
};

const ProfileScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const { user: userAuth } = useSelector(state => state.auth.user);
    const { mesto: mestoProp, auto: autoProp } = useSelector(state => state.auth.profile);
    const { displayName, email: emailProp } = userAuth;

    const [email, setEmail] = useState({ value: emailProp, error: '' });
    const [mesto, setMesto] = useState(mestoProp);
    const [auto, setAuto] = useState(autoProp);

    const _saveChanges = () => {
        const emailError = emailValidator(email.value);
        if (emailError) {
            setEmail({ ...email, error: emailError });
            return;
        }
        dispatch(saveProfileData({ mesto, auto, email: email.value }));
    };

    const _logOut = () => {
        dispatch(logOut);
    };

    return (
        <View style={styles.container}>
            <Logo />
            <Header>{displayName}</Header>
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput label="Mesto" onChangeText={text => setMesto(text)} value={mesto} />
            <TextInput label="ŠPZ vozidla" onChangeText={text => setAuto(text)} value={auto} />

            <Button mode="contained" onPress={_saveChanges}>
                Ulozit zmeny
            </Button>
            <Button mode="outlined" onPress={_logOut}>
                Odhlasit sa
            </Button>
        </View>
    );
};

export default memo(ProfileScreen);

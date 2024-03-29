import React, { memo, useState, useEffect } from 'react';
import { Linking, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
// import Logo from './profileUI/Logo';
import Button from './profileUI/Button';
import TextInput from './profileUI/TextInput';
import SeasonPicker from './profileUI/SeasonPicker';
import { useSelector, useDispatch } from 'react-redux';
import { logOut, saveProfileData, updateProfileData } from '@actions';
import { emailValidator } from '@utils';
import {
    SAVE_CHANGES,
    LOG_OUT,
    CITY,
    CAR_ID,
    NAME,
    SADZOBNIK,
    KILOMETROVNIK,
    SADZOBNIK_URL,
    KILOMETROVNIK_URL
} from '@strings';
import { ScrollView } from 'react-native-gesture-handler';
import alert from '../../utils/alert';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: 16
    },
    contentContainer: {
        alignItems: 'center'
    },
    textButtons: {
        marginVertical: 0
    }
});

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const { user: userAuth } = useSelector(state => state.auth.user);
    const {
        mesto: mestoProp,
        auto: autoProp,
        season: seasonProp,
        name: nameProp
    } = useSelector(state => state.auth.profile);
    const { email: emailProp, uid: userId } = userAuth;

    const [name, setName] = useState(nameProp);
    const [email, setEmail] = useState({ value: emailProp, error: '' });
    const [mesto, setMesto] = useState(mestoProp);
    const [auto, setAuto] = useState(autoProp);
    const [season, setSeason] = useState(seasonProp);

    useEffect(() => {
        if (nameProp && nameProp !== name) {
            setName(name);
        }
        if (mestoProp !== mesto) {
            setMesto(mestoProp);
        }
        if (autoProp !== auto) {
            setAuto(autoProp);
        }
        if (season && seasonProp !== season) {
            setSeason(season);
        }
    }, [autoProp, mestoProp, seasonProp, nameProp]);

    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection('referees')
            .doc(userId)
            .onSnapshot(doc => {
                if (doc.exists) {
                    dispatch(updateProfileData(doc.data()));
                } else {
                    console.warn('Profile: no data to be stored');
                }
            });
        return () => unsubscribe();
    }, []);

    const _saveChanges = () => {
        const emailError = emailValidator(email.value);
        if (emailError) {
            setEmail({ ...email, error: emailError });
            return;
        }
        alert('Zmeny uložené', '', [{ text: 'OK', onPress: () => {} }], {
            cancelable: false
        });
        dispatch(saveProfileData({ name, mesto, auto, email: email.value, season }));
    };

    const _logOut = () => {
        dispatch(logOut());
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Button
                mode="text"
                style={styles.textButtons}
                labelStyle={styles.textButtons}
                onPress={() => Linking.openURL(KILOMETROVNIK_URL)}
            >
                {KILOMETROVNIK}
            </Button>
            <Button
                mode="text"
                style={styles.textButtons}
                labelStyle={styles.textButtons}
                onPress={() => Linking.openURL(SADZOBNIK_URL)}
            >
                {SADZOBNIK}
            </Button>
            {/* <Logo /> */}
            <SeasonPicker season={season} saveSeason={text => text && setSeason(text)} />
            <TextInput label={NAME} onChangeText={text => setName(text)} value={name || nameProp} />
            <TextInput
                label="Email"
                returnKeyType="next"
                editable={false}
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                //autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput label={CITY} onChangeText={text => setMesto(text)} value={mesto} />
            <TextInput label={CAR_ID} onChangeText={text => setAuto(text)} value={auto} />

            <Button mode="contained" onPress={_saveChanges}>
                {SAVE_CHANGES}
            </Button>
            <Button mode="outlined" onPress={_logOut}>
                {LOG_OUT}
            </Button>
        </ScrollView>
    );
};

export default memo(ProfileScreen);

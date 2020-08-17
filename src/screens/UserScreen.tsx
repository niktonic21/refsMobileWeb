import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LoginScreen, ProfileScreen } from '../components/UserItems';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    contentContainer: {
        maxWidth: 800,
        width: '100%',
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingVertical: 15
    }
});

export default function UserScreen({ navigation }: any) {
    const isLoggedId = useSelector<{ auth: { loggedIn: boolean } }>(state => state.auth.loggedIn);
    console.log('aaa_Logged_in', isLoggedId);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {isLoggedId ? (
                <ProfileScreen navigation={navigation} />
            ) : (
                <LoginScreen navigation={navigation} />
            )}
        </ScrollView>
    );
}

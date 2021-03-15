import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        maxWidth: 1024,
        alignSelf: 'center'
    }
});

interface IProps {
    children: JSX.Element;
}

export default function ScreenContainer(props: IProps) {
    return <View {...props} style={styles.container} />;
}

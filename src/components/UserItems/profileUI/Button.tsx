import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

type Props = React.ComponentProps<typeof PaperButton>;

const Button = ({ mode, style, labelStyle, children, ...props }: Props) => (
    <PaperButton
        style={[styles.button, mode === 'outlined' && { backgroundColor: 'white' }, style]}
        labelStyle={[styles.text, labelStyle]}
        mode={mode}
        {...props}
    >
        {children}
    </PaperButton>
);

const styles = StyleSheet.create({
    button: {
        width: '100%',
        marginVertical: 10
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26
    }
});

export default memo(Button);

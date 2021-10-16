import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { TextInput } from 'react-native-paper';


const SignUpForm: React.FC = ({ }) => {
    const [email, setEmail] = React.useState('');
    return (
        <View>
            <TextInput
                style={styles.textInput}
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.textInput}
                label="Password"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.textInput}
                label="Mot de Pass"
                value={email}
                onChangeText={text => setEmail(text)}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'transparent'
    }
});

export default SignUpForm;
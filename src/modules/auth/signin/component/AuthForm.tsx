import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Text from '../../../../../assets/AppText';
import { useForm, Controller } from 'react-hook-form';
import api from '../../../../api/api';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../redux/actions';
import { RootState } from '../../../../config-redux/rootReducer';
import { AntDesign } from 'react-native-vector-icons';
type Props = {};
type PersonData = {
    email: string;
    password: string;
};

const AuthForm1: React.FC<Props> = ({}) => {
    const state = useSelector((state: RootState) => state.signin);
    const dispatch = useDispatch();
    // Note action

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<PersonData>();
    const onSubmit = (data) => {
        let formData = new FormData();
        formData.append('login', data.email);
        formData.append('password', data.password);
        formData.append('validitySeconds', 300000);
        let payload = {
            data: formData,
            email: data.email,
        };
        dispatch(actions.actionLogin(payload));
    };
    return (
        <View>
            <Text style={styles.loginText}> SE connecter a Mektoube</Text>
            {state.error !== '' && (
                <View
                    style={{
                        backgroundColor: '#b5e0e8',
                        height: 40,
                        justifyContent: 'center',
                        borderRadius: 10,
                        alignItems: 'center',
                        paddingLeft: 10,
                        marginVertical: 10,
                    }}
                >
                    <Text style={{ color: 'red' }}>Email or password is incorrect</Text>
                </View>
            )}
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Email"
                        mode="outlined"
                        style={styles.form}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="email"
                defaultValue=""
            />
            <View style={{ justifyContent: 'center' }}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            label="Password"
                            mode="outlined"
                            style={styles.formPassword}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize="none"
                            // secureTextEntry={true}
                        />
                    )}
                    name="password"
                    defaultValue=""
                />
                <AntDesign
                    name="eyeo"
                    style={{ position: 'absolute', alignSelf: 'flex-end', marginRight: 10 }}
                    size={25}
                />
            </View>
            <Text style={styles.contactText}> Nous contacter ou Aida</Text>
            <Button
                color="#24cf5f"
                style={styles.buttonStyle}
                mode="contained"
                onPress={handleSubmit(onSubmit)}
            >
                <Text style={styles.buttonText}>ME CONNECTER</Text>
            </Button>

            <Text style={styles.footerText}>
                Vous n'avez pas de compte?{''}
                <Text style={styles.footerSpecialText}>Incrivez vous gratuitement</Text>
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    form: {
        width: 300,
        height: 55,
    },
    formPassword: {
        width: 300,
        height: 55,
        marginTop: 5,
    },
    loginText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    contactText: {
        textDecorationLine: 'underline',
        marginTop: 15,
        fontSize: 18,
    },
    buttonStyle: {
        height: 49,
        marginTop: 45,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
    footerText: {
        fontSize: 14,
        marginTop: 15,
    },
    footerSpecialText: {
        color: '#24cf5f',
        textDecorationLine: 'underline',
        
    },
});

export default AuthForm1;

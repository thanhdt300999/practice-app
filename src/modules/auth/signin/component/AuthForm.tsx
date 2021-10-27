import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Text from '../../../../../assets/AppText';
import { useForm, Controller } from 'react-hook-form';
import api from '../../../../api/api';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../redux/actions';
import { RootState } from '../../../../redux/config-redux/rootReducer';
import { AntDesign } from 'react-native-vector-icons';
const fullWidth = Dimensions.get('window').width - 60; //full width
type Props = {
    modalVisible: boolean;
};
type PersonData = {
    email: string;
    password: string;
};

const AuthForm1: React.FC<Props> = ({ modalVisible }) => {
    const state = useSelector((state: RootState) => state.signin);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    // Note action

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<PersonData>();
    const showEye = watch('password');
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

    React.useEffect(() => {
        setError(state.error);
    }, [state.error]);
    React.useEffect(() => {
        setError('');
    }, []);
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View>
                <Text style={styles.loginText}> Connextion</Text>
                {error !== '' && (
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
                                secureTextEntry={!showPassword}
                            />
                        )}
                        name="password"
                        defaultValue=""
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            alignSelf: 'flex-end',
                            paddingRight: 15,
                            paddingTop: 8,
                        }}
                    >
                        <Text style={{ fontSize: 10, color: 'green' }}>Mot de passe oublie ?</Text>
                        {showEye !== undefined && (
                            <AntDesign
                                name="eyeo"
                                style={{ alignSelf: 'center', marginTop: 7 }}
                                size={25}
                            />
                        )}
                    </TouchableOpacity>
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
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    form: {
        width: fullWidth,
        height: 55,
    },
    formPassword: {
        width: fullWidth,
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

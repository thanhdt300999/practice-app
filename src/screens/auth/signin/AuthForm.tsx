import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback,
    // Text
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Text from '../../../../assets/AppText';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../../redux/actions/signin.actions';
import { RootState } from '../../../redux/config-redux/rootReducer';
import AntDesign from 'react-native-vector-icons/AntDesign';
const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height;
type Props = {
    modalVisible: boolean;
};
type PersonData = {
    email: string;
    password: string;
};

const AuthForm: React.FC<Props> = ({ modalVisible }) => {
    const state = useSelector((state: RootState) => state.signin);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<PersonData>({ mode: 'onSubmit' });
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
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
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
                {/* {errors !== {} && (
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
                        <Text style={{ color: 'red' }}>{errors?.email?.message}</Text>
                        <Text style={{ color: 'red' }}>{errors?.password?.message}</Text>
                    </View>
                )} */}
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            autoCompleteType={false}
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
                                autoCompleteType={false}
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
                    <View
                        style={{
                            position: 'absolute',
                            alignSelf: 'flex-end',
                            paddingRight: 15,
                            paddingTop: width * 0.04,
                            zIndex: 5,
                        }}
                    >
                        <Text style={{ fontSize: height * 0.02, color: 'green' }}>
                            Mot de passe oublie ?
                        </Text>
                        {showEye !== undefined && (
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <AntDesign
                                    name="eyeo"
                                    style={{ marginTop: width * 0.01, alignSelf: 'flex-end' }}
                                    size={height * 0.03}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <Text style={styles.contactText}> Nous contacter ou Aida</Text>
                <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>ME CONNECTER</Text>
                </TouchableOpacity>

                <Text style={styles.footerText}>
                    Vous n'avez pas de compte?{''}
                    <Text style={styles.footerSpecialText}>Incrivez vous gratuitement</Text>
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};
const styles = StyleSheet.create({
    form: {
        width: width - 60,
        height: height * 0.08,
    },
    formPassword: {
        width: width - 60,
        height: height * 0.08,
        marginTop: 5,
    },
    loginText: {
        fontSize: height * 0.04,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    contactText: {
        textDecorationLine: 'underline',
        marginTop: 15,
        fontSize: height * 0.025,
    },
    buttonStyle: {
        height: 49,
        marginTop: height * 0.03,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#24cf5f',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: height * 0.025,
        color: 'white',
    },
    footerText: {
        fontSize: height * 0.02,
        marginTop: height * 0.02,
    },
    footerSpecialText: {
        color: '#24cf5f',
        textDecorationLine: 'underline',
    },
});

export default AuthForm;

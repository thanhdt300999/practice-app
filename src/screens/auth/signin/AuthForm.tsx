import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Platform,
    // Text
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Text from '../../../../assets/AppText';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../../redux/actions/signin-actions';
import { RootState } from '../../../redux/config-redux/rootReducer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height;
type Props = {
    modalVisible: boolean;
    onRequestClose: any;
};
type PersonData = {
    email: string;
    password: string;
};

const AuthForm: React.FC<Props> = ({ modalVisible, onRequestClose }) => {
    const state = useSelector((state: RootState) => state.signin);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm<PersonData>({ mode: 'onSubmit' });
    const showEye = watch('password', '');
    const onSubmit = (data) => {
        let formData = new FormData();
        formData.append('login', data.email);
        formData.append('password', data.password);
        formData.append('validitySeconds', 1000);
        let payload = {
            data: formData,
            email: data.email,
        };
        dispatch(actions.actionLogin(payload));
    };
    const handleChangeScreen = () => {
        onRequestClose();
        navigation.navigate('SignupFlow', { screen: 'Entity' });
    };

    const passwordRegex = new RegExp('.{8,}');

    React.useEffect(() => {
        setError(state.error);
    }, [state.error]);
    React.useEffect(() => {
        setError('');
    }, []);
    return (
        <View style={{}}>
            <Text style={[styles.loginText]}> Connextion</Text>
            {(error !== '' || errors.email || errors.password) && (
                <View
                    style={{
                        backgroundColor: '#fde9ea',
                        height: 40,
                        justifyContent: 'center',
                        borderRadius: 10,
                        alignItems: 'center',
                        paddingLeft: 10,
                        marginBottom: 10,
                    }}
                >
                    {errors.email && <Text style={{ color: '#ff2c2c' }}>Email is required</Text>}
                    {!errors.email && errors.password && (
                        <Text style={{ color: '#ff2c2c' }}>{errors.password.message}</Text>
                    )}
                    {error !== '' && !errors.email && !errors.password && (
                        <Text style={{ color: '#ff2c2c' }}>
                            Identifiant ou mot de passe incorrect
                        </Text>
                    )}
                </View>
            )}
            <View
                style={{
                    overflow: 'hidden',
                    height: 58,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 10,
                    borderTopStartRadius: 10,
                    borderTopEndRadius: 10,
                    justifyContent: 'center',
                }}
            >
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: 'Email is required!',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            autoCompleteType={false}
                            label="Email"
                            style={styles.form}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            // placeholder="Passe"
                            theme={{
                                colors: {
                                    placeholder: '#000000',
                                    background: '#000',
                                    primary: '#000',
                                },
                                fonts: {
                                    regular: {
                                        fontFamily: 'Avenir Next Condensed',
                                    },
                                },
                            }}
                        />
                    )}
                    name="email"
                    defaultValue=""
                />
            </View>
            <View
                style={{
                    overflow: 'hidden',
                    height: 58,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 10,
                    borderTopStartRadius: 10,
                    borderTopEndRadius: 10,
                    justifyContent: 'center',
                    marginTop: 10
                }}
            >
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: 'Password is required!',
                        },
                        pattern: {
                            value: passwordRegex,
                            message: 'Password must more than 8 characters',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            autoCompleteType={false}
                            label="Mot de passe"
                            style={styles.formPassword}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize="none"
                            secureTextEntry={!showPassword}         
                            // placeholder="Passe"
                            theme={{
                                colors: {
                                    placeholder: '#000000',
                                    background: '#000',
                                    primary: '#000',
                                },
                                fonts: {
                                    regular: {
                                        fontFamily: 'Avenir Next Condensed',
                                    },
                                },
                            }}
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
                        paddingTop: width * 0.02,
                        zIndex: 5,
                        top: 0,
                        height: height * 0.08,
                    }}
                >
                    <Text style={{ fontSize: height * 0.015, color: 'green' }}>
                        Mot de passe oublie ?
                    </Text>
                    {showEye.length > 0 && (
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <AntDesign
                                name="eyeo"
                                style={{ marginTop: width * 0.01, alignSelf: 'flex-end' }}
                                size={20}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View style={styles.contactText}>
                <Text style={{ textDecorationLine: 'underline' }}>Nous contacter </Text>
                <Text> ou </Text>
                <Text style={{ textDecorationLine: 'underline' }}>Aida</Text>
            </View>
            <TouchableOpacity
                style={styles.buttonStyle}
                disabled={state.isLoading === true ? true : false}
                onPress={handleSubmit(onSubmit)}
            >
                {state.isLoading === true ? (
                    <ActivityIndicator color="white" size="large" />
                ) : (
                    <Text style={styles.buttonText}>ME CONNECTER</Text>
                )}
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <Text style={styles.footerText}>Vous n'avez pas de compte? &nbsp;</Text>
                <TouchableOpacity onPress={handleChangeScreen}>
                    <Text style={styles.footerSpecialText}>Incrivez-vous gratuitement</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    form: {
        width: width - 30,
        height: 60,
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },

    formPassword: {
        width: width - 30,
        height: 60,
        backgroundColor: 'transparent',
        marginBottom: -2,
        overflow: 'hidden',
    },
    loginText: {
        fontSize: height * 0.034,
        marginBottom: 15,
        color: '#000',
        fontFamily:
            Platform.OS === 'android' ? 'AvenirNextCondensed_Bold' : 'Avenir Next Condensed',
    },
    contactText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginLeft: 0,
    },
    buttonStyle: {
        height: 55,
        marginTop: height * 0.03,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#24cf5f',
    },
    buttonText: {
        fontSize: height * 0.025,
        color: 'white',
    },
    footerText: {
        fontSize: height * 0.022,
        color: 'grey',
    },
    footerSpecialText: {
        fontSize: height * 0.022,
        color: '#24cf5f',
        textDecorationLine: 'underline',
    },
});

export default AuthForm;

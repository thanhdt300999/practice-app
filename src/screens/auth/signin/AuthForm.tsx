import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
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
                {(error !== '' || errors.email || errors.password) && (
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
                        {errors.email && <Text style={{ color: 'red' }}>Email is required</Text>}
                        {!errors.email && errors.password && (
                            <Text style={{ color: 'red' }}>Password is required</Text>
                        )}
                        {error !== '' && !errors.email && !errors.password  && <Text style={{ color: 'red' }}>Email or password is incorrect</Text>}
                    </View>
                )}
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: 'Field is required!',
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
                            underlineColor="transparent"
                            outlineColor="#ccc"
                            theme={{ colors: { placeholder: "#000000", background: '#000', primary: '#000' }, fonts: {
                                regular: {
                                  fontFamily: 'Avenir Next Condensed'
                                }
                            }}}
                        />
                    )}
                    name="email"
                    defaultValue=""
                />

                <View style={{ justifyContent: 'center' }}>
                    <Controller
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: 'Field is required!',
                            },
                            // pattern: {
                            //     value: dateRegex,
                            //     message: 'Date is invalid',
                            // },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                autoCompleteType={false}
                                label="Votre mot de passe"
                                style={styles.formPassword}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="none"
                                underlineColor="transparent"
                                secureTextEntry={!showPassword}
                                outlineColor="#ccc"
                                placeholderTextColor='#000000'
                                theme={{ colors: { placeholder: "#000000", background: '#000', primary: '#000' }, fonts: {
                                    regular: {
                                      fontFamily: 'Avenir Next Condensed'
                                    }
                                }}}
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
                            // paddingTop: width * 0.03,
                            zIndex: 5,
                            top: 10,
                            height: height * 0.08
                        }}
                    >
                        <Text style={{ fontSize: height * 0.015, color: 'green'}}>
                            Mot de passe oublie ?
                        </Text>
                        {showEye.length > 0 && (
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

                <Text style={styles.footerText}>
                    Vous n'avez pas de compte? &nbsp;
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
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        overflow: 'hidden',
    },
    formPassword: {
        width: width - 60,
        height: height * 0.08,
        marginTop: 5,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        marginBottom: -2,
        overflow: 'hidden',
    },
    loginText: {
        fontSize: height * 0.04,
        marginBottom: 10,
        color: '#000'
    },
    contactText: {
        textDecorationLine: 'underline',
        marginTop: 15,
        fontSize: height * 0.02,
        color: 'grey',
    },
    buttonStyle: {
        height: height*0.065,
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
        fontSize: height * 0.02,
        marginTop: height * 0.02,
        color: 'grey',
    },
    footerSpecialText: {
        color: '#24cf5f',
        textDecorationLine: 'underline',
    },
});

export default AuthForm;

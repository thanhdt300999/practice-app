import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    ActivityIndicator,
    Platform,
    // Text
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../assets/AppText';
import actions from '../../../redux/actions/signup-actions';
import { RootState } from '../../../redux/config-redux/rootReducer';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import ButtonBack from '../../../components/button/ButtonBack';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import CheckBox from '../../../components/button/CheckBox';
import { showMessage, hideMessage } from 'react-native-flash-message';

const width: number = Dimensions.get('window').width; //full width
const height: number = Dimensions.get('window').height;
interface Props {}
interface region {
    id: string;
    name: string;
}
const SignupScreen: React.FC<Props> = ({}) => {
    const [first, setCheckFrist] = React.useState(false);
    const [second, setCheckSecond] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(true);
    const [error, setError] = React.useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const state = useSelector((state: RootState) => state.signup);
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        clearErrors,
    } = useForm({ mode: 'onSubmit' });
    const watchPassword = watch('password', '');
    const onSubmit = (data) => {
        if (first && second) {
            const formData = new FormData();
            formData.append('firstname', data.firstname);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('affiliate', 1);
            formData.append('mailing', 1);
            formData.append('birthday', state.dataPostLogin.birthday);
            formData.append('gender', state.dataPostLogin.gender);
            formData.append('origin', state.dataPostLogin.origin);
            formData.append('geoname_id', state.dataPostLogin.city);
            dispatch(actions.postSignupRequest(formData));
        } else {
            showMessage({
                message: 'Vous devez accepter les CGU',
                color: 'white',
                backgroundColor: '#ff2c2c',
                textStyle: { fontFamily: 'Avenir Next Condensed' },
                style: { alignItems: 'center' },
            });
        }
    };
    React.useEffect(() => {
        console.log(state.error)
        state.error !== '' &&
            showMessage({
                message:
                    'Catte adresse email est deja prise. Voulez-vous vous connecter ou recuperer votre mot de pass',
                color: 'white',
                backgroundColor: '#ff2c2c',
                textStyle: { fontFamily: 'Avenir Next Condensed' },
                style: { alignItems: 'center' },
            });
    }, [state.error]);
    const nameRegex = new RegExp('^[a-zA-Z]{4,15}$');
    return (
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
            <LinearGradient
                colors={['#FF59F4', '#FF5978']}
                style={{ flex: 1, backgroundColor: '#FF5978' }}
                useAngle={true}
                angle={180}
                angleCenter={{ x: 0.5, y: 0.5 }}
                locations={[0,1]}
            >
                <>
                    <ButtonBack
                        onPress={() => {
                            navigation.goBack();
                            dispatch({ type: 'GO_BACK' });
                        }}
                        style={{ alignSelf: 'flex-start' }}
                        signup={true}
                    />
                    <View
                        style={{
                            height: height * 0.8,
                            marginTop: Platform.OS === 'ios' ? height * 0.12 : height * 0.06,
                        }}
                    >
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.textInput}
                                    onBlur={onBlur}
                                    onChangeText={(e) => {
                                        clearErrors();
                                        onChange(e);
                                    }}
                                    value={value}
                                    placeholder="Email"
                                    underlineColorAndroid="#ffffff"
                                    underlineColor="#ffffff"
                                    theme={{
                                        colors: {
                                            text: 'white',
                                            placeholder: '#ccc',
                                            primary: 'white',
                                        },
                                    }}
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Email is required!',
                                },
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Email is incorrect',
                                },
                            }}
                            name="email"
                            defaultValue=""
                        />
                        {errors.email && (
                            <View style={styles.errorBox}>
                                <Text style={styles.errorText}>{errors.email.message}</Text>
                            </View>
                        )}
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.textInput}
                                    onBlur={onBlur}
                                    onChangeText={(e) => {
                                        clearErrors();
                                        onChange(e);
                                    }}
                                    value={value}
                                    placeholder="Prénom"
                                    underlineColorAndroid="#ffffff"
                                    underlineColor="#ffffff"
                                    theme={{
                                        colors: {
                                            text: 'white',
                                            placeholder: '#ccc',
                                            primary: 'white',
                                        },
                                    }}
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'First name is required!',
                                },
                                pattern: {
                                    value: nameRegex,
                                    message: 'Name must not have special characters',
                                },
                                minLength: {
                                    value: 4,
                                    message: 'Name must have more than 4 chars',
                                },
                                maxLength: {
                                    value: 15,
                                    message: 'Name must have less than 15 chars',
                                },
                            }}
                            name="firstname"
                            defaultValue=""
                        />
                        {errors.firstname && (
                            <View style={styles.errorBox}>
                                <Text style={styles.errorText}>{errors.firstname.message}</Text>
                            </View>
                        )}
                        <View style={{ justifyContent: 'center', marginBottom: height * 0.02 }}>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.textInput}
                                        onBlur={onBlur}
                                        onChangeText={(e) => {
                                            clearErrors();
                                            onChange(e);
                                        }}
                                        value={value}
                                        placeholder="Mot de passe"
                                        secureTextEntry={showPassword}
                                        underlineColorAndroid="transparent"
                                        underlineColor="#ffffff"
                                        theme={{
                                            colors: {
                                                text: 'white',
                                                placeholder: '#ccc',
                                                primary: 'white',
                                            },
                                        }}
                                    />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Password is required!',
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Password must have more than 8 characters',
                                    },
                                    pattern: {
                                        value: /^[\S]+$/,
                                        message: 'Password invalid',
                                    },
                                }}
                                name="password"
                                defaultValue=""
                            />
                            {errors.password && (
                                <View style={styles.errorBox}>
                                    <Text style={styles.errorText}>{errors.password.message}</Text>
                                </View>
                            )}

                            <View style={styles.checkPassText}>
                                {watchPassword.length > 0 && (
                                    <TouchableOpacity
                                        style={{ marginRight: 10 }}
                                        onPress={() => setShowPassword(!showPassword)}
                                    >
                                        <AntDesign
                                            name="eyeo"
                                            style={{
                                                alignSelf: 'flex-end',
                                            }}
                                            size={height * 0.025}
                                        />
                                    </TouchableOpacity>
                                )}

                                {watchPassword.length < 8 && (
                                    <View>
                                        <Text
                                            style={{
                                                color: '#ffffff',
                                                fontSize: height * 0.02,
                                                textDecorationColor: '#ff2c2c',
                                                fontFamily: Platform.OS === 'android' ? 'AvenirNextCondensed_Bold' : 'Avenir Next Condensed'
                                            }}
                                        >
                                            Failbe
                                        </Text>
                                        <View
                                            style={{
                                                borderBottomColor: '#ff2c2c',
                                                borderBottomWidth: 2,
                                            }}
                                        ></View>
                                    </View>
                                )}
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setCheckFrist(!first);
                            }}
                        >
                            <View style={styles.container}>
                                <View style={[styles.customCheckbox]}>
                                    {first && <Feather name="check" color="#fff" size={25} />}
                                </View>
                                <Text style={[styles.textStyle]}>
                                    Je certifie atre majeur(e) et j'accepte les{' '}
                                    <Text
                                        style={[
                                            styles.textStyle,
                                            { textDecorationLine: 'underline' },
                                        ]}
                                    >
                                        Conditions generales d'utilisations
                                    </Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {/* <CheckBox
                            label="Je certifie atre majeur(e) et j'accepte les Conditions generales d'utilisations"
                            status={first ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setCheckFrist(!first);
                            }}
                        /> */}
                        <CheckBox
                            label="Jacceple que mes donnees renseignees, y compris celles facultatives a mon origine, soient accessibles au service client de Mektoube et autres ultisateurs du site dans & hors I'UE conformenent a la charte parivee"
                            status={second ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setCheckSecond(!second);
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        style={[styles.connectButton]}
                        onPress={handleSubmit(onSubmit)}
                    >
                        {state.isLoading === true ? (
                            <ActivityIndicator color="white" size="large" />
                        ) : (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: 5,
                                }}
                            >
                                <Feather name="check" size={height * 0.02} color="#ffffff" />
                                <Text
                                    style={{
                                        marginLeft: 10,
                                        textAlign: 'center',
                                        fontSize: height * 0.025,
                                        color: '#ffffff',
                                   
                                    }}
                                >
                                    ME CONNECTER
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'transparent',
        marginHorizontal: 20,
    },
    connectButton: {
        backgroundColor: 'rgba(255, 89, 120, 0.2)',
        height: 50,
        width: width,
        paddingTop: 10,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        bottom: 0,
        borderTopWidth: 1,
        borderTopColor: '#fff',
    },
    checkPassText: {
        textDecorationLine: 'underline',
        flexDirection: 'row',
        position: 'absolute',
        right: 20,
        color: '#ffffff',
        top: 30,
        fontSize: height * 0.025,
        alignItems: 'center',
        textDecorationColor: '#ff2c2c' /*'#ff2c2c'*/,
    },
    errorText: {
        color: '#fff',
        marginLeft: 20,
    },
    errorBox: {
        marginHorizontal: 20,
        height: height * 0.04,
        backgroundColor: '#ff2c2c',
        marginTop: 5,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ffff',
        marginHorizontal: 15,
        marginTop: 30,
    },
    textStyle: {
        flexWrap: 'wrap',
        color: 'white',
        flex: 1,
        fontSize: Platform.OS === 'ios' ? height * 0.016 : height * 0.02,
    },
    customCheckbox: {
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ccc',
        width: 35,
        height: 35,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SignupScreen;

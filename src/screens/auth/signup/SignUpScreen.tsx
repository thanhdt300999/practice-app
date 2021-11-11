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
import actions from '../../../redux/actions/signup.actions';
import { RootState } from '../../../redux/config-redux/rootReducer';
import Entypo from 'react-native-vector-icons/Entypo';
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
    const [showError, setShowError] = React.useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const state = useSelector((state: RootState) => state.signup);
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
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
            console.log(formData);
            dispatch(actions.postSignupRequest(formData));
        } else {
            showMessage({
                message: "Vous devez accepter CGU",
                color: 'white',
                backgroundColor: '#ff2c2c',
                textStyle: {fontFamily: 'Avenir Next Condensed'},
                style: {alignItems: 'center'}
              });
        }
    };
    React.useEffect(() => {
        if(state.error) {
            showMessage({
                message: "Email is exist",
                color: 'white',
                backgroundColor: '#ff2c2c',
                textStyle: {fontFamily: 'Avenir Next Condensed'},
                style: {alignItems: 'center'}
            });
        }
    }, [state.error])
    const nameRegex = new RegExp('^\\w{4,15}$');
    const passwordRegex = new RegExp('.{8,}');
    return (
        <LinearGradient
            colors={['#FF5978', '#FF59F4']}
            style={{ flex: 1, backgroundColor: '#FF5978' }}
            useAngle={true}
            angle={0}
            angleCenter={{ x: 0.5, y: 0.5 }}
            locations={[0, 1]}
        >
            <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                <>
                    <ButtonBack
                        onPress={() => navigation.goBack()}
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
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Email"
                                    underlineColorAndroid="#ffffff"
                                    underlineColor="#ffffff"
                                    theme={{
                                        colors: {
                                            text: 'white',
                                            placeholder: '#d3ded6',
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
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Prénom"
                                    underlineColorAndroid="#ffffff"
                                    underlineColor="#ffffff"
                                    theme={{
                                        colors: {
                                            text: 'white',
                                            placeholder: '#d3ded6',
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
                                    message: 'Name must have 4 to 15 characters',
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
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Mot de passe"
                                        secureTextEntry={true}
                                        underlineColorAndroid="transparent"
                                        underlineColor="#ffffff"
                                        theme={{
                                            colors: {
                                                text: 'white',
                                                placeholder: '#d3ded6',
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
                                    pattern: {
                                        value: passwordRegex,
                                        message: 'Password must more than 8 characters',
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
                            {watchPassword.length < 8  && (
                                <View style={styles.checkPassText}>
                                    <Text
                                        style={{
                                            color: '#ffffff',
                                            fontSize: height * 0.02,
                                            textDecorationColor: '#ff2c2c' /*'#ff2c2c'*/,
                                        }}
                                    >
                                        Failbe
                                    </Text>
                                    <View
                                        style={{ borderBottomColor: '#ff2c2c', borderBottomWidth: 2 }}
                                    ></View>
                                </View>
                            )}
                        </View>
                        <CheckBox
                            label="Je certifie atre majeur(e) et j'accepte les Conditions generales d'utilisations"
                            status={first ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setCheckFrist(!first);
                            }}
                        />
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
                                <Entypo name="check" size={height * 0.02} color="#ffffff" />
                                <Text
                                    style={{
                                        marginLeft: 10,
                                        textAlign: 'center',
                                        fontSize: height * 0.02,
                                        color: '#ffffff',
                                    }}
                                >
                                    ME CONNECTER
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </>
            </TouchableWithoutFeedback>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'transparent',
        marginHorizontal: 20,
        // borderBottomWidth: 4,
        // borderBottomColor: 'white'
    },
    connectButton: {
        backgroundColor: '#ff5978',
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
        position: 'absolute',
        right: 20,
        color: '#ffffff',
        top: height*0.035,
        fontSize: height * 0.025,
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
});

export default SignupScreen;

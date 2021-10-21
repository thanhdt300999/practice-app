import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Text from '../../../../../assets/AppText';
import { TextInput, Checkbox, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import ButtonBack from './ButtonBack';
import CheckBox from './CheckBox';
import Icon from 'react-native-vector-icons/Entypo';
import { createIconSetFromFontello } from 'react-native-vector-icons';
interface Props {
    setRender: any;
    submitSignupForm: any;
}

const width = Dimensions.get('window').width; //full width

const SignUpForm: React.FC<Props> = ({ submitSignupForm, setRender }) => {
    const [first, setCheckFrist] = React.useState(false);
    const [second, setCheckSecond] = React.useState(false);
    const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        submitSignupForm(data);
    };
    const emailRegex = new RegExp(
        '^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$'
    );
    const nameRegex = new RegExp('^\\w{4,15}$');
    const passwordRegex = new RegExp('.{8,}');
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.container}
        >
            <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                <>
                    <View style={{ height: 550, alignSelf: 'stretch' }}>
                        <ButtonBack
                            onPress={() => setRender('city')}
                            style={{ alignSelf: 'flex-start' }}
                            signup={true}
                        />
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.textInput}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Email"
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Field is required!',
                                },
                                // pattern: {
                                //     value: emailRegex,
                                //     message: 'Invalid email',
                                // },
                            }}
                            name="email"
                            defaultValue=""
                        />
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.textInput}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Prénom"
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Field is required!',
                                },
                                pattern: {
                                    value: nameRegex,
                                    message: 'Name must have 4 to 15 characters',
                                },
                            }}
                            name="firstName"
                            defaultValue=""
                        />
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
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Field is required!',
                                },
                                pattern: {
                                    value: passwordRegex,
                                    message: 'Password must more than 8 characters'
                                }
                            }}
                            name="password"
                            defaultValue=""
                        />
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
                    <TouchableOpacity style={styles.connectButton} onPress={handleSubmit(onSubmit)}>
                        <Icon name="check" size={30} color="#ffffff" />
                        <Text
                            style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 20,
                                color: '#ffffff',
                            }}
                        >
                            ME CONNECTER
                        </Text>
                    </TouchableOpacity>
                </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contain: {
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 20,
    },
    imageStyle: {
        width: 75,
        height: 75,
        alignSelf: 'center',
    },
    textStyle: {
        fontSize: 25,
        alignSelf: 'center',
        color: '#FFFFFF',
    },
    styleCheckbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    textCheckBox: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: 'center',
    },
    radio: {
        alignSelf: 'flex-end',
    },
    iconStyle: {
        height: 90,
        width: 90,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ffffff',
        borderWidth: 2,
    },
    textInput: {
        backgroundColor: 'transparent',
        marginHorizontal: 20,
    },
    connectButton: {
        backgroundColor: '#ff2c2c',
        height: 50,
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: 10,
        position: 'absolute',
        bottom: 40,
    },
});

export default SignUpForm;

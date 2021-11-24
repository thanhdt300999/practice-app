import React, { useRef } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import Text from '../../../../assets/AppText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ButtonBack from '../../../components/button/ButtonBack';
import ButtonNext from '../../../components/button/ButtonNext';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import actions from '../../../redux/actions/signup-actions';
import globalStyles from './globalStyle';
import { showMessage, hideMessage } from 'react-native-flash-message';
interface Props {}
const height: number = Dimensions.get('window').height;
const width: number = Dimensions.get('window').width;

const BirthdayScreen: React.FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        getValues,
        watch,
        formState: { errors, isValid },
    } = useForm({ mode: 'onBlur' });
    const navigation = useNavigation();
    const dateRegex = new RegExp('^(0?[1-9]|[12][0-9]|3[01])$');
    const monthRegex = new RegExp('^(0?[1-9]|1[012])$');
    const yearRegex = new RegExp('^\\d{4}$');
    const monthRef = useRef();
    const yearRef = useRef();
    const bodyRef = useRef();
    const currentYear = new Date().getFullYear()
    const onSubmit = () => {
        const birthday = getValues();
        if (isValid === true && isValidDate(convertBirthday(birthday)) === true) {
            dispatch(actions.setBirthday(convertBirthday(birthday)));
            navigation.navigate('Origin');
        } else {
            if (errors.date) {
                showMessage({
                    message: errors.date.message,
                    color: 'white',
                    backgroundColor: '#ff2c2c',
                    textStyle: { fontFamily: 'Avenir Next Condensed' },
                    style: { alignItems: 'center' },
                });
            } else if (errors.month) {
                showMessage({
                    message: errors.month.message,
                    color: 'white',
                    backgroundColor: '#ff2c2c',
                    textStyle: { fontFamily: 'Avenir Next Condensed' },
                    style: { alignItems: 'center' },
                });
            } else if (errors.year) {
                showMessage({
                    message: errors.year.message,
                    color: 'white',
                    backgroundColor: '#ff2c2c',
                    textStyle: { fontFamily: 'Avenir Next Condensed' },
                    style: { alignItems: 'center' },
                });
            } else if (!isValidDate(convertBirthday(birthday))) {
                showMessage({
                    message: 'Vous devez mettre une date valide',
                    color: 'white',
                    backgroundColor: '#ff2c2c',
                    textStyle: { fontFamily: 'Avenir Next Condensed' },
                    style: { alignItems: 'center' },
                });
            }
        }
    };

    //convert birthday to yyyy-mm-dd
    const convertBirthday = (birthday) => {
        return `${birthday?.year}-${convertDateandMonth(birthday?.month)}-${convertDateandMonth(
            birthday?.date
        )}`;
    };
    //convert Date and month to mm, dd
    const convertDateandMonth = (value) => {
        if (value?.length < 2) {
            return value < 10 ? '0' + value.toString() : value.toString();
        } else {
            return value;
        }
    };
    //Check yyyy-mm-dd valid
    function isValidDate(dateString) {
        // First check for the pattern
        var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

        if (!regex_date.test(dateString)) {
            return false;
        }

        // Parse the date parts to integers
        var parts = dateString.split('-');
        var day: number = parseInt(parts[2], 10);
        var month: number = parseInt(parts[1], 10);
        var year: number = parseInt(parts[0], 10);
        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12) {
            return false;
        }

        var monthLength: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
            monthLength[1] = 29;
        }

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    }
    return (
        <LinearGradient
            colors={['#FF59F4', '#FF5978']}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                <View ref={bodyRef} style={{ height: height * 0.8, alignSelf: 'stretch' }}>
                    <ButtonBack onPress={() => navigation.goBack()} />
                    <View style={globalStyles.header}>
                        <View style={globalStyles.iconStyle}>
                            <FontAwesome name="birthday-cake" size={height * 0.025} color="#fff" />
                        </View>
                        <Text style={globalStyles.textFormStyle}>
                            Quelle est votre date de naissance ?
                        </Text>
                    </View>
                    <View style={styles.inputStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.textInput}
                                    onBlur={onBlur}
                                    onChangeText={(e) => {
                                        if (e.length >= 2) {
                                            monthRef.current.focus();
                                        }
                                        if (e.length <= 2) {
                                            onChange(e);
                                        }
                                    }}
                                    value={value}
                                    placeholder="JJ"
                                    keyboardType="number-pad"
                                    underlineColor="#ffffff"
                                    autoCompleteType={false}
                                    theme={{
                                        colors: {
                                            text: 'white',
                                            placeholder: '#ccc',
                                            primary: 'white',
                                        },
                                        fonts: {
                                            regular: {
                                                fontFamily: 'Avenir Next Condensed',
                                            },
                                        },
                                    }}
                                    underlineColorAndroid="transparent"
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Date is required!',
                                },
                                max: {
                                    value: 31,
                                    message: 'Invalid date',
                                },
                                min: {
                                    value: 1,
                                    message: 'Invalid date',
                                },
                            }}
                            name="date"
                            defaultValue=""
                        />
                        <Text style={{ fontSize: height * 0.025, color: '#ccc' }}>/</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.textInput}
                                    ref={monthRef}
                                    onBlur={onBlur}
                                    onChangeText={(e) => {
                                        if (e.length >= 2) {
                                            yearRef.current.focus();
                                        }
                                        if(e.length <=2) {
                                            onChange(e)
                                        }
                                        
                                    }}
                                    value={value}
                                    placeholder="MM"
                                    keyboardType="number-pad"
                                    autoCompleteType={false}
                                    underlineColorAndroid="transparent"
                                    underlineColor="#ffffff"
                                    theme={{
                                        colors: {
                                            text: 'white',
                                            placeholder: '#ccc',
                                            primary: 'white',
                                        },
                                        fonts: {
                                            regular: {
                                                fontFamily: 'Avenir Next Condensed',
                                            },
                                        },
                                    }}
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Month is required!',
                                },
                                max: {
                                    value: 12,
                                    message: 'Invalid month',
                                },
                                min: {
                                    value: 1,
                                    message: 'Invalid month',
                                },
                            }}
                            name="month"
                            defaultValue=""
                        />
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ fontSize: height * 0.025, color: '#ccc' }}>/</Text>
                        </View>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.textInput}
                                    ref={yearRef}
                                    onBlur={onBlur}
                                    onChangeText={(e) => {
                                        if (e.length < 5) {
                                            onChange(e);
                                        }
                                    }}
                                    value={value}
                                    placeholder="AAAA"
                                    keyboardType="number-pad"
                                    autoCompleteType={false}
                                    underlineColor="white"
                                    theme={{
                                        colors: {
                                            text: 'white',
                                            placeholder: '#ccc',
                                            primary: 'white',
                                        },
                                        fonts: {
                                            regular: {
                                                fontFamily: 'Avenir Next Condensed',
                                            },
                                        },
                                    }}
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Year is required!',
                                },
                                max: {
                                    value: currentYear - 18,
                                    message: 'Vous devez mettre une date valide',
                                },
                                min: {
                                    value: currentYear - 99,
                                    message: 'Vous devez mettre une date valide',
                                },
                            }}
                            name="year"
                            defaultValue=""
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <ButtonNext onPress={onSubmit} disable={false} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        alignSelf: 'center',
        flexDirection: 'row',
        width: 200,
        justifyContent: 'space-between',
        height: height * 0.055,
        alignItems: 'center',
        marginTop: 15,
    },
    textInput: {
        backgroundColor: 'transparent',
        height: height * 0.075,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
    },
    errorBox: {
        marginHorizontal: 30,
        height: height * 0.045,
        backgroundColor: 'red',
        marginTop: 20,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#fff',
        marginLeft: 20,
    },
});

export default BirthdayScreen;

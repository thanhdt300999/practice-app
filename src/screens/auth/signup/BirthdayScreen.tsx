import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Dimensions, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import Text from '../../../../assets/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import ButtonBack from '../../../components/button/ButtonBack';
import ButtonNext from '../../../components/button/ButtonNext';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import actions from '../../../redux/actions/signup.actions';
import globalStyles from './globalStyle'
interface Props {}
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const marginTop = Platform.OS === 'ios' ? height * 0.06 : height * 0.04;
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
    const watchDate = watch("date", "");
    const watchMonth = watch("month", "");
    const watchYear = watch("year", "");
    const birthday = getValues();
    const [showError, setShowError] = React.useState<boolean>(false);
    const dateRegex = new RegExp('^(0?[1-9]|[12][0-9]|3[01])$');
    const monthRegex = new RegExp('^(0?[1-9]|1[012])$');
    const yearRegex = new RegExp('^\\d{4}$');
    const onSubmit = () => {
        if (isValid === true && isValidDate(convertBirthday(birthday)) === true) {
            setShowError(false);
            dispatch(actions.setBirthday(convertBirthday(birthday)));
            navigation.navigate('Origin');
        } else {
            setShowError(true);
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
    // console.log(isValidDate(convertBirthday(birthday)))
    //Check yyyy-mm-dd valid
    function isValidDate(dateString) {
        // First check for the pattern
        var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

        if (!regex_date.test(dateString)) {
            return false;
        }

        // Parse the date parts to integers
        var parts = dateString.split('-');
        var day = parseInt(parts[2], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[0], 10);

        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12) {
            return false;
        }

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
            monthLength[1] = 29;
        }

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    }
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
                <View style={{ height: 550, alignSelf: 'stretch' }}>
                    <ButtonBack onPress={() => navigation.goBack()} />
                    <View style={globalStyles.header}>
                        <View style={globalStyles.iconStyle}>
                            <Icon name="birthday-cake" size={height * 0.03} color="#fff" />
                        </View>
                        <Text style={globalStyles.textFormStyle}>Quelle est votre date de naissance ?</Text>
                    </View>
                    <View style={styles.inputStyle}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.textInput}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="DD"
                                    keyboardType="number-pad"
                                    autoCompleteType={false}
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Field is required!',
                                },
                                pattern: {
                                    value: dateRegex,
                                    message: 'Date is invalid',
                                },
                            }}
                            name="date"
                            defaultValue=""
                        />
                        <Text style={{ fontSize: height * 0.07, color: '#ccc' }}>/</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.textInput}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="MM"
                                    keyboardType="number-pad"
                                    autoCompleteType={false}
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Field is required!',
                                },
                                pattern: {
                                    value: monthRegex,
                                    message: 'Month is invalid',
                                },
                            }}
                            name="month"
                            defaultValue=""
                        />
                        <Text style={{ fontSize: height * 0.07, color: '#ccc' }}>/</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.textInput}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="YY"
                                    keyboardType="number-pad"
                                    autoCompleteType={false}
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Field is required!',
                                },
                                pattern: {
                                    value: yearRegex,
                                    message: 'Year is invalid',
                                },
                            }}
                            name="year"
                            defaultValue=""
                        />
                    </View>
                    {showError && (
                        <View style={styles.errorBox}>
                            <Text style={styles.errorText}>Invalid birthday</Text>
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
            <ButtonNext
                onPress={onSubmit}
                disable={
                    false
                    // isValid === true && isValidDate(convertBirthday(birthday)) === true
                    //     ? false
                    //     : true
                }
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    imageStyle: {
        width: 75,
        height: 75,
    },
    inputStyle: {
        alignSelf: 'center',
        flexDirection: 'row',
        width: 200,
        justifyContent: 'space-between',
    },
    textInput: {
        backgroundColor: 'transparent',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
    },
    container: {
        flex: 1,
        alignItems: 'center',
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

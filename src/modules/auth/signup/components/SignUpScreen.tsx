import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Text from '../../../../../assets/AppText';
import EntityForm from './EntityForm';
import BirthdayForm from './BirthdayForm';
import OriginForm from './OriginForm';
import ButtonNext from './ButtonNext';
import FromForm from './FromForm';
import CountryForm from './CountryForm';
import RegionForm from './RegionForm';
import ZipCodeForm from './ZipCodeForm';
import CityForm from './CityForm';
import SignUpForm from './SignUpForm';
import Discovery from '../../../Home/components/Discovery';
import actions from '../redux/action';
import { RootState } from '../../../../config-redux/rootReducer';

interface Props {}
interface birthday {
    date: string;
    month: string;
    year: string;
}

interface region {
    id: string;
    name: string;
}
interface signup {
    email: string;
    password: string;
    firstName: string;
}

interface city {
    id: string;
    name: string;
}
interface origin {
    id: string;
    name: string;
}
const SignupScreen: React.FC<Props> = ({}) => {

    const state = useSelector((state: RootState) => {
        state.signup
    })
    const dispatch = useDispatch();

    const [birthday, setBirthday] = React.useState<birthday>({
        date: '',
        month: '',
        year: '',
    });
    const [entity, setEntity] = React.useState<string>('');
    const [origin, setOrigin] = React.useState<origin>({
        id: '',
        name: '',
    });
    const [from, setFrom] = React.useState<string>('');
    const [region, setRegion] = React.useState<region>({
        id: '',
        name: '',
    });
    const [zipcode, setZipCode] = React.useState<string>('');
    const [city, setCity] = React.useState<city>({
        id: '',
        name: '',
    });
    const [signup, setSignup] = React.useState<signup>({
        email: '',
        password: '',
        firstName: '',
    });
    const [checkZipCode, setCheckZipCode] = React.useState<boolean>(false);
    const [country, setCountry] = React.useState({
        id: '',
        name: '',
        zipFormat: '',
        zipRegex: '',
    });
    const screen = [
        'entity',
        'birthday',
        'origin',
        'from',
        'country',
        'region',
        'zipcode',
        'city',
        'signup',
    ];
    function convertDateandMonth(value) {
        return value < 10 ? '0' + value.toString() : value.toString();
    }
    const [nextScreen, setNextScreen] = React.useState('entity');
    const handleNextScreen = (screen) => {
        setNextScreen(screen);
    };
    const convertYearMonthDate = (birthday) => {
        return `${birthday.year}-${convertDateandMonth(birthday.month)}-${convertDateandMonth(
            birthday.date
        )}`;
    };
    const convertSex = (gender) => {
        return gender === 'Female' ? 2 : 1;
    };
    const handleSignup = async (data) => {
        const formData = new FormData();

        formData.append('firstName', data.firstName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('affiliate', 1);
        formData.append('mailing', 1);
        formData.append('birthday', convertYearMonthDate(birthday));
        formData.append('gender', convertSex(entity));
        formData.append('origin', origin.id);
        formData.append('geoname_id', city.id);

        dispatch(actions.postSignupRequest(formData));
        // let payload = {
        //     firstName: data.firstName,
        //     email: data.email,
        //     password: data.password,
        //     affiliate: 1,
        //     mailing: 1,
        //     birthday: ,
        //     gender: entity === 'Female' ? 2 : 1,
        //     origin: origin.id,
        //     geoname_id: city.id,
        // };
    };
    React.useEffect(() => {
        if (country.zipFormat && country.zipRegex) {
            setCheckZipCode(true);
        } else {
            setCheckZipCode(false);
        }
    }, [signup]);
    return (
        <LinearGradient colors={['#FF3359', '#FF7A2D', '#FF59F4', '#FF5978']} style={styles.body}>
            {nextScreen === 'entity' && (
                <EntityForm
                    submitEntity={setEntity}
                    setRender={(screen) => handleNextScreen(screen)}
                />
            )}

            {nextScreen === 'birthday' && (
                <BirthdayForm
                    submitBirthday={setBirthday}
                    setRender={(screen) => handleNextScreen(screen)}
                />
            )}

            {nextScreen === 'origin' && (
                <OriginForm
                    submitOrigin={setOrigin}
                    setRender={(screen) => handleNextScreen(screen)}
                />
            )}

            {nextScreen === 'from' && (
                <FromForm submitFrom={setFrom} setRender={(screen) => handleNextScreen(screen)} />
            )}

            {nextScreen === 'country' && (
                <CountryForm
                    submitCountry={setCountry}
                    setRender={(screen) => handleNextScreen(screen)}
                />
            )}

            {nextScreen === 'region' && (
                <RegionForm
                    submitRegion={setRegion}
                    setRender={(screen) => handleNextScreen(screen)}
                    countryId={country.id}
                />
            )}

            {nextScreen === 'zipcode' && (
                <ZipCodeForm
                    zipCodeFormat={country.zipFormat}
                    zipCodeRegex={country.zipRegex}
                    submitZipCode={setZipCode}
                    setRender={(screen) => handleNextScreen(screen)}
                />
            )}
            {nextScreen === 'city' && (
                <CityForm
                    checkzipcode={checkZipCode}
                    submitCity={setCity}
                    countryId={country.id}
                    params={checkZipCode ? zipcode : region.id}
                    setRender={(screen) => handleNextScreen(screen)}
                />
            )}
            {nextScreen === 'signup' && (
                <SignUpForm
                    submitSignupForm={handleSignup}
                    setRender={(screen) => handleNextScreen(screen)}
                />
            )}
            {nextScreen === 'discovery' && <Discovery />}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between',
    },
    backButton: {
        marginLeft: 15,
    },
    textHeader: {
        color: '#ffffff',
        fontSize: 22,
        marginRight: 5,
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },
    textHeaderUnderLine: {
        color: '#ffffff',
        fontSize: 17,
        marginRight: 5,
        textDecorationLine: 'underline',
        textAlignVertical: 'center',
    },
    View: {
        flexDirection: 'row',
    },
});

export default SignupScreen;

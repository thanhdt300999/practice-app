import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconButton, Checkbox, RadioButton, Button } from 'react-native-paper';
import Text from '../../../../assets/AppText';
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

interface Props {
    navigation: Object;
}
interface birthday {
    date: number;
    month: number;
    year: number;
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
const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [birthday, setBirthday] = React.useState({});
    const [entity, setEntity] = React.useState<string>('');
    const [origin, setOrigin] = React.useState<string>('');
    const [from, setFrom] = React.useState<string>('');
    const [region, setRegion] = React.useState<region>({
        id: '',
        name: '',
    });
    const [zipcode, setZipCode] = React.useState<string>('');
    const [city, setCity] = React.useState<string>('');
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
    const [nextScreen, setNextScreen] = React.useState('signup');
    const handleNextScreen = (screen) => {
        setNextScreen(screen);
    };
    React.useEffect(() => {
        console.log(region);
        if (country.zipFormat && country.zipRegex) {
            setCheckZipCode(true);
        } else {
            setCheckZipCode(false);
        }
    }, [country, region]);
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
                    regionId={region.id}
                    setRender={(screen) => handleNextScreen(screen)}
                />
            )}
            {nextScreen === 'signup' && (
                <SignUpForm
                    submitSignupForm={setSignup}
                    setRender={(screen) => handleNextScreen(screen)}
                />
            )}
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

export default HomeScreen;

import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacityBase,
    TouchableOpacity,
    Pressable,
    Alert,
    Modal,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { Button } from 'react-native-paper';
import Text from '../../../../assets/AppText';
import { useNavigation } from '@react-navigation/native';
import AuthForm from './AuthForm';
import { useSelector } from 'react-redux';
export interface Props {}

const SigninScreen: React.FC<Props> = ({}) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const state = useSelector((state: any) => state.signin);
    const navigation = useNavigation();
    const handleNavigate = () => {
        navigation.navigate('SignupFlow', {screen: 'Entity'});
    };
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Button
                            style={styles.buttonClose}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            X
                        </Button>
                        <AuthForm modalVisible={modalVisible} />
                    </View>
                </View>
            </Modal>
            {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
                <ImageBackground
                    source={require('../../../../image/Capture.png')}
                    style={styles.image}
                >
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../../../image//logo-large.png')}
                    />
                    <Text style={styles.textBanner}>
                        L'application numero 1 de la rencontre Musulmane et Maghrebine
                    </Text>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('abc');
                                setModalVisible(true);
                            }}
                        >
                            <Text style={styles.textSignin}>SE CONNECTER</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleNavigate}>
                            <Text style={{ color: '#ffffff' }}>INSCRIPTION GRATUITE</Text>
                            <Text style={{ color: '#ffffff' }}>EN 1 MIN</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            {/* </KeyboardAvoidingView> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    tinyLogo: {
        alignSelf: 'center',
        width: 300,
        resizeMode: 'contain',
        marginTop: 300,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    textBanner: {
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center',
    },
    textSignin: {
        color: 'white',
        textDecorationLine: 'underline',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 35,
    },
    button: {
        marginLeft: 30,
        backgroundColor: 'green',
        height: 50,
        borderRadius: 5,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        flexWrap: 'wrap',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        marginTop: 200,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '100%',
        height: '100%',
        padding: 35,
        alignItems: 'center',
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        position: 'absolute',
        top: 0,
        backgroundColor: 'transparent',
        fontSize: 50,
        alignSelf: 'flex-end',
        borderRadius: 25,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default SigninScreen;

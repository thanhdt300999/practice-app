import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    // Text,
    Dimensions,
} from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import Text from '../../../../assets/AppText';
import { useNavigation } from '@react-navigation/native';
import AuthForm from './AuthForm';
import { useSelector } from 'react-redux';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export interface Props {}
const SigninScreen: React.FC<Props> = ({}) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const state = useSelector((state: any) => state.signin);
    const navigation = useNavigation();
    const handleNavigate = () => {
        navigation.navigate('SignupFlow', { screen: 'Entity' });
    };
    const [modalHeight, setModalHeight] = React.useState(height * 0.5);
    const [showButton, setShowButton] = React.useState(true);
    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setModalHeight(height * 0.2); // or some other action
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setModalHeight(height * 0.5); // or some other action
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);
    React.useEffect(() => {
        const timer = setTimeout(() => setShowButton(!showButton), 500);
        return () => {
            clearTimeout(timer);
        };
    }, [modalVisible]);
    return (
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    {showButton && (
                        <IconButton
                            icon="close"
                            color="#ffffff"
                            size={20}
                            style={{
                                position: 'absolute',
                                alignSelf: 'flex-end',
                                right: 10,
                                top: height * 0.05,
                                zIndex: 1000,
                            }}
                            onPress={() => setModalVisible(!modalVisible)}
                        />
                    )}
                    <View style={styles.centeredView}>
                        <View style={[styles.modalView, { marginTop: modalHeight }]}>
                            {/* <Button
                                style={styles.buttonClose}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                X
                            </Button> */}
                            <AuthForm modalVisible={modalVisible} />
                        </View>
                    </View>
                </Modal>
                <ImageBackground
                    source={require('../../../../image/Capture.png')}
                    style={styles.image}
                >
                    <View style={styles.banner}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../../../../image//logo-large.png')}
                        />
                        <Text style={styles.textBanner}>
                            L'application numero 1 de la rencontre Musulmane et Maghrebine
                        </Text>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(true);
                            }}
                        >
                            <Text style={styles.textSignin}>SE CONNECTER</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleNavigate}>
                            <Text style={{ color: '#ffffff', fontSize: height * 0.02 }}>
                                INSCRIPTION GRATUITE
                            </Text>
                            <Text style={{ color: '#ffffff' }}>EN 1 MIN</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    tinyLogo: {
        alignSelf: 'center',
        width: width * 0.8,
        resizeMode: 'contain',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    textBanner: {
        color: '#ffffff',
        fontSize: height * 0.03,
        textAlign: 'center',
    },
    textSignin: {
        color: 'white',
        textDecorationLine: 'underline',
        fontSize: height * 0.02,
        fontWeight: 'normal'
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
        height: height * 0.08,
        borderRadius: 5,
        width: width * 0.5,
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
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    banner: {
        marginTop: height * 0.35,
    },
});

export default SigninScreen;

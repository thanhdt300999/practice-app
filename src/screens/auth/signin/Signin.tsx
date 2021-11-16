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
    Platform,
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
    const [modalHeight, setModalHeight] = React.useState(height * 0.8);
    const [showButton, setShowButton] = React.useState(true);
    const [disableClose, setDisableClose] = React.useState(false);
    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
            setDisableClose(true);
            setModalHeight(Platform.OS === 'ios' ? height * 0.1 : 0); // or some other action
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setModalHeight(height * 0.8);
            setDisableClose(false);
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
    React.useEffect(() => {}, [state.isLoading]);
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
                {modalVisible && !disableClose && (
                    <IconButton
                        disabled={disableClose}
                        icon="close"
                        color="#ffffff"
                        size={30}
                        style={{
                            position: 'absolute',
                            alignSelf: 'flex-end',
                            right: 10,
                            top: Platform.OS === 'android' ? 0 : height * 0.05,
                            zIndex: 1,
                        }}
                        onPress={() => {
                            setShowButton(false);
                            setModalVisible(!modalVisible);
                        }}
                    />
                )}
                <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                    <View style={styles.centeredView}>
                        <View style={[styles.modalView, { marginTop: modalHeight }]}>
                            <AuthForm
                                modalVisible={modalVisible}
                                onRequestClose={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <ImageBackground source={require('../../../../image/Capture.png')} style={styles.image}>
                <View style={styles.banner}>
                    <Image
                        style={styles.imageBanner}
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    imageBanner: {
        alignSelf: 'center',
        width: width * 0.75,
        resizeMode: 'contain',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    textBanner: {
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? height * 0.025 : height * 0.03,
        textAlign: 'center',
        width: width * 0.8,
    },
    textSignin: {
        color: 'white',
        textDecorationLine: 'underline',
        fontSize: height * 0.02,
    },
    footer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 35,
    },
    button: {
        marginLeft: width * 0.15,
        backgroundColor: '#24cf5f',
        height: height * 0.065,
        borderRadius: 5,
        width: width * 0.45,
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
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
        marginTop: height * 0.45,
        alignItems: 'center',
    },
});

export default SigninScreen;

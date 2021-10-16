import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacityBase, TouchableOpacity, Pressable, Alert, Modal } from 'react-native';
import { Button } from 'react-native-paper'
import Text from '../../../../assets/AppText'
import AuthForm from './AuthForm';
export interface Props {
    title?: String
};

const LogIn: React.FC<Props> = ({ }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);


    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                
                <View style={styles.centeredView}>
                
                    <View style={styles.modalView}>
                    <Button style={styles.buttonClose}  onPress={() => setModalVisible(!modalVisible)}>X</Button>
                        <AuthForm
                        />
                    </View>
                </View>
            </Modal>
            <ImageBackground source={require('../../../../image/Capture.png')} style={styles.image}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../../../image/logo-large.png')}
                />
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={() => { setModalVisible(true)}}
                    >
                        <Text style={styles.text}>SE CONNECTER</Text>
                    </TouchableOpacity>
                    <Button mode="contained" color='green' uppercase={false} contentStyle={styles.buttonStyle} style={styles.button} onPress={() => console.log('Pressed')}>
                        <Text>INSCRIPTION GRATUITE</Text>
                        <Text>en 1 min</Text>
                    </Button>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 50,
    },
    tinyLogo: {
        alignSelf: 'center',
        flex: 1,
        width: 300,
        height: null,
        resizeMode: 'contain'
    },
    image: {
        height: "100%",
        width: "100%"
    },
    text: {
        color: "white",
        textDecorationLine: 'underline',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        marginBottom: 250,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    button: {
        marginLeft: 30,
        color: 'green',
        flexDirection: 'row'
    },
    buttonStyle: {
        flexWrap: 'wrap'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        marginTop: 400,
        backgroundColor: "white",
        borderRadius: 20,
        width: "100%",
        height:"100%",
        padding: 35,
        alignItems: "center",
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        fontSize: 50,
        alignSelf: 'flex-end',
        borderRadius: 25
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default LogIn;
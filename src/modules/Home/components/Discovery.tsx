import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from '../../../../assets/AppText';
import { useForm, Controller } from 'react-hook-form';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-vector-icons/Icon';
interface Props {}

const Discovery: React.FC<Props> = ({}) => {
    const [checked, setChecked] = React.useState('unchecked');
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    return (
        <>
            <Image style={styles.image} source={require('../../../../image/menuBar.jpg')} />
            <View style={styles.banner}>
                <Text style={styles.textHeader}>Votre Recherche</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <Text>CRITERES</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 180,
    },
    banner: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 25,
        justifyContent: 'space-between'
    },
    headerButton: {
        width: 150,
        borderRadius: 10,
        height: 50,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textHeader: {
        fontSize: 22,
        fontWeight: 'bold'
    }
});

export default withNavigation(Discovery);

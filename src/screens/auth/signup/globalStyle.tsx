import { Dimensions, Platform, StyleSheet } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const marginTop = Platform.OS === 'ios' ? height * 0.06 : height * 0.04;
export default StyleSheet.create({
    iconStyle: {
        height: height * 0.1,
        width: height * 0.1,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ffffff',
        borderWidth: 2,
        marginBottom: height * 0.03,
    },
    textFormStyle: {
        fontSize: height * 0.03,
        color: '#FFFFFF',
    },
    header: {
        alignItems: 'center',
        marginBottom: height * 0.03,
        marginHorizontal: 5,
        marginTop: marginTop,
    }
});

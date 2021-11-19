import { Dimensions, Platform, StyleSheet } from 'react-native';

const height: number = Dimensions.get('window').height;
const width: number = Dimensions.get('window').width;
const marginTop: number = Platform.OS === 'ios' ? height * 0.06 : height * 0.04;
export default StyleSheet.create({
    iconStyle: {
        height: height * 0.1,
        width: height * 0.1,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ffffff',
        borderWidth: 2,
        marginBottom: height * 0.03,
    },
    textFormStyle: {
        fontSize: width * 0.06,
        color: '#FFFFFF',
    },
    header: {
        alignItems: 'center',
        marginBottom: height * 0.03,
        marginHorizontal: 5,
        marginTop: marginTop,
    },
    styleCheckbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    textCheckbox: {
        fontSize: height * 0.025,
        color: '#FFFFFF',
        alignSelf: 'center',
    }
});

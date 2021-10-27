import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
const api = axios.create({
    baseURL: 'https://api.ltservices2.ovh/v4',
});
const getAuthData = async () => {
    try {
        let token = await AsyncStorage.getItem('token');
        let puk = await AsyncStorage.getItem('puk');
        return {
            token,
            puk,
        };
    } catch (error) {
        return {
            error: error,
        };
    }
};
const getUsers = async () => {
    const { token, puk } = await getAuthData();
    return api
        .get('/users/pool', {
            headers: {
                'x-asgard-puk': puk,
                'x-asgard-token': token,
            },
        })
        .then((response) => {
            return {
                listUsers: response.data.CONTENT.USERS,
            };
        })
        .catch((err) => {
            console.log(err);
        });
};

export default {
    getUsers,
};

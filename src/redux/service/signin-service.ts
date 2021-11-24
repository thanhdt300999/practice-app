import api from '../../api/api';

function login(data, email) {
    let formData = new FormData();
        formData.append('login', data.email);
        formData.append('password', data.password);
        formData.append('validitySeconds', 1000);
    return api
        .post(`/${email}.json`, formData)
        .then((response) => {
            return {
                token: response.data.CONTENT.token,
                puk: response.data.CONTENT.puk,
                user: response.data.CONTENT.USER,
            };
        })
        .catch((err) => {
            console.log(err);
        });
}

export default {
    login,
};

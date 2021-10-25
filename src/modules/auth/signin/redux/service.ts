import api from '../../../../api/api'

function login(data, email) {
    return api.post(`/${email}.json`, data)
        .then(response => {
            return {
                token: response.data.CONTENT.token,
                puk: response.data.CONTENT.puk,
                user: response.data.CONTENT.USER
            };
        })
        .catch(err => {
            console.log(err);
        });
}

export default {
    login,
};
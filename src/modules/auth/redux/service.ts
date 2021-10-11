import api from '../../../api/api'

function login(data, email) {
    return api.post(`${email}.json`, data)
        .then(response => {
            // console.log(response.data)
            return {
                access_token: response.data.CONTENT.token,
                puk: response.data.CONTENT.puk,
                user: response.data.CONTENT.USER
            };
        })
        .catch(err => {
            console.log("api login fail");
        });
}

export default {
    login,
};
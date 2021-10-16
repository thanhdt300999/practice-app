import api from '../../../api/api'

function getCountries() {
    return api.get('/v4/atlas/countries')
        .then(response => {
            return {
                listCountries: response.data.CONTENT.ALL.countries
            };
        })
        .catch(err => {
            console.log(err);
        });
}

export default {
    getCountries,
};
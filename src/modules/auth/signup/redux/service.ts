import axios from 'axios';
const api = axios.create({
    baseURL: 'https://api.ltservices2.ovh',
});
function getCountries() {
    return api
        .get('/v4/atlas/countries')
        .then((response) => {
            return {
                listCountries: response.data.CONTENT.ALL.countries,
            };
        })
        .catch((err) => {
            console.log(err);
        });
}
function getRegions(data) {
    return api
        .get(`/v4/atlas/${data}/regions`)
        .then((response) => {
            return {
                listRegions: response.data.CONTENT.regions,
            };
        })
        .catch((err) => {
            console.log(err);
        });
}

function getCitiesByRegion(data) {
    return api
        .get(`/v4/atlas/${data.countryId}/${data.regionId}/cities`)
        .then((response) => {
            return {
                listCities: response.data.CONTENT.ALL.cities,
            };
        })
        .catch((err) => {
            console.log(err);
        });
}

function getCitiesByZipcode(data) {
    return axios
        .get(`/v4/atlas/${data.countryId}/${data.zipcode}/zipcode/cities`)
        .then((response) => {
            return {
                listCities: response.data.CONTENT.cities,
            };
        })
        .catch((err) => {
            console.log(err);
        });
}

function postSignup(data) {
    return axios
        .post(`/v4/api/pool/.json`, {
            params: {
                new_key_signup: true,
            },
            data: data,
        })
        .then((response) => {
            return {
                listCities: response.data.CONTENT.cities,
            };
        })
        .catch((err) => {
            console.log(err);
        });
}

export default {
    getCountries,
    getRegions,
    getCitiesByRegion,
    getCitiesByZipcode,
    postSignup,
};

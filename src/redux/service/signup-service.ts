import axios from 'axios';
const api = axios.create({
    baseURL: 'https://api.ltservices2.ovh',
});
const api2 = axios.create({
    baseURL: 'https://apiv2.ltservices2.ovh',
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
            console.log("err region");
        });
}

function getCitiesByZipcode(data) {
    return api
        .get(`/v4/atlas/${data.countryId}/${data.zipcode}/zipcode/cities`)
        .then((response) => {
            return {
                listCities: response.data.CONTENT.cities,
            };
        })
        .catch((err) => {
            console.log("err zipcode");
        });
}

function getCitiesByGeo(data) {
    return api
        .get(`/v4/atlas/location`, {
            params: {
                latitude: data.latitude,
                longitude: data.longitude,
                unit: 'DEG',
            },
        })
        .then((response) => {
            return {
                listCities: response.data.CONTENT.cities,
            };
        })
        .catch((err) => {
            console.log("err geo");
        });
}

function postSignup(data) {
    return api2
        .post(`/pool/.json?new_key_signup=true`, data)
        .then((response) => {
            return {
                puk: response.data.CONTENT.AUTH.puk,
                token: response.data.CONTENT.AUTH.token,
                uuid: response.data.CONTENT.AUTH.uuid,
            };
        })
        .catch((err) => {
            console.log(err)
        });
}

export default {
    getCountries,
    getRegions,
    getCitiesByRegion,
    getCitiesByZipcode,
    postSignup,
    getCitiesByGeo,
};

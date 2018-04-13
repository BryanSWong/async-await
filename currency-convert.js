// api key = 4dd0e35948d9f37ff4b900cde38de09a

const axios = require('axios');

const getExhangeRate = (from, to) => {
    return axios.get (`http://api.fixer.io/latest?base=${from}`).then((response) => {
        return response.data.rates[to];
    });
};

const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
        return response.data.map((country) => country.name);
    });
};

const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to).then((tempcountries) => {
        countries = tempcountries;
        return getExhangeRate(from, to);
    }).then((rate) => {
        const exchangedAmount = amount * rate;

        return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
    });
};

convertCurrency('USD', 'CAD', 100).then((status) => {
    console.log(status);
});

// getExhangeRate('USD', 'EUR').then((rate) => {
//     console.log(rate);
// });

// getCountries('CAD').then((countries) => {
//     console.log(countries);
// });
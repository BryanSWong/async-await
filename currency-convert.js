// api key = 4dd0e35948d9f37ff4b900cde38de09a

const axios = require('axios');

const getExhangeRate = async (from, to) => {
    try{
        const response = await axios.get (`http://api.fixer.io/latest?base=${from}`);
        const rate = response.data.rates[to];

        if(rate){
            return rate;
        } else {
            throw new Error();
        }
    } catch (e){
        throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
    }

};

const getCountries = async (currencyCode) => {
    try{
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch(e){
        throw new Error(`Unable to get countries that use ${currencyCode}.`);
    }

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



const convertCurrencyAlt = async (from, to, amount) => {
    const countries = await getCountries(to);
    const rate = await getExhangeRate(from, to);

    const exchangedAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
}

convertCurrencyAlt('USD', 'EUR', 100).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log(e.message);
});

// convertCurrency('USD', 'CAD', 100).then((status) => {
//     console.log(status);
// });

// getExhangeRate('USD', 'EUR').then((rate) => {
//     console.log(rate);
// });

// getCountries('CAD').then((countries) => {
//     console.log(countries);
// });
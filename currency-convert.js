
const axios = require('axios');

const getExchangeRate = (from,to) => {
    return axios.get(`http://api.fixer.io/latest?base=${from}`).then((response) => {
        return response.data.rates[to];
    })
}


const getCountries = (countryCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${countryCode}`).then((response) => {
        return response.data.map((country) => country.name);
    });
}

const convertCurrency = (from,to,amount) => {
    let countries;
    return getCountries(to).then((tempcountries) => {
        countries = tempcountries;
        return getExchangeRate(from,to).then((rate) => {
            const exchangeAmount = amount * rate;
            return `${amount} ${from} is worth ${exchangeAmount} ${to}.
             ${to} can be used in the following countries: ${countries.join(', ')}`
        })
    })
}

const convertCurrencyAlt = async (from,to,amount) => {
    let countries = await getCountries(to);
    let rate = await getExchangeRate(from,to);
    let exchangeAmount = amount * rate;
    return `${amount} ${from} is worth ${exchangeAmount} ${to}.
    ${to} can be used in the following countries: ${countries.join(', ')}`
}

convertCurrencyAlt('CAD','USD' ,100).then((status) => {
    console.log(status);
})

// getCountries('usd').then((countries) => {
//     console.log(countries);
// }).catch((e) => {
//     console.log(e);
// });

// getExchangeRate('USD','CAD').then((rate) => {
//     console.log(rate);
// })
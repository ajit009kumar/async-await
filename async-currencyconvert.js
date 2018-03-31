

const axios = require('axios');

const getExchangeRate = async (from,to) => {

    try {
        
        const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
        const rate =  response.data.rates[to];
        if(rate){
            return rate;
        }
        else{
            throw new Error();
        }
    }

    catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}.`)
    }

}


const getCountries = async (countryCode) => {

    try{
        const response =  await axios.get(`https://restcountries.eu/rest/v2/currency/${countryCode}`)
        return response.data.map((country) => country.name);
    }
    catch (e){
        throw new Error(`Unable to find the countries that use ${countryCode}`);

    }
}

const convertCurrencyAlt = async (from,to,amount) => {
    let countries = await getCountries(to);
    let rate = await getExchangeRate(from,to);
    let exchangeAmount = amount * rate;
    return `${amount} ${from} is worth ${exchangeAmount} ${to}.
    ${to} can be used in the following countries: ${countries.join(', ')}`
}


convertCurrencyAlt('USD','CAD' ,100).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log(e.message);
})



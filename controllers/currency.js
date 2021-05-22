const fetch = require('node-fetch')

const getIt = async() => {
    const res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    return await res.json();
}

module.exports.getCurrency = async(req, res) => {
    const rates = await getIt();
    res.json({
        rates: rates // курсы валют
    })
}

const request = require('../../node_modules/request')  //('../node_modules/request')

const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d2f4d98920b842cf09839de5848ba3ab&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long)
    //request({url: url, json: true}, (error, response) => {
    request({url, json: true}, (error, {body} = {}) => {
        if (error) 
            callback('Unable to connect to the Weatherstack server', undefined)
        else if (body.error) {
        //else if (response.body.success === false)
            //callback('Unable to fetch weather details for the location specified', undefined)
            callback(body.error.info, undefined)
        }
        else {
            //callback(undefined, response.body.current.weather_descriptions[0] + '.\nThe temperature is ' + response.body.current.temperature + ' degrees. There is a ' + response.body.current.precip + ' chance of rainfall.')
            callback(undefined, body.current.weather_descriptions[0] + '.\nThe temperature is ' + body.current.temperature + ' degrees. There is a ' + body.current.precip + ' chance of rainfall.')
        }
    })
}

module.exports = forecast

/* const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d2f4d98920b842cf09839de5848ba3ab&query=' + latitude + ',' + longitude + '&units=f'

    request({url: url, json: true}, (error, response) => {
    if (error) {
        callback('Unable to connect with weather service', undefined)
    }
    else if (response.body.error) {
        callback('Unable to find location', undefined)
    }
    else {
        callback(undefined, console.log(response.body.current.weather_descriptions[0] + ': It is', response.body.current.temperature, 'degrees out there. There\'s a ', response.body.current.precip, 'chance of rain'))
    }
    })
}

module.exports = forecast */


// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

/* forecast(-75.7088, 44.1545, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  }) */
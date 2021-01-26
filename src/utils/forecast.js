const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f22a052bc91beb51f7ca7ebd890c8b71&query='+latitude+','+longitude+'&units=f'

    request({url, json:true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0]+'.\n Its currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out.\n Humidity is '+body.current.humidity)
        }
    })
}

module.exports = forecast

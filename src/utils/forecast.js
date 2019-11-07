const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/05687e8e3ba4b216803a33dd4f485bbd/' + latitude + ',' + longitude + '?units=si'
    request({ url, json: true}, (err, {body} = {} ) => {
        if(err){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('Unable to find wheater information',undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' celsius degrees out. There is a '+ body.currently.precipProbability+ '% chance of rain.' + ' Daily high is ' + body.daily.data[0].temperatureHigh + ' and low is '+ body.daily.data[0].temperatureLow + '.')
        }
    })
}

module.exports = forecast
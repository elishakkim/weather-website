const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1ab2e4dfad6589cb4b97946cd5792a23/' + latitude + ',' + longitude +'?units=us&limit=1'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location! Try another search.', undefined)
        } else {
            console.log(body.daily)
            callback(undefined, body.daily.data[0].summary + ' Today\'s high is near ' + body.daily.data[0].temperatureHigh + ' and low is around ' + body.daily.data[0].temperatureLow + '. It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hpa2hhci1zcmoiLCJhIjoiY2trOXMzdGptMTBybTJvbnh0c2x3Z2p0cyJ9.npFuRW_BFLXUa3Y3PDG9nA&limit=1'

    request({url, json:true}, (error, { body } = {})=>{
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Not Found anything related to your search', undefined) 
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
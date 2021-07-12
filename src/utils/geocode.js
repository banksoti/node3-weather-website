const request = require('../../node_modules/request')


const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmFua3NvdGkiLCJhIjoiY2txbTYzc3R1MHhwdzJ5cGhxajlzMGtoYSJ9.3Kg02vhJ4IZ2iFiHAz15gA&limit=1'
    request({url, json: true}, (error, {body} = {}) => {
    //request({url: url, json: true}, (error, response) => {
        //const data = {longitude:undefined, latitude: undefined}
        if (error) {
            //console.log('Could not connect to the Mapbox server.')
            callback('Could not connect to the Mapbox server.', undefined)
        }
        else if (body.features === undefined) {
        //else if (response.body.features === undefined) {
            //console.log('Unable to provide coordinates for the location specified.')
            callback('Could not map the provided location. Try a different search.', undefined)
        }
        else {
            // callback(undefined, {response.body.features[0].center[0], response.body.features[0].center[1], response.body.features[0].place_name})
            //callback(undefined, [response.body.features[0].center[0], response.body.features[0].center[1], response.body.features[0].place_name])
            callback(undefined, [body.features[0].center[0], body.features[0].center[1], body.features[0].place_name])
        }
    })
}

/* geocode('Michigan', (error, data) => {
    console.log('Error:', error)
    console.log('Data:', data)
}) */

module.exports = geocode
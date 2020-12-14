const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiY3lib3JnMTAwIiwiYSI6ImNraWJlY3NmYTB5cDkyeW81MDZsdWlmcjEifQ.kt8OqmDMJq4pyOuOyWtVsQ&limit=1'

    request({url : url, json : true},(error,response)=>{
    if(error)
    {
    callback('Unable to connect to location services',undefined)
    }
    else if(response.body.features.length===0){
        callback('Unable to find location. Try another search!',undefined)
    }
    else{
        const data = response.body
        //console.log('latitdue: '+ latitude+ "\n"+ 'longitude:'+ longitude)
        callback(undefined,{
            latitude: data.features[0].center[1],
            longitude: data.features[0].center[0]
        })
        }

    })

}




module.exports = geocode
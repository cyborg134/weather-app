const request = require('request')

const forecast = (lat,lon,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=996b0d0ffcc07bddb1b9ad779163bee4&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon)

    request({url: url, json:true},(error,response)=>{
        if(error)
    {
        callback('Unable to connect to weather service!',undefined)
    }
    else if(response.body.error){
        callback('unable to find location',undefined)
    }
    else{
        //const data = JSON.parse(response.body)
    const data = response.body
    //console.log('It is currently ' + temparature + ' degress out. There is a '+ precip_prob + '% chance of rain.')
    callback(undefined,{
        temperature : data.current.temperature,
        precip_prob : data.current.precip
    })
    }
    })
}

module.exports = forecast
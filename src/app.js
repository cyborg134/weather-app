const path = require('path')
const express = require('express')
const { dirname } = require('path')
const hbs = require('hbs')
const geocode = require('./Utils/geocode')
const forecasr = require('./Utils/forecast')
const forecast = require('./Utils/forecast')

console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirpath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dir to use
app.use(express.static(publicDirpath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Pradeep'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Pradeep'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        name: 'Pradeep'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude}={})=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecasedata)=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast: 'It is currently '+ forecasedata.temperature+ ' degress out. There is a '+ forecasedata.precip_prob+ ' chance of rain.',
                address: req.query.address
            })
        })

    })

    // res.send({
    //     forecase: '',
    //     location: 'karur',
    //     address: req.query.address
    // })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 not found',
        name: 'Pradeep',
        errormsg: 'missing article'

    })
})

app.get('/*',(req,res)=>{
    res.render('404',{
        title: '404 not found',
        name: 'Pradeep',
        errormsg: 'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up and listening on port ' + port)
})
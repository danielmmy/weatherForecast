const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Danielmmy'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Danielmmy'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'Help',
        name: 'Danielmmy'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send( {
            error: 'An address must be provided'
        })
    }

    geocode(req.query.address, (err, {latitude, longitude, location} = {} ) => {
        if(err){
            return res.send({err})
        }
        forecast(latitude, longitude, (err, forecastData) => {
            if(err){
                return res.send({err})
            }
            
            return res.send( { 
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })  
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: 'Help Error Page',
        name: 'Danielmmy',
        error: 'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('error',{
        title: 'Error Page',
        name: 'Danielmmy',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
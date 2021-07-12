const path = require('path')
const express = require('../node_modules/express')
const hbs = require('../node_modules/hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

//Set up path(s) for express configuration
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up public directory to serve
app.use(express.static(path.join(__dirname, '../public')))



app.get('', (req, res) => {
    res.render('index.hbs', {
        title: 'PRF Generator Web App',
        name: 'PRF Generator Home Page'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About PRF Generator Web App',
        name: 'PRF Generator About Page'
    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        name: 'PRF Generator Help Page',
        title: 'Help Notes',
        helpText: 'This page is intended to provide you with some help regarding using this web app'
    })
})

app.get('', (req, res) => {
    res.send('<h1>Hello Express!</h1>')
})

/* app.get('/help', (req, res) => {
    res.send([{
        name: "Andrew",
        age: 22
    }])
})

app.get('/about', (req, res) => {
    res.send('<h1>This is an application that helps you forecast the weather.</h1>')
})
  */
app.get('/Weather-App', (req, res) => {
    res.send({temperature: 37, 
    precip: 0,
    descriptions: [{forecast: "Bright and sunny", location: "Lagos"}, {min: 32, max: 37}],
    feelslike: 37})
})


app.get('/weather', (req, res) => {
    if (!req.query.location) {
        res.send({
            error: 'You need to provide a location for which a forecast is required.'
        })
    }
    else {
        /* res.send({
            forecast: 'It\'s snowing.',
            location: req.query.location
        }) */
        geocode(req.query.location, (error, data) => {
            if (error) {
                return res.send({
                    error
                })
                /* return console.log(error) */
            }
            forecast(data[1], data[0], (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
                /* return console.log(error) */
            }

            res.send({
                forecast: forecastData,
                location: data[2],
                desiredLocation: req.query.location
            })

                /* console.log('Location:', data[2])
                console.log('Forecast:', forecastData) */
            })
        })
        /* res.send({
            forecast: 'It\'s snowing.',
            location: req.query.location
        }) */
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You have to provide a search string'
        })
    }


    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    // res.send('No help found for the search term specified')
    res.render('404', {
        error: 'No help found for the search term specified.',
        title: 'Help Article Not Found'
    })
}) 


app.get('*', (req, res) => {
    //res.send('My 404 Error Page')
    res.render('404', {
        error: 'My 404 Error Page.',
        title: 'Page Not Found'
    })
})


app.listen('3000', () => {
    console.log('Server is up on Port 3000')
})
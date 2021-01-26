const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')


const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name:'Suraj'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:"Help",
        name:'Suraj'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name: 'Suraj'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address is missing"
        })
    }

    const address = req.query.address

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                'forecast':data,
                location,
                address
            })
        })
    })  
})

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: "You must provide a search term!"
//         })
//     }
    
//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: "Help article not found",
        name: "Suraj"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Page not found",
        name: 'Suraj'
    })
})

app.listen(3000, () => {
    console.log('The server is running on port 3000')
})
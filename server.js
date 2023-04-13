const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = 8080

app.use(bodyParser.json())

app.post('/api/register', async (req, res) => {
    //add a body parser
    console.log(req.body)
    res.json({status: 'ok'})
})





//my own stuff to actually run the page lol
app.use(express.static('views'))
app.use('/css', express.static(__dirname + 'views/css'))
app.use('/images', express.static(__dirname + 'views/images'))

//Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    //show the page entry.ejs
    res.render('entry')
})


//listen
app.listen(port, () => {
    console.log('Server Started on port: ' + port);
});
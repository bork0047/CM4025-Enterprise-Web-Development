const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const app = express()
const port = 8080

mongoose.connect('mongodb://127.0.0.1:27017')

app.use(bodyParser.json())

app.post('/api/register', async (req, res) => {
    //add a body parser to show the username and password
    console.log(req.body)

    //get the username and password 
    const { username, password } = req.body

    console.log(await bcrypt.hash(password, 10))

    // for security reasons HASH THE PASSWORDS
    //pass the passwords into a special encrypted function
    //special_function(Password) => rjgnenhh1243jbfdnjk
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
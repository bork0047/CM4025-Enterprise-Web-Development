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


app.post('api/login', async (res, req) => {
    res.json({ status: 'ok' })
})

app.post('/api/register', async (req, res) => {
    //add a body parser to show the username and password
    console.log(req.body)

    //get the username and password 
    const { username, password: plainTextPassword } = req.body

    //display some errors as criteria for username and password
    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', 
        error: 'Invalid username, must be a string'})
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', 
        error: 'Invalid password, must be a string'})
    }

    if (plainTextPassword.length < 5) {
        return res.json({ status: 'error', 
        error: 'Invalid password, password too smol. Should be atleast 6 characters'})
    }

    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await User.create({
            username,
            password
        })
        console.log('User created successfully: ' + response)
    } catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'There is already a user with that nickname' })
		}
		throw error
	}

    // for security reasons HASH THE PASSWORDS
    //pass the passwords into a special encrypted function
    //special_function(Password) => rjgnenhh1243jbfdnjk
    res.json({status: 'ok'})
})





//my own stuff to actually run the page lol
app.use(express.static('views'))
app.use('/css', express.static(__dirname + 'views/css'))
app.use('/images', express.static(__dirname + 'views/images'))
app.use(bodyParser.json())
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
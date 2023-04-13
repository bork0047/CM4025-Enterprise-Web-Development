const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const app = express()
const port = 8080

//if this is leaked, all of my json payloads can be manipulated
const JWT_SECRET = 'bangmyheadonthekeyboard@#@%!1243523efdgfhhsteagnkaerh'

mongoose.connect('mongodb://127.0.0.1:27017')

app.use(bodyParser.json())


app.post('/api/change-password', async (req, res) => {
    //make sure this token is not to be tampered with
	const { token, newpassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	try {
        //wrap it into try-catch, in case someone tries to be fishy
        //and to prevent crashes 
		const user = jwt.verify(token, JWT_SECRET)

		const _id = user.id

		const password = await bcrypt.hash(plainTextPassword, 10)

		await User.updateOne(
			{ _id },
			{
				$set: { password }
			}
		)
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}
})


//login api
app.post('/api/login', async (req, res) => {
    //check if username and password are correct
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})


//register api
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
    res.render('login')
})


//listen
app.listen(port, () => {
    console.log('Server Started on port: ' + port);
});
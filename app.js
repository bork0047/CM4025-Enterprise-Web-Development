//imports
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const app = express()
const port = 8080


//mongo time
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://test:borko@cluster0.zrzyyhw.mongodb.net/test";

const userSchema = {
    username: String,
    password: String,
}


const JWT_SECRET = 'bangmyheadonthekeyboard@#@%!1243523efdgfhhsteagnkaerh'

mongoose.connect('mongodb://127.0.0.1:27017')

app.use(bodyParser.json())

//for checking if databases work:
//const uri = "mongodb://127.0.0.1:27017";


var options = {
    index: "index.ejs"
  };


app.get('/api', function(req, res){
    res.send("Yes we have an API now")
})

// e.g. test using:
//http://127.0.0.1:8000/api/getPrice?salary=2000&days=20
app.get('/api/getPrice', function(req, res){
    //res.send("Hello world!")
    // Copied from front end
    var s = req.query.salary;
    var d = req.query.days;
    console.log("Calculating price")
    console.log(s)
    console.log(d)
    let finalPrice = 0;
    //dailyRate = s/365;
	fudge = Math.random() + 0.5;
    price = Math.round(s * d);
	fudgePrice = fudge * price;
    var roundToNearest = 50;
    roundedPrice = Math.round((fudgePrice+roundToNearest)/roundToNearest) * roundToNearest // Always round up
    res.send(""+roundedPrice)
});


app.get('/api/getCount', function(req, res) {
	console.log("Mongo uri is: " + uri)

	const client = new MongoClient(uri);
	const collection = client.db("DATAbased")
    async function run() {
		try {
			// Count the total documents
			collection.countDocuments($quotes).then((count_documents) => {
				console.log(count_documents);
			}).catch((err) => {
				console.log(err.Message);
			})  
		} finally {
			// Ensures that the client will close when you finish/error
			await client.close()
		}
		}
		run().catch(console.dir)
	
})

//close attempt for a delete quote function, most of the online
//most online help is
app.get('/api/deleteQuote', function(req, res){
	var n = req.query.quoteDelName
	console.log("Deleting quote: "+n)

	// Database stuff
    // Create a new MongoClient
    const client = new MongoClient(uri);
    client.connect(uri, function(err, db) {
		
		if (err) throw err;
		var dbo = client.db("DATAbased")
		var myobj = { quoteDelName: n}
		dbo.collection("quotes").deleteOne(myobj, function(err, obj) {
		  if (err) throw err;
		  console.log("1 document deleted");
		  db.close();
		});
	  });
})



//code for connecting to Mongo Database
app.get('/api/storeQuote', function(req, res){
    //res.send("Hello world!")
    // Copied from front end
    var n = req.query.quoteName
    var s = req.query.salary;
    var d = req.query.days;
    console.log("Storing quote: "+n+" "+s+" "+d)
    console.log("Mongo URI is "+uri)

    // Database stuff
    // Create a new MongoClient
    const client = new MongoClient(uri);
    async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        //await client.connect();
        // Establish and verify connection
        //await client.db("admin").command({ ping: 1 });
        //console.log("Connected successfully to server");
        console.log('Start the database stuff');
        //Write databse Insert/Update/Query code here..
        var dbo = client.db("DATAbased")
        var myobj = { quoteName: n, salary: s, days: d }
        await dbo.collection("quotes").insertOne(myobj, function(err, res) {
            if (err) {
                console.log(err);
                throw err
            }
            console.log("1 quote inserted")
        }); 
        console.log('End the database stuff')

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close()
    }
    }
    run().catch(console.dir)



    res.send("stored "+n)
})


//////////////////////////////////
//this is for register, login and change password

//if this is leaked, all of my json payloads can be manipulated

app.post('/api/change-password', async (req, res) => {
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

app.post('/api/login', async (req, res) => {
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

    if (await bcrypt.compare(password, user.password)) {
        return res.redirect('/entry')
    }


	res.json({ status: 'error', error: 'Invalid username/password' })
})

app.post('/api/register', async (req, res) => {
	const { username, password: plainTextPassword } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			username,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})






//my own stuff to actually run the page lol
app.use(express.static('views'))
app.use('/css', express.static(__dirname + 'views/css'))
app.use('/images', express.static(__dirname + 'views/images'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('/entry3.ejs'))

//Set Views
//app.set('views', './views')
app.set('views', './views')
app.set('view engine', 'ejs')

// register .html as an engine in express view system
app.engine('.html', require('ejs').renderFile)

app.get('', (req, res) => {
    //run the main page
    res.render('login')
})

app.get('/login', (req, res) => {
    //run the login.ejs page
    res.render('login')
})

app.get('/entry', (req, res) => {
    //run the entry.ejs page
    res.render('entry')
})

app.get('/index', (req, res) => {
    //run the index.ejs page
    res.render('index')
})

app.get('/thanks', (req, res) => {
    //run the thanks.ejs page
    res.render('thanks')
})

app.listen(port, () => {
    console.log('Server Started on port: ' + port);
});

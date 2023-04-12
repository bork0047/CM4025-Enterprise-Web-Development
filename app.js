//imports
const http = require('http')
const port = 8080
const fs = require('fs')
const express = require('express')
const app = express()

//mongo time
const { MongoClient } = require("mongodb");
const uri = "mongodb://test:borko@127.0.0.1:27017/DATAbased";

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
    dailyRate = s/365;
    price = Math.round(dailyRate * d);
    var roundToNearest = 50;
    roundedPrice = Math.round((price+roundToNearest)/roundToNearest) * roundToNearest // Always round up
    res.send(""+roundedPrice)
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
//this is for running the webpage
//app.use(express.static(dir, options))







//my own stuff to actually run the page lol
app.use(express.static('views'))
app.use('/css', express.static(__dirname + 'views/css'))
app.use('/images', express.static(__dirname + 'views/images'))

//Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('index')
})

/*
//json parser
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
    if(req.headers.token == 'NODEJSAPP') {
        req.skip == true;
    } else {
        req.skip = false;
    }
    next();
});

app.route('/auth').post((req, res) => {
    if(req.skip){
        res.send('OK, authenticated!')
    } else {
        res.send("No, can t access that");
    }
});

app.route('/').get((req, res) => {
    res.send('Hello World!');
});
*/
app.listen(port, () => {
    console.log('Server Started on port: ' + port);
});

/*
//connects the express-handlebard package and tells it to go look
//into the frontendd folder for the html files
app.set("frontendd", path.join(__dirname, "frontendd"))
app.engine(".hbs", exphbs({
    extname:".hbs",
    defaultLayout: false
}))
app.set("view engine", ".hbs")


app.get("/", function(req, res) {
    res.send('Index route is working')
})

//res.write("The date and time are currently: " + currentdate.myDateTime());
    //res.write( " \n")
    //var randomJoke = knockknock()
    //res.end(randomJoke);
    
app.listen(port, function(error){
    if (error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening on port ' + port)
    }
})

*/
//imports
const http = require('http')
const port = 8080
const fs = require('fs')
const express = require('express')
const app = express()

app.use(express.static('frontendd'))
app.use('/css', express.static(__dirname + 'frontendd/css'))
app.use('/js', express.static(__dirname + 'frontendd/js'))
app.use('/images', express.static(__dirname + 'frontendd/images'))

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
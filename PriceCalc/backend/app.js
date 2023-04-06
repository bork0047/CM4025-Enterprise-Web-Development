const http = require('http')
const port = 8080
const fs = require('fs')
var express = require('express')
var path = require('path')
var app = express()


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
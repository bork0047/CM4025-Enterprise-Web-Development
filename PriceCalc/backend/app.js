const http = require('http')
const port = 8080
const fs = require('fs')
var express = require('express')

var currentdate = require('./mydate');
var knockknock = require('knock-knock-jokes');


const server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'} );
    fs.readFile('C:/Users/USER/Desktop/EntWebSys/GITHUB-REPOSITORY/CM4025-Enterprise-Web-Development/PriceCalc/frontend/myWebPage.html', function(error, data) {
        if(error) {
            res.writeHead(404)
            res.write('Error: File Not Found')
        } else {
            res.write(data)
        } 
        res.end()
    })
})


//res.write("The date and time are currently: " + currentdate.myDateTime());
    //res.write( " \n")
    //var randomJoke = knockknock()
    //res.end(randomJoke);
    
server.listen(port, function(error){
    if (error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening on port ' + port)
    }
})
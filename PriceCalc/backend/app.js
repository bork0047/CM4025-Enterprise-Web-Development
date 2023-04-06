const http = require('http')
const port = 8080
var currentdate = require('./mydate');

const server = http.createServer(function(req, res){
    res.write('Hello Node')
    res.write("The date and time are currently: " + currentdate.myDateTime());
    res.end()
})

server.listen(port, function(error){
    if (error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening on port ' + port)
    }
})
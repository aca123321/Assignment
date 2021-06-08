var http = require('http');

var server = http.createServer((request, response) => {
    response.writeHead(200,
        {"Content-Type":"application/json"});
    response.end("{\"Name\":\"Aca\", \"Age\":22}");
});

server.listen(7000);

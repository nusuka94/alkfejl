var express = require('express');
var app = express();

app.use(function(req,res,next) {
    console.log(req.method + ' ' + req.url);
    next();
});

app.use(express.static('public'));

app.get('/',function(req,res) {
    res.end('Helloka');
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Elindult a szerver.');
});
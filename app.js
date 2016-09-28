var express = require('express');
var nunjucks = require('nunjucks');
var app = express();

nunjucks.configure('views', {
    express: app,
    autoescape: true
});

app.use(function(req,res,next) {
    console.log(req.method + ' ' + req.url);
    next();
});

app.get('/hello/:name',function (req,res){
    const name = req.params.name;
    res.render('master.njk', { name });
})

app.use(express.static('public'));

app.get('/',function(req,res) {
    res.end('Helloka');
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Elindult a szerver.');
});
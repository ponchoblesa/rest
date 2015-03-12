
var express = require("express"),
	app		= express(),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	mongoose = require("mongoose");

//Mongoo Database connection
mongoose.connect('mongodb://localhost/tvshows', function(err, res){
	if(err) throw err;
	console.log('Connected to the Database');
});

var models = require('./models/tvshows')(app, mongoose);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(function (req, res, next) {

//    res.setHeader('Access-Control-Allow-Origin', "*");

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//REST API
var TVShowCtrl = require('./controllers/tvshows');

var tvshows = express.Router();

tvshows.route('/tvshows')
	.get(TVShowCtrl.findAllTVShows)
	.post(TVShowCtrl.addTVShow);

tvshows.route('/tvshows/:id')
	.get(TVShowCtrl.findById)
	.put(TVShowCtrl.updateTVShow)
	.delete(TVShowCtrl.deleteTVShow);

app.use(tvshows);

app.listen(3000, function() {
	console.log("Node server running on http://localhost:3000");
});

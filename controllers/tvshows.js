//File: controllers/tvshows.js
var mongoose = require('mongoose');
var TVShow = mongoose.model('TVShow');

//GET - Return all the tvshows in the DB
exports.findAllTVShows = function(req, res) {
	TVShow.find(function(err, tvshows) {
		if(err) res.send(500, err.message);

		console.log('GET /tvshows');
		res.status(200).jsonp({tvshows: tvshows});
	});
};

//GET - Return the tvshows by ID
exports.findById = function(req, res) {
	TVShow.findById(req.params.id, function(err, tvshow) {
		if(err) res.send(500, err.message);

		console.log('GET /tvshows/' + req.params.id);
		res.status(200).jsonp(tvshow);
	});
};

//POST - Insert a new TVShow in the DB
exports.addTVShow = function(req, res) {
	console.log('POST');
	console.log(req.body);
	var jQuery = false;
	if(req.body.tvshow === undefined){
		req.body.tvshow = req.body;
		jQuery = true;
	}

	var tvshow = new TVShow({
		title: 		req.body.tvshow.title,
		year: 		req.body.tvshow.year,
		country:	req.body.tvshow.country,
		poster:		req.body.tvshow.poster,
		seasons: 	req.body.tvshow.seasons,
		genre: 		req.body.tvshow.genre,
		summary: 	req.body.tvshow.summary,
	});

	tvshow.save(function(err, tvshow) {
		if (err) return res.status(500).send(err.message);
		if (jQuery) res.status(200).jsonp(tvshow);
		else		res.status(200).jsonp({tvshow: tvshow});
	});
};

//PUT - Update a register already exists
exports.updateTVShow = function(req, res) {
	var jQuery = false;
	TVShow.findById(req.params.id, function(err, tvshow) {
		if(req.body.tvshow === undefined){
			req.body.tvshow = req.body;
			jQuery = true;
		}
		tvshow.title = req.body.tvshow.title;
		tvshow.year = req.body.tvshow.year;
		tvshow.country = req.body.tvshow.country;
		tvshow.poster = req.body.tvshow.poster;
		tvshow.seasons = req.body.tvshow.seasons;
		tvshow.genre = req.body.tvshow.genre;
		tvshow.summary = req.body.tvshow.summary;

		tvshow.save(function(err) {
			if (err) return res.status(500).send(err.message);
			if (jQuery) res.status(200).jsonp(tvshow);
			else		res.status(200).jsonp({tvshow: tvshow});
		});
	});
};

//DELETE - Delete a TvShow with specified ID
exports.deleteTVShow = function(req, res) {
	TVShow.findById(req.params.id, function(err, tvshow) {
		if(!tvshow)	return res.status(500).send('Cannot find film '+req.params.id);
		tvshow.remove(function(err) {
			if (err) return res.status(500).send(err.message);
			res.status(200).jsonp({});
		});
	});
};


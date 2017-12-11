module.exports = function(app) {

	app.get("/multijoueur/", function(req, res) {

		res.render('multijoueur');

	});
	
}
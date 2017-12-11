module.exports = function(app) {

	app.get("/scores/", function(req, res) {

		res.render('score');

	});
	
}
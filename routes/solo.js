module.exports = function(app) {

	app.get("/solo/", function(req, res) {

		res.render('solo');

	});
	
}
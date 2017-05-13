var env = require("./env");
var Sequelize = require("sequelize");
var db = {};

var bamazon = new Sequelize (
env.DATABASE_NAME,
env.DATABASE_USERNAME,
env.DATABASE_PASSWORD,
{
	host: env.DATABASE_HOST,
	port: env.DATABASE_PORT,
	define: {
		underscored: true
	}
});

bamazon
.authenticate()
.then(function(err) {
	console.log('Connection has been established successfully.');
})
.catch(function (err) {
	console.log('Unable to connect to the database:', err);
});

db.Sequelize = Sequelize;
db.Bamazon = bamazon;
db.Department = require("../models/department")(bamazon, Sequelize);
db.Product = require("../models/product")(bamazon, Sequelize);

module.exports = db;
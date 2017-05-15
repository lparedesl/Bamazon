var db = require("./db");
var fs = require("fs");

var data = JSON.parse(fs.readFileSync("./config/data.json", "utf8"));

db.bamazon.sync()
.then(function() {
	return db.Product.bulkCreate(data.products);
})
.then(function() {
	return db.Department.bulkCreate(data.departments);
})
.then(function() {
	console.log("");
	console.log("==============================");
	console.log("Tables successfully created");
	console.log("==============================");
})
.catch(function(error) {
	console.log(error);
});
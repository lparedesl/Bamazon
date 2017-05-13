require("console.table");
var inquirer = require("inquirer");
var db = require("./config/db");
var TableItem = require("./models/table_item");
var table = [];

function placeOrder(product, response) {
	var name = product.product_name;
	var price = product.price.toFixed(2);
	var available = parseInt(product.stock_quantity);
	var quantity = parseInt(response.quantity);
	var total = (price * quantity).toFixed(2);

	db.Product.update({
		stock_quantity: available - quantity,
		product_sales: parseFloat(product.product_sales + total)
	},{
		where: {
			item_id: product.item_id
		}
	})
	.then(function() {
		return db.Department.findOne({
			where: {
				department_name: product.department_name
			}
		});
	})
	.then(function(data) {
		var department = data.dataValues;
		return db.Department.update({
			product_sales: parseFloat(department.product_sales + total)
		},{
			where: {
				department_name: product.department_name
			}
		});
	})
	.then(function() {
		console.log("");
		console.log("Your Order was placed");
		console.log("");
		console.log("*********************************************************************************");
		console.log("Item:", name);
		console.log("Quantity:", quantity);
		console.log("Price: $" + price);
		console.log("-----------------------");
		console.log("");
		console.log("Total: $" + total);
		console.log("*********************************************************************************");
	})
	.catch(function(error) {
		console.log(error);
	});
}

function addToCart() {
	inquirer.prompt([
		{
			type: "input",
			message: "What item do you want to buy? (Type ID)",
			name: "id",
			validate: function(value) {
				if (isNaN(value) === false && parseInt(value) > 0) {
					return true;
				}
					return false;
	        }
		},
		{
			type: "input",
			message: "How many?",
			name: "quantity",
			validate: function(value) {
				if (isNaN(value) === false && parseInt(value) > 0) {
					return true;
				}
					return false;
	        }
		},
	])
	.then(function(response) {
		db.Product.findOne({
			where: {
				item_id: response.id
			}
		})
		.then(function(data) {
			var product = data.dataValues;
			var available = parseInt(product.stock_quantity);
			var quantity = parseInt(response.quantity);

			if (quantity > available) {
				console.log("");
				console.log("Insufficient quantity!");
				inquirer.prompt([
					{
						type: "input",
						message: "Enter quantity less than " + parseInt(available + 1),
						name: "quantity",
						validate: function(value) {
							if (isNaN(value) === false && parseInt(value) > 0) {
								return true;
							}
								return false;
				        }
					},
				])
				.then(function(response) {
					placeOrder(product, response);
				});
			} else {
				placeOrder(product, response);
			}
		})
		.catch(function(error) {
			console.log(error);
		});
	});
}

db.bamazon.sync()
.then(function() {
	return db.Product.findAll();
})
.then(function(products) {
	if (products) {
		for (var i = 0; i < products.length; i++) {
			var product = products[i].dataValues;
			var tableItem = new TableItem.Product(product.item_id, product.product_name, product.department_name, product.price, product.stock_quantity, product.product_sales);
			table.push(tableItem);
		}
		console.log("");
		console.table(table);
		addToCart();
	}
})
.catch(function(error) {
	console.log(error);
});
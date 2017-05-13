require("console.table");
var inquirer = require("inquirer");
var db = require("./config/db");
var TableItem = require("./models/table_item");
var table = [];
var lowInventoryTable = [];
var departments = [];

function viewLowInventory() {
	db.Product.findAll({
		where: {
			stock_quantity: {
				$lt: 5
			}
		}
	})
	.then(function(products) {
		if (products) {
			for (var i = 0; i < products.length; i++) {
				var product = products[i].dataValues;
				var tableItem = new TableItem.Product(product.item_id, product.product_name, product.department_name, product.price, product.stock_quantity, product.product_sales);
				lowInventoryTable.push(tableItem);
			}
			console.log("");
			console.table(lowInventoryTable);
		}
	})
	.catch(function(error) {
		console.log(error);
	});
}

function addInventory() {
	inquirer.prompt([
		{
			type: "input",
			message: "What item do you want to update? (Type ID)",
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
			message: "Enter new quantity",
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
		var quantity = parseInt(response.quantity);

		db.Product.update({
			stock_quantity: quantity
		},{
			where: {
				item_id: response.id
			}
		})
		.then(function() {
			console.log("");
			console.log("The item was successfully updated");
			console.log("");
		})
		.catch(function(error) {
			console.log(error);
		});
	});
}

function addProduct() {
	db.Department.findAll()
	.then(function(departmentsData) {
		for (var i = 0; i < departmentsData.length; i++) {
			var department = departmentsData[i].dataValues;
			departments.push(department.department_name);
		}
		inquirer.prompt([
			{
				type: "input",
				message: "Product Name:",
				name: "name"
			},
			{
				type: "list",
				message: "Department:",
				choices: departments,
				name: "department"
			},
			{
				type: "input",
				message: "Price:",
				name: "price",
				validate: function(value) {
					if (isNaN(value) === false && parseInt(value) > 0) {
						return true;
					}
						return false;
		        }
			},
			{
				type: "input",
				message: "Stock Quantity:",
				name: "quantity",
				validate: function(value) {
					if (isNaN(value) === false && parseInt(value) > 0) {
						return true;
					}
						return false;
		        }
			}
		])
		.then(function(response) {
			var price = parseFloat(response.price);
			var quantity = parseInt(response.quantity);

			db.Product.create({
				product_name: response.name,
				department_name: response.department,
				price: price,
				stock_quantity: quantity,
			})
			.then(function() {
				console.log("");
				console.log("The item was successfully added");
				console.log("");
			})
			.catch(function(error) {
				console.log(error);
			});
		});
	})
	.catch(function(error) {
		console.log(error);
	});
}

db.Bamazon.sync()
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
		inquirer.prompt([
			{
				type: "list",
				message: "What do you want to do?",
				choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
				name: "choice"
			},
		])
		.then(function(response) {
			switch(response.choice) {
				case "View Products for Sale":
					console.log("");
					console.table(table);
					break;

				case "View Low Inventory":
					viewLowInventory();
					break;

				case "Add to Inventory":
					console.log("");
					console.table(table);
					addInventory();
					break;

				case "Add New Product":
					addProduct();
					break;
			}
		});
	}
})
.catch(function(error) {
	console.log(error);
});
require("console.table");
var inquirer = require("inquirer");
var db = require("./config/db");
var TableItem = require("./models/table_item");
var table = [];

function addDepartment() {
	inquirer.prompt([
		{
			type: "input",
			message: "Department Name:",
			name: "department"
		},
		{
			type: "input",
			message: "Overhead Costs:",
			name: "overhead",
			validate: function(value) {
				if (isNaN(value) === false && parseInt(value) > 0) {
					return true;
				}
					return false;
	        }
		},
		{
			type: "input",
			message: "Sales ($):",
			name: "sales",
			validate: function(value) {
				if (isNaN(value) === false) {
					return true;
				}
					return false;
	        }
		}
	])
	.then(function(response) {
		var overhead = parseInt(response.overhead);
		var sales = parseFloat(response.sales);

		db.Department.create({
			department_name: response.department,
			over_head_costs: overhead,
			product_sales: sales,
		})
		.then(function() {
			console.log("");
			console.log("The department was successfully added");
			console.log("");
		})
		.catch(function(error) {
			console.log(error);
		});
	});
}

db.Bamazon.sync()
.then(function() {
	return db.Department.findAll();
})
.then(function(departments) {
	if (departments) {
		for (var i = 0; i < departments.length; i++) {
			var department = departments[i].dataValues;
			var profit = parseFloat(department.product_sales) - parseFloat(department.over_head_costs);
			var tableItem = new TableItem.Department(department.department_id, department.department_name, department.over_head_costs, department.product_sales, profit);
			table.push(tableItem);
		}
		inquirer.prompt([
			{
				type: "list",
				message: "What do you want to do?",
				choices: ["View Product Sales by Department", "Create New Department"],
				name: "choice"
			},
		])
		.then(function(response) {
			switch(response.choice) {
				case "View Product Sales by Department":
					console.log("");
					console.table(table);
					break;

				case "Create New Department":
					addDepartment();
					break;
			}
		});
	}
})
.catch(function(error) {
	console.log(error);
});
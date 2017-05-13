var env = require("./config/env");
var db = require("./config/db");
var inquirer = require("inquirer");

setTimeout(function() {
	inquirer.prompt([
		{
			type: "list",
			message: "Type of user:",
			choices: ["Customer", "Manager", "Supervisor"],
			name: "choice"
		},
	]).then(function(response) {
		switch(response.choice) {
			case "Customer":
				require("./bamazonCustomer");
				break;

			case "Manager":
				inquirer.prompt([
					{
						type: "password",
						message: "Manager Password:",
						name: "password",
						validate: function(value) {
							if (value === env.MANAGER_PASSWORD) {
								return true;
							}
								return false;
				        }
					}
				])
				.then(function(response) {
					require("./bamazonManager");
				});
				break;

			case "Supervisor":
				inquirer.prompt([
					{
						type: "password",
						message: "Supervisor Password:",
						name: "password",
						validate: function(value) {
							if (value === env.SUPERVISOR_PASSWORD) {
								return true;
							}
								return false;
				        }
					}
				])
				.then(function(response) {
					require("./bamazonSupervisor");
				});
				break;
		}
	});
}, 500);
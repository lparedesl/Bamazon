module.exports = function(bamazon, DataTypes) {
	var Product = bamazon.define("products", {
		item_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			validate: {
				notEmpty: true,
			}
		},
		product_name:{
			type:  DataTypes.STRING,
			alowNull: false,
		},
		department_name: {
			type: DataTypes.STRING,
			alowNull: false,
		},
		price: {
			type: DataTypes.FLOAT(6, 2),
			alowNull: false,
		},
		stock_quantity: {
			type: DataTypes.INTEGER,
			alowNull: false,
		},
		product_sales: {
			type: DataTypes.FLOAT(9, 2),
			alowNull: false,
			defaultValue: 0.00
		}
	});

	bamazon.sync()
	.then(function() {
		return Product.findAll();
	})
	.then(function(products) {
		if (products.length === 0) {
			require("../config/seeder");
		}
	})
	.catch(function(error) {
		console.log(error);
	});

	// Product.sync({
	// 	force: true
	// });

	return Product;
};
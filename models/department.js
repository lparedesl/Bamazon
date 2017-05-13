module.exports = function(bamazon, DataTypes) {
	var Department = bamazon.define("departments", {
		department_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			validate: {
				notEmpty: true
			}
		},
		department_name: {
			type: DataTypes.STRING,
			alowNull: false
		},
		over_head_costs:{
			type:  DataTypes.INTEGER,
			alowNull: false
		},
		product_sales: {
			type: DataTypes.FLOAT(9, 2),
			alowNull: false,
			defaultValue: 0.00
		},
	});

	// Department.sync({
	// 	force: true
	// });

	return Department;
};
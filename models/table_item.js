module.exports = {
	Product: function(itemId, productName, departmentName, price, stockQuantity, sales) {
		this.item_id = itemId;
		this.product_name = productName;
		this.department_name = departmentName;
		this.price = price.toFixed(2);
		this.stock_quantity = stockQuantity;
		this.product_sales = sales.toFixed(2);
	},
	Department: function(departmentId, departmentName, overhead, productSales, profit) {
		this.department_id = departmentId;
		this.department_name = departmentName;
		this.over_head_costs = overhead;
		this.product_sales = productSales.toFixed(2);
		this.total_profit = profit.toFixed(2);
	}
};
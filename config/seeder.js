var db = require("./db");

db.bamazon.sync()
.then(function() {
	return db.Product.bulkCreate([
		{
			product_name: "ASUS ROG G752VT-DH72",
			department_name: "Laptops",
			price: 1143.83,
			stock_quantity: 53,
		}, {
			product_name: "ASUS ROG G752VY-DH78K",
			department_name: "Laptops",
			price: 2099,
			stock_quantity: 17,
		}, {
			product_name: "Apple iPhone 6 - Unlocked (Gold) ,16GB",
			department_name: "Unlocked Cell Phones",
			price: 339,
			stock_quantity: 12,
		}, {
			product_name: "Globe-Weis/Pendaflex Double-TOPS Manila File Jackets",
			department_name: "Books",
			price: 35.63,
			stock_quantity: 1,
		}, {
			product_name: "Cars 3 Little Golden Book Disney",
			department_name: "Books",
			price: 4.99,
			stock_quantity: 1,
		}, {
			product_name: "Tangled Disney Tangled Little Golden Book Hardcover",
			department_name: "Books",
			price: 3.48,
			stock_quantity: 1,
		}, {
			product_name: "Pinocchio Little Golden Book Hardcover",
			department_name: "Books",
			price: 2.50,
			stock_quantity: 1,
		}, {
			product_name: "Trolls Little Golden Book DreamWorks Trolls Hardcover",
			department_name: "Books",
			price: 3.20,
			stock_quantity: 1,
		}, {
			product_name: "Ant-Man Marvel: Ant-Man Little Golden Book Hardcover",
			department_name: "Books",
			price: 3.32,
			stock_quantity: 1,
		}, {
			product_name: "Eclipse Series 23: The First Films of Akira Kurosawa Sanshiro Sugata",
			department_name: "Books",
			price: 37.99,
			stock_quantity: 1,
		}, {
			product_name: "LEGO Classic Medium Creative Brick Box 10696 484",
			department_name: "Building Sets",
			price: 22.99,
			stock_quantity: 48,
		}, {
			product_name: "LEGO Creator Sea Plane",
			department_name: "Building Sets",
			price: 16.47,
			stock_quantity: 35,
		}, {
			product_name: "LEGO Minecraft The Cave 21113",
			department_name: "Building Sets",
			price: 9.95,
			stock_quantity: 56,
		}, {
			product_name: "EZ Drinker Redneck Beer & Soda Can Holster Belt (Camouflage)",
			department_name: "Gun Holsters",
			price: 6.99,
			stock_quantity: 18,
		}, {
			product_name: "Howard Leight by Honeywell Impact Sport Sound Amplification Electronic Earmuff",
			department_name: "Earmuffs",
			price: 36.26,
			stock_quantity: 31,
		}, {
			product_name: "Heat Factory Fleece-Lined Hand Muff",
			department_name: "Hand & Foot Warmers",
			price: 12.53,
			stock_quantity: 19,
		}, {
			product_name: "Yes4All Fixed Blade Hunting Knife with Nylon Sheath",
			department_name: "Fixed-blade Knives",
			price: 8.99,
			stock_quantity: 9,
		}, {
			product_name: "OREI Professional Flashlight Ultra Bright Tactical Led",
			department_name: "Handheld (standard) Flashlights",
			price: 14.99,
			stock_quantity: 9,
		}, {
			product_name: "ALPS OutdoorZ Pursuit Bow Hunting Day Pack multicolor",
			department_name: "Internal Frame Backpacks",
			price: 68.20,
			stock_quantity: 21,
		}
	]);
})
.then(function() {
	return db.Department.bulkCreate([
		{
			department_name: "Laptops",
			over_head_costs: 100000,
		}, {
			department_name: "Unlocked Cell Phones",
			over_head_costs: 10000,
		}, {
			department_name: "Books",
			over_head_costs: 300,
		}, {
			department_name: "Building Sets",
			over_head_costs: 3000,
		}, {
			department_name: "Gun Holsters",
			over_head_costs: 300,
		}, {
			department_name: "Earmuffs",
			over_head_costs: 1500,
		}, {
			department_name: "Hand & Foot Warmers",
			over_head_costs: 500,
		}, {
			department_name: "Fixed-blade Knives",
			over_head_costs: 200,
		}, {
			department_name: "Handheld (standard) Flashlights",
			over_head_costs: 300,
		}, {
			department_name: "Internal Frame Backpacks",
			over_head_costs: 2000,
		}
	]);
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
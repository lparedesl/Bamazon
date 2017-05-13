# Bamazon
=========================

This app emulates a storefront which will take in orders from customers and deplete stock from the store's inventory. It also tracks product sales across the store's departments.

## Configuration

1. Create a MySQL database.

2. Inside the folder `config` create a file named `env.js`.
Inside `env.js` paste this:

```JavaScript
module.exports = {
	DATABASE_NAME: '<input here>',
	DATABASE_USERNAME: '<input here>',
	DATABASE_PASSWORD: '<input here>',
	DATABASE_HOST: '<input here>',
	DATABASE_PORT: '<input here>',
	MANAGER_PASSWORD: '<input here>',
	SUPERVISOR_PASSWORD: '<input here>'
};
```

## Runing the app

To run the app, simply type `npm start' in the command line.

## Demo

[![Demo](https://img.youtube.com/vi/Onn8CGJku_0/0.jpg)](https://www.youtube.com/watch?v=Onn8CGJku_0)
const Product = require('../models/productModel');
const { getPostData } = require('../utils');

// @desc    Gets All Products
// @route   GET /api/products
async function getProducts(request, response) {
	try {
		const products = await Product.findAll();

		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.end(JSON.stringify(products));
	} catch (error) {
		console.log(error);
	}
}

// @desc    Gets Specific Product
// @route   GET /api/products/:id
async function getProduct(request, response, id) {
	try {
		const product = await Product.findById(id);

		if (!product) {
			response.writeHead(404, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify({ message: 'Product Not Found' }));
		} else {
			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify(product));
		}
	} catch (error) {
		console.log(error);
	}
}

// @desc    Create a Product
// @route   POST /api/products
async function createProduct(request, response) {
	try {
		const body = await getPostData(request);

		const { title, description, price } = JSON.parse(body);

		const product = {
			title,
			description,
			price,
		};

		const newProduct = await Product.create(product);

		response.writeHead(201, { 'Content-Type': 'application/json' });

		return response.end(JSON.stringify(newProduct));
	} catch (error) {
		console.log(error);
	}
}

// @desc    Update a Product
// @route   PUT /api/products/:id
async function updateProduct(request, response, id) {
	try {
		const product = await Product.findById(id);

		if (!product) {
			response.writeHead(404, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify({ message: 'Product Not Found' }));
		} else {
			const body = await getPostData(request);

			const { title, description, price } = JSON.parse(body);

			const productData = {
				title: title || product.title,
				description: description || product.description,
				price: price || product.price,
			};

			const updatedProduct = await Product.update(id, productData);

			response.writeHead(200, { 'Content-Type': 'application/json' });

			return response.end(JSON.stringify(updatedProduct));
		}
	} catch (error) {
		console.log(error);
	}
}

// @desc    Delete a Product
// @route   DELETE /api/products/:id
async function deleteProduct(request, response, id) {
	try {
		const product = await Product.findById(id);

		if (!product) {
			response.writeHead(404, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify({ message: 'Product Not Found' }));
		} else {
			await Product.remove(id);
			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify({ message: `Product ${id} Removed!` }));
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};

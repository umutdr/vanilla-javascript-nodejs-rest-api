const http = require('http');
const {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} = require('./controllers/productController');

const server = http.createServer((request, response) => {
	if (request.url === '/api/products' && request.method === 'GET') {
		getProducts(request, response);
	} else if (
		request.url.match(/\/api\/products\/\w+/) &&
		request.method === 'GET'
	) {
		const id = request.url.split('/')[3]; // api/products/1

		getProduct(request, response, id);
	} else if (request.url === '/api/products' && request.method === 'POST') {
		createProduct(request, response);
	} else if (
		request.url.match(/\/api\/products\/\w+/) &&
		request.method === 'PUT'
	) {
		const id = request.url.split('/')[3]; // api/products/1

		updateProduct(request, response, id);
	} else if (
		request.url.match(/\/api\/products\/\w+/) &&
		request.method === 'DELETE'
	) {
		const id = request.url.split('/')[3]; // api/products/1

		deleteProduct(request, response, id);
	} else {
		response.writeHead(404, { 'Content-Type': 'application/json' });
		response.end(JSON.stringify({ message: 'Route Not Found!' }));
	}
});
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

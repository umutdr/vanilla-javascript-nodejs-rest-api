const fs = require('fs');

function writeDataToFile(filename, content) {
	fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
		if (err) {
			console.log(err);
		}
	});
}

function getPostData(request) {
	return new Promise((resolve, reject) => {
		try {
			let body = '';

			request.on('data', (chunk) => {
				body += chunk.toString();
			});

			request.on('end', () => {
				resolve(body);
			});
		} catch (error) {
			reject(error);
		}
	});
}

module.exports = { writeDataToFile, getPostData };

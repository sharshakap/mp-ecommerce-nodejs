const express = require('express');
const cors = require('cors');
var exphbs = require('express-handlebars');

class Server {
	constructor() {
		this.app = express();
		this.port = 8080;
		this.rutas = {
			mercadopago: '/api/mercadopago',
			public: '/',
		};
		this.app.engine('handlebars', exphbs());
		this.app.set('view engine', 'handlebars');
		this.app.use(express.static('assets'));
		this.app.use('/assets', express.static(__dirname + '/assets'));
		this.middlewares();
		this.routes();
	}

	routes() {
		this.app.use(
			this.rutas.mercadopago,
			require('../routes/mercadopago.route')
		);
		this.app.use(this.rutas.public, require('../routes/public.route'));
	}
	middlewares() {
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(cors());
		this.app.use(express.json());
	}
	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
}

module.exports = Server;

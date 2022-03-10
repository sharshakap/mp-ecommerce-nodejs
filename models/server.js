const express = require('express');
const cors = require('cors');
var exphbs = require('express-handlebars');
const { PORT } = require('../utils/constantes');

class Server {
	constructor() {
		this.app = express();
		this.port = PORT;
		this.rutas = {
			mercadopago: '/api/mercadopago',
			views: '/',
		};
		this.app.engine('handlebars', exphbs());
		this.app.set('view engine', 'handlebars');
		this.app.use(express.static('assets'));
		const dir = __dirname.split('\\').slice(0, -1).join('\\');
		this.app.use('/assets', express.static(dir + '/assets'));
		this.middlewares();
		this.routes();
	}

	routes() {
		this.app.use(
			this.rutas.mercadopago,
			require('../routes/mercadopago.route')
		);
		this.app.use(this.rutas.views, require('../routes/views.route'));
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

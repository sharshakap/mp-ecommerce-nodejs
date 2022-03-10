const mercadopago = require('mercadopago');
mercadopago.configure({
	access_token: process.env.ACCESS_TOKEN_MERCADOPAGO,
	integrator_id: process.env.INTEGRATOR_ID_MERCADOPAGO,
});

const createPreference = async (req, res) => {
	try {
		let { title, unit_price, quantity, idProd, desc, img, user } = req.body;
		unit_price = Number(unit_price);
		quantity = Number(quantity);
		//Integrator ID
		const preference = {
			// notification_url: process.env.NOTIFICATION_URL,
			notification_url: 'https://nodeapp.free.beeceptor.com',
			external_reference: 'brsmilanez@hotmail.com',

			items: [
				{
					title,
					unit_price,
					quantity,
				},
			],

			//Estas son las rutas a las que te redigira luego de pagar
			//segun sea el caso.
			back_urls: {
				success: 'http://localhost:8080/feedback',
				failure: 'http://localhost:8080/feedback',
				pending: 'http://localhost:8080/feedback',
			},

			excluded_payment_methods: [
				{
					id: 'Amex',
				},
			],
			excluded_payment_types: [
				{
					// id: 'ticket',
					id: 'atm',
				},
			],
			// binary_mode: true,
			//max cuotas
			installments: 6,
			auto_return: 'approved',
		};
		const addPreference = await mercadopago.preferences.create(preference);
		const id = addPreference.body.id;
		return res.json({
			ok: true,
			id,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hubo un error al crear la preferencia',
		});
	}
};
const feedback = (req, res) => {
	const { payment_id, status, merchant_order_id } = req.query;
	console.log('feedback');
	console.log({ payment_id, status, merchant_order_id });
	return res.json({
		ok: true,
		payment_id,
		status,
		merchant_order_id,
	});
};

module.exports = { createPreference, feedback };


const { APIURL, MP_PUBLIC_KEY } = require('../utils/constantes');

// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
const PUBLIC_KEY = MP_PUBLIC_KEY;
const mercadopago = new MercadoPago(PUBLIC_KEY, {
	locale: 'es-CL', // The most common are: 'pt-BR', 'es-AR' and 'en-US'
});

const checkoutBTN = document.getElementById('checkout-btn');
let quantity = document.getElementById('quantity');
let price = document.getElementById('unit-price');
const title = document.getElementById('product-description').innerHTML;
const img = document.getElementById('product-image');

// Handle call to backend and generate preference.
checkoutBTN.onclick = () => {
	checkoutBTN.setAttribute('disabled', true);
	/**
	 * Nombre y Apellido: Lalo Landa
B. Email: El email del test-user pagador entregado en este documento.
C. Código de área: 11
D. Teléfono: 22223333
	 */
	console.log("wenaaa")
	const orderData = {
		quantity: quantity.value,
		unit_price: price.innerHTML,
		title,
		idProd: 1234,
		desc: 'Dispositivo móvil de Tienda e-commerce',
		img: img.src,
		payer: {
			name: 'Lalo',
			surname: 'Landa',
			// email: 'test_user_63274575@testuser.com', //EMAIL EXAMEN NOT FOUND
			email: 'test_user_51992233@testuser.com',
			phone: {
				area_code: '11',
				number: 22223333,
			},
			address: {
				street_name: 'Falsa',
				street_number: 123,
				zip_code: '1111',
			},
		},
	};

	fetch(APIURL + 'mercadopago/create_preference', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(orderData),
	})
		.then((response) => {
			return response.json();
		})
		.then((preference) => {
			createCheckoutButton(preference.id);

			$('.shopping-cart').fadeOut(500);
			setTimeout(() => {
				$('.container_payment').show(500).fadeIn();
			}, 500);
		})
		.catch((err) => {
			console.log(err);
			alert('Unexpected error');
			checkoutBTN.setAttribute('disabled', false);
		});
};

// Create preference when click on checkout button
const createCheckoutButton = (preferenceId) => {
	// Initialize the checkout
	mercadopago.checkout({
		preference: {
			id: preferenceId,
		},
		render: {
			container: '#button-checkout', // Class name where the payment button will be displayed
			label: 'Pagar', // Change the payment button text (optional)
		},
		theme: {
			elementsColor: '#8e44ad',
		},
	});
};

// Handle price update
const updatePrice = () => {
	quantity.value = 1;
	const amount = quantity.value * price.innerHTML;
	document.getElementById('cart-total').innerHTML = '$ ' + amount;
	document.getElementById('summary-price').innerHTML = '$ ' + price.innerHTML;
	document.getElementById('summary-quantity').innerHTML = quantity.value;
	document.getElementById('summary-total').innerHTML = '$ ' + amount;
};
document.getElementById('quantity').addEventListener('change', updatePrice);
updatePrice();

document.getElementById('go-back').addEventListener('click', function () {
	$('.container_payment').fadeOut(500);
	setTimeout(() => {
		$('.shopping-cart').show(500).fadeIn();
	}, 500);
	checkoutBTN.setAttribute('disabled', false);
});

const PORT = process.env.PORT || 8080;
const APIURL = `http:///localhost:${PORT}/api/}`;
const FRONTURL = `http:///localhost:${PORT}/`;
const NOTIFICATION_URL =
	'https://mp-boris-examen.herokuapp.com/api/mercadopago/notification';

// const APIURL = 'https://mp-boris-examen.herokuapp.com/api/';
// const FRONTURL = 'https://mp-boris-examen.herokuapp.com/';
const MP_PUBLIC_KEY = 'TEST-efcbcded-34c5-494c-9a53-fbaa41af4f41';

module.exports = {
	APIURL,
	FRONTURL,
	PORT,
	MP_PUBLIC_KEY,
	NOTIFICATION_URL,
};

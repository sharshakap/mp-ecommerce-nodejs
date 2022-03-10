const PORT = process.env.PORT || 8080;
const APIURL = `http:///localhost:${PORT}/api/`;
const FRONTURL = `http:///localhost:${PORT}/`;
const NOTIFICATION_URL =
	'https://mp-boris-examen.herokuapp.com/api/mercadopago/notification';

// const APIURL = 'https://mp-boris-examen.herokuapp.com/api/';
// const FRONTURL = 'https://mp-boris-examen.herokuapp.com/';

module.exports = {
	APIURL,
	FRONTURL,
	PORT,
	NOTIFICATION_URL,
};

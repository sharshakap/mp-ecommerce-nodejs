const { Router } = require('express');
const router = Router();

router.get('/', function (req, res) {
	res.render('home');
});

router.get('/detail', function (req, res) {
	res.render('detail', req.query);
});
//failure
router.get('/failure', function (req, res) {
	res.render('failure');
});
//success
router.get('/success', function (req, res) {
	res.render('success');
});
//pending
router.get('/pending', function (req, res) {
	res.render('pending');
});

module.exports = router;

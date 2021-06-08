const getDatabase = require('./database.js');
const db = getDatabase();

const express = require('express');
const router = express.Router();
const { newArray } = require('./functions.js');

router.get('/', async (req, res) => {
	const hamstersRef = db.collection('hamsters');
	let items;

	try {
		const snapshot = await hamstersRef.orderBy('defeats', 'desc').limit(5).get();

		if (snapshot.empty) {
			res.status(404).send('calle!');
			return;
		}
		items = newArray(snapshot);
		res.status(200).send(items);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

module.exports = router;

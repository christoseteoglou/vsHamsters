const getDatabase = require('./database.js');
const db = getDatabase();

const express = require('express');
const router = express.Router();
const { newArray } = require('./functions.js');

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const matchesRef = db.collection('matches');
	const snapshot = await matchesRef.where('winnerId', '==', id).get();

	if (snapshot.empty) {
		res.sendStatus(404);
		return;
	}

	let items = newArray(snapshot);

	// snapshot.forEach((doc) => {
	// 	const data = doc.data();
	// 	data.id = doc.id;
	// 	items.push(data);
	// });

	res.status(200).send(items);
});

module.exports = router;

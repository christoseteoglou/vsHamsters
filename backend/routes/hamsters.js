const getDatabase = require('../database.js');
const db = getDatabase();

const express = require('express');
const router = express.Router();

const { isHamsterObject, newArray } = require('../functions.js');

// GET
router.get('/', async (req, res) => {
	try {
		const hamstersRef = db.collection('hamsters');
		const snapshot = await hamstersRef.get();

		if (snapshot.empty) {
			res.send([]);
			return;
		}

		let items = newArray(snapshot);
		// snapshot.forEach((doc) => {
		// 	const data = doc.data();
		// 	data.id = doc.id;
		// 	items.push(data);
		// });
		res.send(items);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// GET / random
router.get('/random', async (req, res) => {
	try {
		const hamstersRef = db.collection('hamsters');
		const snapshot = await hamstersRef.get();

		if (snapshot.empty) {
			res.send([]);
			return;
		}

		let items = newArray(snapshot);

		// snapshot.forEach((doc) => {
		// 	const data = doc.data();
		// 	data.id = doc.id;
		// 	items.push(data);
		// });
		let randomIndex = Math.floor(Math.random() * items.length);

		res.send(items[randomIndex]);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// GET /hamsters/:id
router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const docRef = await db.collection('hamsters').doc(id).get();

	if (!docRef.exists) {
		res.status(404).send('Sorry, that hamster does not exist!');
		return;
	}

	const data = docRef.data();
	res.send(data);
});

// POST
router.post('/', async (req, res) => {
	const object = req.body;
	console.log(object, 'BACKENDS');
	const docRef = await db.collection('hamsters').add(object);
	if (!object.name || typeof object.age != 'number') {
		res.sendStatus(400);
		return;
	}
	res.send({ id: docRef.id });
	return;
});

// PUT /hamsters/:id
router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const object = req.body;

	let docRef = await db.collection('hamsters').doc(id).get();

	if (isHamsterObject(object) || !Object.keys(object).length) {
		res.sendStatus(400);
		return;
	} else if (!docRef.exists) {
		res.sendStatus(404);
		return;
	}
	await db.collection('hamsters').doc(id).set(object, {
		merge: true
	});
	res.sendStatus(200);
});

// DELETE /hamsters/:id
router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const docRef = await db.collection('hamsters').doc(id).get();

	if (!docRef.exists) {
		res.sendStatus(404);
		return;
	}

	if (!id) {
		res.sendStatus(400);
		return;
	}

	await db.collection('hamsters').doc(id).delete();
	res.sendStatus(200);
});

module.exports = router;

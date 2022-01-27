const getDatabase = require('../database.js');
const db = getDatabase();
const admin = require('firebase-admin');

const express = require('express');
const router = express.Router();

// GET /matches

router.get('/', async (req, res) => {
	const matchesRef = db.collection('matches');
	const snapshot = await matchesRef.get();

	if (snapshot.empty) {
		res.send([]);
		return;
	}

	let items = [];
	snapshot.forEach((doc) => {
		const data = doc.data();
		data.id = doc.id;
		items.push(data);
	});
	res.send(items);
});

// Get /matches/:id
router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const docRef = await db.collection('matches').doc(id).get();

		if (!docRef.exists) {
			res.sendStatus(404);
			return;
		}

		const data = docRef.data();
		data.id = docRef.id;
		res.status(200).send(data);
	} catch (err) {
		res.sendStatus(500).send(err.message);
	}
});

// POST
router.post('/', async (req, res) => {
	const object = req.body;
	const winnerRef = db.collection('hamsters').doc(object.winnerId);
	const loserRef = db.collection('hamsters').doc(object.loserId);
	const winnerHamster = await winnerRef.get();
	const loserHamster = await loserRef.get();

	if (!object.winnerId && !object.loserId) {
		console.log(object);
		res.sendStatus(400);
		return;
	}

	if (!winnerHamster.exists || !loserHamster.exists) {
		console.log('hamster id does not exists');
		res.sendStatus(400);
		return;
	}

	await winnerRef.update({
		wins: admin.firestore.FieldValue.increment(1),
		games: admin.firestore.FieldValue.increment(1)
	});

	await loserRef.update({
		defeats: admin.firestore.FieldValue.increment(1),
		games: admin.firestore.FieldValue.increment(1)
	});
	const matchesRef = await db.collection('matches').add(object);
	res.status(200).send({ id: matchesRef.id });
	return;
});

// DELETE /matches/:id
router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const docRef = await db.collection('matches').doc(id).get();

	try {
		if (!docRef.exists) {
			res.sendStatus(404);
			return;
		} else if (!id) {
			res.sendStatus(400);
			return;
		}

		await db.collection('matches').doc(id).delete();
		res.sendStatus(200);
	} catch (err) {
		res.sendStatus(500).send(err.message);
	}
});

module.exports = router;

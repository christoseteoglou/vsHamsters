const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const hamsters = require('./routes/hamsters.js');

const matches = require('./routes/matches');
const getDatabase = require('./database.js');
const db = getDatabase();

const matchWinners = require('./matchWinners.js');
const winners = require('./winners.js');
const losers = require('./losers.js');

const PORT = process.env.PORT || 2021;

const staticFolder = path.join(__dirname, '../build');
const staticImageFolder = path.join(__dirname, 'img');

// Terminal Logger (for tracking incoming requests)
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.params);
	next();
});

app.use(express.json());
app.use(cors());
app.use(express.static(staticFolder));
app.use('/img', express.static(staticImageFolder));

// Routes
app.get('/', (req, res) => {
	res.send('Welcome to the Hamster Wars protocol!');
});

app.use('/hamsters', hamsters);
app.use('/matches', matches);
app.use('/matchWinners', matchWinners);
app.use('/winners', winners);
app.use('/losers', losers);

// Starting the server
app.listen(PORT, () => {
	console.log('Im listening Dave on port ' + PORT);
});

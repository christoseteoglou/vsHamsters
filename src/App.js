import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import './App.css';
// import LandingPage from './components/LandingPage';

function App() {
	return (
		<Router history>
			<div className="App">
				<header className="App-header">
					<nav>
						<Link to="/"> Home </Link>
						<Link to="/Gallery"> Gallery </Link>
						<Link to="/Battle"> Battle </Link>
					</nav>
				</header>
				<main>
					<Switch>
						<Route path="/home"> Welcome </Route>
						<Route path="/Gallery"> DIS IS GALLERY!</Route>
						<Route path="/Battle"> FIGHT LITTLE HAMSTERS!</Route>
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;

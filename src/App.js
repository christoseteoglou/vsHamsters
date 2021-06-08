import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import LandingPage from './components/LandingPage';
import Gallery from './components/Gallery/Gallery';

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<Navigation />
				</header>
				<main>
					<Switch>
						<Route path="/Gallery">
							{' '}
							DIS IS GALLERY! <Gallery />
						</Route>
						<Route path="/Battle"> FIGHT LITTLE HAMSTERS!</Route>
						<Route path="/">
							{' '}
							WELCOME <LandingPage />{' '}
						</Route>
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;

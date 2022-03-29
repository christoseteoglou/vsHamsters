import React from 'react'
import './LandingPage.css';

function LandingPage() {
	return (
		<div className="welcome--text">
			<p>Welcome to vsHamsters</p>
			<div className="welcome--text__information">
					<p> This is a spin-off on the classic Kitten Wars, where you are able to vote on the cutest hamster. </p>
					<p> You have three pages you can visit... </p>
				<div className='welcome--text__pageDescription'>	
					<p> <span>/Gallery</span> where you see all their little faces and get to "awwww" all day.</p>
					<p> <span>/Battle</span> where you put them to the test and pick your favorite.</p>
					<p> <span>/Add</span> where you can upload your cutest little friend and have them win the fight! Enjoy  </p>
				</div>
			</div>
		</div>
	)
}

export default LandingPage


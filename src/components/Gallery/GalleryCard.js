import React from 'react';
import './GalleryCard.css';

function GalleryCard({ hamster }) {
	return (
		<div>
			<img
				className="hamsters"
				src={hamster.imgName.includes('https') ? hamster.imgName : `/img/${hamster.imgName}`}
				alt=""
				/>
			<p> {hamster.name} </p>
		</div>
	);
}

export default GalleryCard;

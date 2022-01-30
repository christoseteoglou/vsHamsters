import React from 'react';
import './GalleryCard.css';

function GalleryCard({ hamster }) {
	return (
		<div>
			<p> {hamster.name} </p>
			<img
				className="hamsters"
				src={hamster.imgName.includes('https') ? hamster.imgName : `/img/${hamster.imgName}`}
				alt=""
			/>
		</div>
	);
}

export default GalleryCard;

import React from 'react'
import './GalleryCard.css'

function GalleryCard({bajsmacka}) {
	return (
			<div>
				<p> { bajsmacka.name } </p>
				<img className="hamsters" src={"/img/" + bajsmacka.imgName} alt="" />
			</div>
		
	)
}

export default GalleryCard
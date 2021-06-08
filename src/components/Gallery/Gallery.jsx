// import axios from 'axios'
import { useEffect, useState } from "react";
import GalleryCard from './GalleryCard'
import './Gallery.css'





function Gallery() {

	const [data, setData] = useState();

	useEffect(() => {
		const allHamsters = async() => {
			try{
				const response = await fetch('/hamsters', {method: 'get'})
				if(response.status === 200) {
					
					const data = await response.json()
					console.log(data[0]);
					setData(data)
				} else {
					throw new Error('Det BRINNER!')
				}

			} catch(error) {
				console.log(error.message);
			}
		}
		allHamsters()
	}, [])
	return (
		<div>
			<div  className='hamsters'>
				{data && data.map(hamster => {
					return(
						<div key={hamster.id}>
							< GalleryCard bajsmacka={hamster} />
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Gallery






// function Gallery() {


// 	useEffect(() => {
// 		async function allHamsters() {
// 			const response = await axios.get('/hamsters');
// 			const data = await response.json()
// 			console.log(data)
// 		}
// 		allHamsters()
// 	}, [])

// async function allHamsters() {
// 	const response = await fetch('/hamsters', { method: 'get' })
// 	const data = await response.json()
// 	setData(data)
// }
// allHamsters()
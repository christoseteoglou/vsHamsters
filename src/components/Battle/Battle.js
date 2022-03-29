import React from 'react';
import {useState} from 'react';
import GalleryCard from '../Gallery/GalleryCard';
import '../Battle/Battle.css'



function Battle() {

	const [responseData, setResponseData] = useState(null)
	const [status, setStatus] = useState(false)

	

	const postMatch = async(winnerId) => {
		let postBody;
		const loser = responseData ? responseData.find(hamster => hamster.id !== winnerId) : "";

		if (loser) {
		
			postBody = {
				winnerId, 
				loserId: loser.id
			}
		}
	

		const URLS = postBody ? [`/hamsters/${postBody.winnerId}`, `/hamsters/${postBody.loserId}`] : []
		try {
			const response = await fetch('/matches', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				  },
				  body: JSON.stringify(postBody)
			})
			if( response.status === 200 ) {
				//setMatchDone
				getHamster(URLS)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const getHamster = async(URLS) => {
		
		try {
			const responses = await Promise.all(URLS.map(async (url) => {
					return await fetch(url, {method: 'GET'})	
			}))
			const data = await Promise.all(responses.map(async (response) => {
				if(response.status === 200 ){
					return await response.json()
				} 
			}))
			console.log('Hämtar hamstrar igen:',data);
			console.log(data);
			setResponseData(data)
			setStatus(true)
		
		} catch (error) {
			console.log(error)
		}
	}

	const callReload = () => {
		getRandomHamster()
	}

	const getRandomHamster = async() => {
		
		const URLS = ['/hamsters/random', '/hamsters/random',]
		try {
			const responses = await Promise.all(URLS.map(async (url) => {
					return await fetch(url, {method: 'GET'})	
			}))
			const data = await Promise.all(responses.map(async (response) => {
				if(response.status === 200 ){
					return await response.json()
				} 
			}))
			if(data[0].id === data[1].id){
				callReload()
			}else{
				console.log(data);
				setResponseData(data);
				setStatus(false)
			}
		} catch (error) {
			console.log(error)
		}
	}

  return (
  <div>
	  {responseData && 
	  responseData.map((hamster)=> {
		  return (
			  <div key={hamster.id}>
				  <GalleryCard hamster = {hamster}/>
				  {status &&
				  <div key={hamster.id}>
					<h4>Wins:</h4><p>{hamster.wins}</p>
					<h4>Defeats:</h4><p>{hamster.defeats}</p>
					<h4>Matches:</h4><p>{hamster.games}</p>
				  </div>
				  }
				  {!status &&
				  
					<button className="btn" onClick={()=>postMatch(hamster.id)} > Cutest </button>
				  }
			  </div>

		  )
	  })}
	  <button className="btn" onClick={getRandomHamster}> Start </button>
  </div>
  )
}

export default Battle;

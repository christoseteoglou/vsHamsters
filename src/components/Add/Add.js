import React from 'react';
import { useState } from 'react';

function Add() {
	const [ errorMessage, seterrorMessage ] = useState({ name: '', age: '' });
	
	const [ validName, setValidName ] = useState(false)
	const [ validAge, setValidAge ] = useState(false)
	
	const [ hamsterName, sethamsterName ] = useState('');
	const updatehamsterName = ({ target: { name, value } }) => {
		seterrorMessage({
			...errorMessage,
			[name]: ''
		});
		sethamsterName(value);
	};

	const [ age, setAge ] = useState('');
	const updateHamsterAge = ({ target: { name, value } }) => {
		seterrorMessage({
			...errorMessage,
			[name]: ''
		});
		setAge(value);
	};

	const [ favFood, setFavFood ] = useState('');
	const updateHamsterFood = ({ target: { value } }) => {
		setFavFood(value)
	}

	const [ loves, setLoves ] = useState('')
	const updateHamsterLoves = ({ target: { value } }) => {
		setLoves(value)
	}

	const [ hamsterImage, setHamsterImage ] = useState('')
	const updateHamsterImage = ({ target: { value } }) => {
		setHamsterImage(value)
	}

	const postHamster = async () => {
		const newHamsterObj = {
			name: hamsterName,
			age: Number(age),
			games: 0,
			loves: loves,
			imgName: hamsterImage,
			defeats: 0,
			wins: 0,
			favFood: favFood
		}
		

		console.log(newHamsterObj,'Frontend');
        try {
            const response = await fetch('/hamsters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newHamsterObj)
            })
            if( response.status === 200 ) {
                const data = await response.json()
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

	const validator = ({ target: { name, value } }) => {
		if (name === 'name') {
			if (!value) {
				seterrorMessage({
					...errorMessage,
					[name]: 'You need to set a name...'
				});
			} else {
				setValidName(true)
			}
		} else if (name === 'age') {
			if (!value) {
				seterrorMessage({
					...errorMessage,
					[name]: 'You need to set an age...'
				});
			} else {
				setValidAge(true)
			}
		}
	};

	return (
		<form onSubmit={(e)=> e.preventDefault()}>
			<label>
				{' '}
				Name:
				<input value={hamsterName} onChange={updatehamsterName} onBlur={validator} name="name" type="text" />
				{errorMessage.name && <p>{errorMessage.name}</p>}
			</label>
			<label>
				{' '}
				Age:
				<input name="age" onBlur={validator} onChange={updateHamsterAge} value={age} type="number" />
				{errorMessage.age && <p>{errorMessage.age}</p>}
			</label>
			<label>
				{' '}
				Favorite Food:
				<input type="text" value={favFood} onChange={updateHamsterFood} />
			</label>
			<label>
				{' '}
				Loves:
				<input type="text" value={loves} onChange={updateHamsterLoves} />
			</label>
			<img src={hamsterImage} alt="" />
			<label>
				{' '}
				Image:
				<input type="text" placeholder='Type image URL..' value={hamsterImage} onChange={updateHamsterImage}  />
			</label>
			{ validName && validAge ? <button onClick={postHamster}  >Add Hamster</button> : <button disabled >Add Hamster</button> }
		</form>
	);
}

export default Add;

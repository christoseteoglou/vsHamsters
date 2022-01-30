import React from 'react';
import { useState } from 'react';

function Add() {
	const [ errorMessage, seterrorMessage ] = useState({ name: '', age: '' });

	const [ newHamsterVar, setNewHamsterVar ] = useState('');
	const updateNewHamsterVar = ({ target: { value } }) => {
		setNewHamsterVar(value);
	};

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
	const validator = ({ target: { name, value } }) => {
		if (name === 'name') {
			if (!value) {
				seterrorMessage({
					...errorMessage,
					[name]: 'You need to set a name...'
				});
			}
		} else if (name === 'age') {
			if (!value) {
				seterrorMessage({
					...errorMessage,
					[name]: 'You need to set an age...'
				});
			}
		}
	};

	return (
		<form>
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
				<input type="text" />
			</label>
			<label>
				{' '}
				Loves:
				<input type="text" />
			</label>
			<img src={newHamsterVar} alt="" />
			<label>
				{' '}
				Image:
				<input value={newHamsterVar} onChange={updateNewHamsterVar} type="text" placeholder="Add Image URL " />
			</label>
		</form>
	);
}

export default Add;

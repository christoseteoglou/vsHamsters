function isHamsterObject(maybeObject) {
	if (!maybeObject) {
		return false;
	} else if (!maybeObject.name || !maybeObject.age || !maybeObject.imgName) {
		return false;
	}
	return true;
}

function newArray(input) {
	let items = [];
	input.forEach((doc) => {
		const data = doc.data();
		data.id = doc.id;
		items.push(data);
	});
	return items;
}

module.exports = {
	isHamsterObject: isHamsterObject,
	newArray: newArray
};

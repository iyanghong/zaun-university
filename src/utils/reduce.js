export function reduceArray(arr) {
	return Object.keys(arr).reduce((list, key) => {
		list.push(arr[key]);
		return list;
	}, [])
}
export function reduceObject(arr) {
	return Object.keys(arr).reduce((list, key) => {
		list[key] = arr[key];
		return list;
	}, [])
}

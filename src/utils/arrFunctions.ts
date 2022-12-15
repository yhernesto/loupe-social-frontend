/**
 * @param {any[]} arr
 * @param {string[]} keys
 */
export function groupBy(arr: Array<any>, keys: string[]) {
	/*
	return arr.reduce((storage, item) => {
		const objKey = keys.map(key => `${ item[key] }`).join('_'); //should be some unique delimiter that wont appear in your keys
		if (storage[objKey]) {
			storage[objKey].push(item);
		} else {
			storage[objKey] = [item];
		}
		return storage;
	}, {});
	*/
	const output: Array<any> = arr.reduce((storage, item) => {
		// const objKey = keys.map(key => `${ item[key] }`).join('_'); //should be some unique delimiter that wont appear in your keys
		const newItem: any = {}

		keys.forEach(key => { 
			newItem[key] = item[key]
		})

		if (storage.find((obj: any) => keys.every((key: string) => obj[key] === newItem[key]))) {
		//	storage.find((obj: any) => keys.every((key: string) => obj[key] === newItem[key])).total += newItem.total;
		} else {
			storage.push(newItem);
		}
		return storage;
	}, [])
	
	// console.log('***********output1:', output, output.length);

	return output;
}

/**
 * @param {any[]} arr
 * @param {string[]} keys
 * @param {string} aggregationKey
 */
export function groupBySum(arr: Array<any>, keys: string[], aggregationKey: string): Array<any> {
	const output: Array<any> = arr.reduce((storage, item) => {
		// const objKey = keys.map(key => `${ item[key] }`).join('_'); //should be some unique delimiter that wont appear in your keys
		const newItem: any = {}

		keys.forEach(key => { 
			newItem[key] = item[key]
		})

		newItem['total'] = item[aggregationKey];

		if (storage.find((obj: any) => keys.every((key: string) => obj[key] === newItem[key]))) {
			storage.find((obj: any) => keys.every((key: string) => obj[key] === newItem[key])).total += newItem.total;
		} else {
			storage.push(newItem);
		}
		return storage;
	}, [])
	
	// console.log('***********output1:', output, output.length);

	return output;
}
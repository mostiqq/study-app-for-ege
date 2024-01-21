export const getStoreLocal = (name: string) => {
	if (typeof localStorage !== 'undefined') {
		const ls = localStorage.getItem(name)
		return ls ? JSON.parse(JSON.stringify(ls)) : null
	}

	return null
}

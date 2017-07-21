let storage = window.localStorage;

const hold = {
	session: {

	},
	cookie: {

	},
	storage: {
		get (item) {
			return storage.getItem(item)
		},
		set (item, value) {
			return storage.setItem(item, value)
		}
	}
}

export default hold;
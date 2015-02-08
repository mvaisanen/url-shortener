module.exports = {
	createId: function(store) {
		// Create random 5 char string
		var id = (Math.random() + 1).toString(36).slice(2,8);
		// Rerun if id is already in the "database"
		while (store[id]) {
			id = (Math.random() + 1).toString(36).slice(2,8);
		}
		return id;
	},
	isValidURL: function(url) {
		// Check if given url is valid. However, this is not a perfect solution.
		// Some url validator library might be better option but I want to have minum amount of libraries
		var pattern = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;
		return url.indexOf(".") !== -1 && (pattern.test(url))

	}
}






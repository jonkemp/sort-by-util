const { getLength } = require('./');

module.exports = (list, values) => {
	const result = {};
	for (let i = 0, length = getLength(list); i < length; i++) {
		if (values) {
			result[list[i]] = values[i];
		} else {
			result[list[i][0]] = list[i][1];
		}
	}
	return result;
};

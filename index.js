const pluck = require('pluck-util');
const isArrayLike = require('./lib/is-array-like');
const { cb } = require('./lib/index');

const map = function(obj, iteratee, context) {
	iteratee = cb(iteratee, context);
	var keys = !isArrayLike(obj) && Object.keys(obj),
		length = (keys || obj).length,
		results = Array(length);
	for (var index = 0; index < length; index++) {
		var currentKey = keys ? keys[index] : index;
		results[index] = iteratee(obj[currentKey], currentKey, obj);
	}
	return results;
};

const sortBy = (obj, iteratee, context) => {
	let index = 0;
	iteratee = cb(iteratee, context);
	return pluck(map(obj, (value, key, list) => ({
		value,
		index: index++,
		criteria: iteratee(value, key, list)
	})).sort((left, right) => {
		const a = left.criteria;
		const b = right.criteria;
		if (a !== b) {
			if (a > b || a === void 0) return 1;
			if (a < b || b === void 0) return -1;
		}
		return left.index - right.index;
	}), 'value');
};

module.exports = sortBy;

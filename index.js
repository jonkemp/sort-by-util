const pluck = require('pluck-util');
const { cb, map } = require('@jonkemp/package-utils');

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

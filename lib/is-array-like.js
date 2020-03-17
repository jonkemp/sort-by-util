const { has, isString } = require('./');

module.exports = val => {
	if (Array.isArray(val)) {
		return true;
	}

	if (!val) {
		return false;
	}

	if (isString(val)) {
		return false;
	}

	if (typeof val !== 'object') {
		return false;
	}

	if (val.nodeType === 1) {
		return !!val.length;
	}

	if (val.length === 0) {
		return true;
	}

	if (val.length > 0) {
		return has(0, val) && has(val.length - 1, val);
	}

	return false;
};

const pluck = require('pluck-util');

const shallowProperty = key => obj => obj == null ? void 0 : obj[key];

const deepGet = (obj, path) => {
	const length = path.length;
	for (let i = 0; i < length; i++) {
		if (obj == null) return void 0;
		obj = obj[path[i]];
	}
	return length ? obj : void 0;
};

const property = path => {
	if (!Array.isArray(path)) {
		return shallowProperty(path);
	}
	return obj => deepGet(obj, path);
};

const MAX_ARRAY_INDEX = 2 ** 53 - 1;
const getLength = shallowProperty('length');
const isArrayLike = collection => {
	const length = getLength(collection);
	return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

const isObject = obj => {
	const type = typeof obj;
	return type === 'function' || type === 'object' && !!obj;
};

const isFunction = obj => toString.call(obj) === '[object Function]';

const identity = value => value;

const optimizeCb = (func, context, argCount) => {
	if (context === void 0) return func;
	switch (argCount == null ? 3 : argCount) {
	case 1: return value => func.call(context, value);
		// The 2-argument case is omitted because we’re not using it.
	case 3: return (value, index, collection) => func.call(context, value, index, collection);
	case 4: return (accumulator, value, index, collection) => func.call(context, accumulator, value, index, collection);
	}
	return (...args) => func.apply(context, args);
};

const isMatch = (object, attrs) => {
	const keys = Object.keys(attrs);
	const length = keys.length;
	if (object == null) return !length;
	const obj = Object(object);
	for (let i = 0; i < length; i++) {
		const key = keys[i];
		if (attrs[key] !== obj[key] || !(key in obj)) return false;
	}
	return true;
};

const matcher = attrs => {
	attrs = Object.assign({}, attrs);
	return obj => isMatch(obj, attrs);
};

const baseIteratee = (value, context, argCount) => {
	if (value == null) return identity;
	if (isFunction(value)) return optimizeCb(value, context, argCount);
	if (isObject(value) && !Array.isArray(value)) return matcher(value);
	return property(value);
};

let iteratee;

const exportIteratee = iteratee = (value, context) => baseIteratee(value, context, Infinity);

const cb = (value, context, argCount) => {
	if (iteratee !== exportIteratee) return iteratee(value, context);
	return baseIteratee(value, context, argCount);
};

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

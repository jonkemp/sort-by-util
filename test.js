const assert = require('assert');
const pluck = require('pluck-util');
const sortBy = require('./');
const object = require('./lib/object');
const identity = value => value;

function Pair(x, y) {
	this.x = x;
	this.y = y;
}

const stableArray = [
	new Pair(1, 1), new Pair(1, 2),
	new Pair(1, 3), new Pair(1, 4),
	new Pair(1, 5), new Pair(1, 6),
	new Pair(2, 1), new Pair(2, 2),
	new Pair(2, 3), new Pair(2, 4),
	new Pair(2, 5), new Pair(2, 6),
	new Pair(void 0, 1), new Pair(void 0, 2),
	new Pair(void 0, 3), new Pair(void 0, 4),
	new Pair(void 0, 5), new Pair(void 0, 6)
];

describe('sortBy', () => {
	it('should return a sorted copy of list, ranked in ascending order by the results of running each value through iteratee', () => {
		const stooges = [
			{ name: 'moe', age: 40 },
			{ name: 'larry', age: 50 },
			{ name: 'curly', age: 60 }
		];
		assert.deepEqual(sortBy(stooges, 'name'), [{ name: 'curly', age: 60 }, { name: 'larry', age: 50 }, { name: 'moe', age: 40 }]);
		assert.deepEqual(sortBy(stooges, 'name').reverse(), [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }]);

		assert.deepStrictEqual(sortBy([1, 2, 3, 4, 5, 6], num => Math.sin(num)), [5, 4, 6, 3, 1, 2]);

		const users = [
			{ user: 'fred',   age: 48 },
			{ user: 'barney', age: 36 },
			{ user: 'fred',   age: 40 },
			{ user: 'barney', age: 34 }
		];
		const expectedUsers = [{ 'user': 'barney', 'age': 36 }, { 'user': 'barney', 'age': 34 }, { 'user': 'fred', 'age': 48 }, { 'user': 'fred', 'age': 40 }];
		assert.deepEqual(sortBy(users, 'user'), expectedUsers);
		assert.deepEqual(sortBy(users, ({user}) => user), expectedUsers);
	});

	it('should sort by age', () => {
		let people = [{name: 'curly', age: 50}, {name: 'moe', age: 30}];

		people = sortBy(people, ({age}) => age);
		assert.deepEqual(pluck(people, 'name'), ['moe', 'curly']);
	});

	it('should sort with undefined values', () => {
		const list = [void 0, 4, 1, void 0, 3, 2];

		assert.deepEqual(sortBy(list, identity), [1, 2, 3, 4, void 0, void 0]);
	});

	it('should sort by length', () => {
		const list = ['one', 'two', 'three', 'four', 'five'];
		const sorted = sortBy(list, 'length');

		assert.deepEqual(sorted, ['one', 'two', 'four', 'five', 'three']);
	});

	it('should be stable for arrays', () => {
		const actual = sortBy(stableArray, ({x}) => x);

		assert.deepEqual(actual, stableArray);
	});

	it('should accept property string', () => {
		assert.deepEqual(sortBy(stableArray, 'x'), stableArray);
	});

	it('should be stable for objects', () => {
		const stableObject = object('abcdefghijklmnopqr'.split(''), stableArray);
		const actual = sortBy(stableObject, ({x}) => x);

		assert.deepEqual(actual, stableArray);
	});

	it('should uses identity if iterator is not specified', () => {
		const list = ['q', 'w', 'e', 'r', 't', 'y'];
		assert.deepEqual(sortBy(list), ['e', 'q', 'r', 't', 'w', 'y']);
	});
});

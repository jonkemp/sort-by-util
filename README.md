# sort-by-util [![Build Status](https://travis-ci.com/jonkemp/sort-by-util.svg?branch=master)](https://travis-ci.com/jonkemp/sort-by-util)

> Returns a (stably) sorted copy of an array, ranked in ascending order by the results of running each value through an iteratee. iteratee may also be the string name of the property to sort by (eg. length).

Inspired by `_.sortBy`. 😄


## Install

Install with [npm](https://npmjs.org/package/sort-by-util)

```
$ npm install sort-by-util
```

Or [unpkg](https://unpkg.com/sort-by-util/)

```
<script src="https://unpkg.com/sort-by-util@1.0.3/umd/index.js" />
```

Check out the unit tests on [CodePen](https://codepen.io/jonkemp/full/poJVzxN).

## Usage

```js
const sortBy = require('sort-by-util');

const users = [
	{ user: 'fred',   age: 48 },
	{ user: 'barney', age: 36 },
	{ user: 'fred',   age: 40 },
	{ user: 'barney', age: 34 }
];

sortBy(users, 'user');
//=> [{ 'user': 'barney', 'age': 36 }, { 'user': 'barney', 'age': 34 }, { 'user': 'fred', 'age': 48 }, { 'user': 'fred', 'age': 40 }]

sortBy(users, ({user}) => user);
//=> [{ 'user': 'barney', 'age': 36 }, { 'user': 'barney', 'age': 34 }, { 'user': 'fred', 'age': 48 }, { 'user': 'fred', 'age': 40 }]
```

---
| **Like us a lot?** Help others know why you like us! **Review this package on [pkgreview.dev](https://pkgreview.dev/npm/sort-by-util)** | ➡   | [![Review us on pkgreview.dev](https://i.ibb.co/McjVMfb/pkgreview-dev.jpg)](https://pkgreview.dev/npm/sort-by-util) |
| ----------------------------------------------------------------------------------------------------------------------------------------- | --- | --------------------------------------------------------------------------------------------------------------------- |

## API

### sortBy(collection, iteratee)

#### collection

Type: `array`  
Default: `none`

The array to iterate over.

#### iteratee

Type: `string` or `function` or `object`  
Default: `none`

The property name, function or object to sort by.

## License

MIT

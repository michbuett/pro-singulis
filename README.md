pro-singulis
============

[![Build Status](https://travis-ci.org/michbuett/pro-singulis.svg?branch=master)](https://travis-ci.org/michbuett/pro-singulis) 
[![npm version](https://badge.fury.io/js/pro-singulis.svg)](http://badge.fury.io/js/pro-singulis) 
[![Coverage Status](https://coveralls.io/repos/michbuett/pro-singulis/badge.svg?branch=master&service=github)](https://coveralls.io/github/michbuett/pro-singulis?branch=master)

A simple and lean yet powerful "forEach"

How do I use it
---------------
```js
var each = require('pro-singulis');

// (a) default use case iterate through an array or an object
each([1, 2, ..., n], function doStuff(val) { ... });

// (b) map data
each([1, 2, 3], function double(val) {
    return 2 * val;
}); // -> [2, 4, 6]
each({foo: 1, bar: 2}, function double(val) {
    return 2 * val;
}); // -> {foo: 2, bar: 4}

// (c) filter data
each([1, 2, 3, 4], function (val) {
    return (val % 2 === 0) ? val : undefined;
}); // -> [2, 4]
each({ foo: 1, bar: 2, baz: 3, }, function uneven(val) {
    return (val % 2 !== 0) ? val : undefined;
}); // -> { foo: 1, baz: 3 }

// (d) prepare iterating function
var f = each.prepare(doStuff, inContext);
f(['foo', 'bar', 'baz']); // calls "doStuff" with "inContext" as this
```

Does it work in the browser?
----------------------------
Yes. The npm packge contains a standalone (an minified) version: dist/pro-singulis.min.js

License
-------
MIT.

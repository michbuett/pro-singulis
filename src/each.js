'use strict';

/**
 * Iterates of an iterable object and call the given method for each item
 * For example:
 * <pre><code>
 *      // (a) default use case iterate through an array or an object
 *      each([1, 2, ..., n], function doStuff(val) { ... });
 *
 *      // (b) map data
 *      each([1, 2, 3], function double(val) {
 *          return 2 * val;
 *      }); // -> [2, 4, 6]
 *      each({foo: 1, bar: 2}, function double(val) {
 *          return 2 * val;
 *      }); // -> {foo: 2, bar: 4}
 *
 *      // (c) filter data
 *      each([1, 2, 3, 4], function (val) {
 *          return (val % 2 === 0) ? val : undefined;
 *      }); // -> [2, 4]
 *      each({ foo: 1, bar: 2, baz: 3, }, function uneven(val) {
 *          return (val % 2 !== 0) ? val : undefined;
 *      }); // -> { foo: 1, baz: 3 }
 * </code></pre>
 *
 * @param {Object/Array} iterable The object to iterate through
 * @param {Function} fn The callback function to be called for each item
 * @param {Object} scope The execution scope for the callback function
 * @param {Array} more Optional; an addional set of arguments which will
 *      be passed to the callback function
 * @return {Object/Array} The aggregated results of each callback (see examples)
 */
module.exports = function each(iterable, fn, scope, more) {
    var args = [null, null];
    var result, resultSet;
    var i, l;

    if (more !== undefined) {
        args = args.concat(more);
    }

    if (Array.isArray(iterable)) {
        resultSet = [];

        for (i = 0, l = iterable.length; i < l; ++i) {
            args[0] = iterable[i];
            args[1] = i;
            result = fn.apply(scope, args);

            if (typeof result !== 'undefined') {
                resultSet.push(result);
            }
        }

    } else if (iterable && typeof iterable === 'object') {
        var keys = Object.keys(iterable);
        // use Object.keys + for-loop to allow optimizing each for
        // iterating over objects in hash-table-mode

        resultSet = {};

        for (i = 0, l = keys.length; i < l; ++i) {
            var key = keys[i];

            args[0] = iterable[key];
            args[1] = key;
            result = fn.apply(scope, args);

            if (typeof result !== 'undefined') {
                resultSet[key] = result;
            }
        }
    }

    return resultSet;
};

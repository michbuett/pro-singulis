/* global window */
describe('each', function () {
    'use strict';

    var req = typeof require === 'function' ? require : function () {
        return window.proSingulis;
    };
    var expectedScope = {};
    var actualScope;
    var args = ['foo', 'bar', 'baz'];
    var spy;

    beforeEach(function () {
        spy = jasmine.createSpy('iterator').and.callFake(function () {
            actualScope = this;
        });
    });

    it('allows to iterate through arrays', function () {
        // prepare
        var each = req('../src/each');
        var array = [1, 2, 3, 4, 5];

        // execute
        each(array, spy, expectedScope, args);

        // verify
        expect(spy).toHaveBeenCalled();
        expect(spy.calls.count()).toBe(array.length);
        expect(actualScope).toBe(expectedScope);

        for (var i = 0; i < array.length; i++) {
            var spyArgs = spy.calls.argsFor(i);
            expect(spyArgs[0]).toBe(array[i]);
            expect(spyArgs[1]).toBe(i);
            expect(spyArgs[2]).toBe(args[0]);
            expect(spyArgs[3]).toBe(args[1]);
            expect(spyArgs[4]).toBe(args[2]);
        }
    });

    it('allows to iterate through objects', function () {
        // prepare
        var each = req('../src/each');
        var obj = {
            key0: 'value0',
            key1: 'value1',
            key2: 'value2'
        };

        // execute
        each(obj, spy, expectedScope, args);

        // verify
        expect(spy).toHaveBeenCalled();
        expect(spy.calls.count()).toBe(3);
        expect(actualScope).toBe(expectedScope);

        for (var i = 0; i < 3; i++) {
            var spyArgs = spy.calls.argsFor(i);
            var key = 'key' + i;
            var value = 'value' + i;

            expect(spyArgs[0]).toBe(value);
            expect(spyArgs[1]).toBe(key);
            expect(spyArgs[2]).toBe(args[0]);
            expect(spyArgs[3]).toBe(args[1]);
            expect(spyArgs[4]).toBe(args[2]);
        }
    });

    it('handles additional arguments correctly', function () {
        var each = req('../src/each');
        each([1], spy);
        expect(spy.calls.mostRecent().args.length).toBe(2);

        each([1], spy, null, 'foo');
        expect(spy.calls.mostRecent().args.length).toBe(3);
        expect(spy.calls.mostRecent().args[2]).toBe('foo');

        each([1], spy, null, ['foo', 'bar', 'baz']);
        expect(spy.calls.mostRecent().args.length).toBe(5);
        expect(spy.calls.mostRecent().args[2]).toBe('foo');
        expect(spy.calls.mostRecent().args[3]).toBe('bar');
        expect(spy.calls.mostRecent().args[4]).toBe('baz');
    });

    it('ignores non-iterable inputs', function () {
        var each = req('../src/each');
        each([], spy);
        expect(spy).not.toHaveBeenCalled();

        each({}, spy);
        expect(spy).not.toHaveBeenCalled();

        each(null, spy);
        expect(spy).not.toHaveBeenCalled();

        each(undefined, spy);
        expect(spy).not.toHaveBeenCalled();

        each(function () {}, spy);
        expect(spy).not.toHaveBeenCalled();

        each(42, spy);
        expect(spy).not.toHaveBeenCalled();

        each('Super duper mega party', spy);
        expect(spy).not.toHaveBeenCalled();

        each(true, spy);
        expect(spy).not.toHaveBeenCalled();
    });

    it('allows to map arrays', function () {
        var each = req('../src/each');
        expect(each([1, 2, 3, 4], function (val) {
            return 2 * val + 1;
        })).toEqual([3, 5, 7, 9]);
    });

    it('allows to filter arrays', function () {
        var each = req('../src/each');
        expect(each([1, 2, 3, 4], function (val) {
            return (val % 2 === 0) ? val : undefined;
        })).toEqual([2, 4]);
    });

    it('allows to map objects', function () {
        var each = req('../src/each');
        expect(each({
            foo: 1,
            bar: 2,
            baz: 3,
        }, function (val) {
            return 2 * val + 1;
        })).toEqual({
            foo: 3,
            bar: 5,
            baz: 7
        });
    });

    it('allows to filter objects', function () {
        var each = req('../src/each');
        expect(each({
            foo: 1,
            bar: 2,
            baz: 3,
        }, function (val) {
            return (val % 2 !== 0) ? val : undefined;
        })).toEqual({
            foo: 1,
            baz: 3,
        });
    });

    it('can create a bound function which allows to iterate through arrays', function () {
        // prepare
        var each = req('../src/each');
        var array = [1, 2, 3, 4, 5];
        var f = each.prepare(spy, expectedScope);

        // execute
        f(array, args);

        // verify
        expect(spy).toHaveBeenCalled();
        expect(spy.calls.count()).toBe(array.length);
        expect(actualScope).toBe(expectedScope);

        for (var i = 0; i < array.length; i++) {
            var spyArgs = spy.calls.argsFor(i);
            expect(spyArgs[0]).toBe(array[i]);
            expect(spyArgs[1]).toBe(i);
            expect(spyArgs[2]).toBe(args[0]);
            expect(spyArgs[3]).toBe(args[1]);
            expect(spyArgs[4]).toBe(args[2]);
        }
    });

    it('can create a bound function which allows to iterate through objects', function () {
        // prepare
        var each = req('../src/each');
        var obj = {
            key0: 'value0',
            key1: 'value1',
            key2: 'value2'
        };
        var f = each.prepare(spy, expectedScope);

        // execute
        f(obj, args);

        // verify
        expect(spy).toHaveBeenCalled();
        expect(spy.calls.count()).toBe(3);
        expect(actualScope).toBe(expectedScope);

        for (var i = 0; i < 3; i++) {
            var spyArgs = spy.calls.argsFor(i);
            var key = 'key' + i;
            var value = 'value' + i;

            expect(spyArgs[0]).toBe(value);
            expect(spyArgs[1]).toBe(key);
            expect(spyArgs[2]).toBe(args[0]);
            expect(spyArgs[3]).toBe(args[1]);
            expect(spyArgs[4]).toBe(args[2]);
        }
    });
});

var assert  = require('assert');
var oo      = require('../index');

describe('refactoring', function() {
    describe('#class()', function () {
        it('should get parent class.', function () {
            var Class1 = oo.class({});
            var Class2 = oo.class({extends: Class1});
            var c2 = new Class2();

            assert.equal(c2.$parent, Class1);
        });

        it('should get abstract list of class.', function () {
            var Class1 = oo.class({
                abstract: [
                    "method1",
                    "method2",
                    "method1",
                    "method3"
                ]
            });

            var c1 = new Class1();
            assert.equal(JSON.stringify(c1.$abstract), JSON.stringify(['method1', 'method2', 'method3']));
        });

        it('should get abstract list of class with parent.', function () {
            var Class1 = oo.class({
                abstract: [
                    "method1",
                    "method2",
                    "method1",
                    "method3"
                ]
            });

            var Class2 = oo.class({
                extends: Class1,
                abstract: [
                    "method3",
                    "method4"
                ]
            });

            var c2 = new Class2();
            assert.equal(JSON.stringify(c2.$abstract), JSON.stringify(['method1', 'method2', 'method3', 'method4']));
        });
    });
});
var assert  = require('assert');
var oo      = require('../index');

describe('class-attributes', function() {
    describe('#class()', function () {
        it('should get parent class/extend method/extend attributes.', function () {
            var Class1 = oo.class({
                public: {
                    method1: function() {return 2;},
                    value1: 1
                }
            });

            var Class2 = oo.class({extends: Class1});
            var c2 = new Class2();

            assert.equal(c2.$parent, Class1);
            assert.equal(c2.method1(), 2);
            assert.equal(c2.value1, 1);
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

            assert.equal(JSON.stringify(Class1.prototype.$abstract), JSON.stringify(['method1', 'method2', 'method3']));
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
                    "method4",
                    "method5"
                ]
            });

            var Class3 = oo.class({
                extends: Class2,
                abstract: [
                    "method3",
                    "method1",
                    "method6"
                ]
            });

            assert.equal(JSON.stringify(Class3.prototype.$abstract), JSON.stringify(['method1', 'method2', 'method3', 'method4', 'method5', 'method6']));
        });
    });
});
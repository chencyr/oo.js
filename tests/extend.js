var assert  = require('assert');
var oo      = require('../index');

describe('oojs', function() {
    describe('#class()', function () {
        //
        //it('should access public getter, setter, variable', function () {
        //
        //    var Class1 = oo.class({
        //        public: {
        //            name: "Class 1",
        //
        //            getName: function() {
        //                return this.name;
        //            },
        //
        //            setName: function(name) {
        //                this.name = name;
        //            }
        //        }
        //    });
        //
        //    var c = new Class1();
        //
        //    assert.equal("Class 1", c.getName());
        //    assert.equal("Class 1", c.name);
        //    c.setName("New Name");
        //    assert.equal("New Name", c.getName());
        //    assert.equal("New Name", c.name);
        //
        //    c.name = "New Name 2";
        //    assert.equal("New Name 2", c.getName());
        //    assert.equal("New Name 2", c.name);
        //});
        //
        //it('should access parent class public getter, setter, variable', function () {
        //
        //    var Class1 = oo.class({
        //        public: {
        //            name: "Class 1",
        //
        //            getName: function() {
        //                return this.name;
        //            },
        //
        //            setName: function(name) {
        //                this.name = name;
        //            }
        //        }
        //    });
        //
        //
        //    var Class2 = oo.class({extends: Class1});
        //    var c = new Class2();
        //
        //    assert.equal("Class 1", c.getName());
        //    assert.equal("Class 1", c.name);
        //    c.setName("New Name");
        //    assert.equal("New Name", c.getName());
        //    assert.equal("New Name", c.name);
        //
        //    c.name = "New Name 2";
        //    assert.equal("New Name 2", c.getName());
        //    assert.equal("New Name 2", c.name);
        //});

        it('should throw exception when parent class abstract method not implement in child class.', function () {

            var Class1 = oo.class({
                public: {
                    name: "Class 1",

                    setName: function(name) {
                        this.name = name;
                    }
                },

                abstract: [
                    "getName"
                ]
            });


            var Class2 = oo.class({
                extends: Class1,
                abstract: [
                    "getYear"
                ]
            });

            var Class3 = oo.class({
                extends: Class2,
                public: {
                    getName: function() {
                        return "Class 3 implement:" + this.name;
                    },

                    getYear: function() {
                        return 10;
                    }
                }
            });

            var c = new Class3();
            console.log(c.name);
            console.log(c.getName());
            c.setName("new Name")
            console.log(c.name);
            console.log(c.getName());


        });
    });
});
var assert  = require('assert');
var oo      = require('../index');

describe('oojs', function() {
    describe('#class()', function () {

        it('should access public getter, setter, variable', function () {

            var Class1 = oo.class({
                public: {
                    name: "Class 1",

                    getName: function() {
                        return this.name;
                    },

                    setName: function(name) {
                        this.name = name;
                    }
                }
            });

            var c = new Class1();

            assert.equal("Class 1", c.getName());
            assert.equal("Class 1", c.name);
            c.setName("New Name");
            assert.equal("New Name", c.getName());
            assert.equal("New Name", c.name);

            c.name = "New Name 2";
            assert.equal("New Name 2", c.getName());
            assert.equal("New Name 2", c.name);
        });

        it('should access parent class public getter, setter, variable', function () {

            var Class1 = oo.class({
                public: {
                    name: "Class 1",

                    getName: function() {
                        return this.name;
                    },

                    setName: function(name) {
                        this.name = name;
                    }
                }
            });


            var Class2 = oo.class({extends: Class1});
            var c = new Class2();

            assert.equal("Class 1", c.getName());
            assert.equal("Class 1", c.name);
            c.setName("New Name");
            assert.equal("New Name", c.getName());
            assert.equal("New Name", c.name);

            c.name = "New Name 2";
            assert.equal("New Name 2", c.getName());
            assert.equal("New Name 2", c.name);
        });


        // should throw exception when parent class abstract method not implement in child class.

        it('should implement parent abstract method.', function () {

            var Class1 = oo.class({
                public: {
                    name: "Class 1",
                    setName: function(name) {
                        this.name = name;
                    }
                },
                abstract: [
                    "getName",
                ]
            });


            var Class2 = oo.class({ extends: Class1,
                abstract: [
                    "getYear"
                ]
            });

            var Class3 = oo.class({ extends: Class2,
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
            assert.equal("Class 1", c.name);
            assert.equal("Class 3 implement:Class 1", c.getName());

            c.setName("new Name");
            assert.equal("new Name", c.name);
            assert.equal("Class 3 implement:new Name", c.getName());

            assert.equal(true, c instanceof Class1);
        });

        it('should get abstract not implement error.', function () {

            var Class1 = oo.class({
                public: {
                    name: "Class 1",
                    setName: function(name) {
                        this.name = name;
                    }
                },
                abstract: [
                    "getName",
                ]
            });


            var Class2 = oo.class({ extends: Class1,
                abstract: [
                    "getYear"
                ]
            });

            var Class3 = oo.class({ extends: Class2,
                public: {
                    getYear: function() {
                        return 10;
                    }
                }
            });

            var exc = null;
            try {
                var c = new Class3();
            }
            catch(e) {
                exc = e;
            }

            assert.equal(exc.message, "Abstract method [getName] not implement error.");
        });

        it('should construct by method _constuct().', function () {

            var Class1 = oo.class({
                public: {
                    name: "Class 1",
                    setName: function(name) {
                        this.name = name;
                    }
                },
                abstract: [
                    "getName",
                ]
            });


            var Class2 = oo.class({ extends: Class1,
                abstract: [
                    "getYear"
                ]
            });

            var Class3 = oo.class({ extends: Class2,
                public: {
                    _construct: function(name) {
                        this.name = name;
                    },
                    getName: function() {
                        return "Class 3 implement:" + this.name;
                    },
                    getYear: function() {
                        return 10;
                    }
                }
            });

            var c = new Class3('constuct 1');
            assert.equal("constuct 1", c.name);
            assert.equal("Class 3 implement:constuct 1", c.getName());

            c.setName("new Name");
            assert.equal("new Name", c.name);
            assert.equal("Class 3 implement:new Name", c.getName());

            assert.equal(true, (c instanceof Class1));
        });

        it('should implement parent abstract method.', function () {

            var Class1 = oo.class({
                public: {
                    name: "Class 1",
                    setName: function(name) {
                        this.name = name;
                    }
                },
                abstract: [
                    "getName",
                ]
            });


            var Class2 = oo.class({ extends: Class1,
                abstract: [
                    "getYear"
                ]
            });

            var Class3 = oo.class({ extends: Class2,
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
            assert.equal("Class 1", c.name);
            assert.equal("Class 3 implement:Class 1", c.getName());

            c.setName("new Name");
            assert.equal("new Name", c.name);
            assert.equal("Class 3 implement:new Name", c.getName());

            assert.equal(true, (c instanceof Class1));
        });

    });
});
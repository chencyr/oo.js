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

            assert.equal(true, (c instanceof Class1));
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


        it('should call parent methods.', function () {

            var ParentClass = oo.class({
                public: {
                    _construct: function(age) {
                        this.firstName  = "Chen";
                        this.lastName   = "Rex";
                        this.age        = age;
                        this.skin       = "white";
                    },
                    getName: function() {
                        return this.lastName + " " +this.firstName;
                    },
                    getSkin: function() {
                        return this.skin;
                    }
                }
            });


            var ChildClass = oo.class({
                extends: ParentClass,
                public: {
                    _construct: function(age, skin, gender, lastName) {
                        this._parent("_construct")(age);
                        this.gender     = gender;
                        this.skin       = skin;
                        this.lastName   = lastName;
                    },
                    getGender: function() {
                        return this.gender;
                    }
                }
            });

            var parent = new ParentClass(30);
            var child1 = new ChildClass(6, 'black', 'female', 'Hannah');
            var child2 = new ChildClass(8, 'yellow', 'male', 'Paco');

            assert.equal("Rex Chen", parent.getName());
            assert.equal(30, parent.age);
            assert.equal('white', parent.getSkin());

            assert.equal("Hannah Chen", child1.getName());
            assert.equal(6, child1.age);
            assert.equal('black', child1.getSkin());
            assert.equal('female', child1.getGender());

            assert.equal("Paco Chen", child2.getName());
            assert.equal(8, child2.age);
            assert.equal('yellow', child2.getSkin());
            assert.equal('male', child2.getGender());
        });

        it('should call multiple extends layer methods.', function () {

            var Layer1 = oo.class({
                public: {
                    _construct: function() {
                        //this.sum = this.sum || 1;
                    },
                    getId: function() {
                        return "layer1";
                    },
                    getCount: function() {
                        return 2;
                    }
                }
            });


            var Layer2 = oo.class({
                extends: Layer1,
                public: {
                    _construct: function() {
                        this._parent("_construct")();
                        this.sum = this.sum + 3;
                    },
                    getId: function() {
                        return "layer2";
                    },
                    getCount: function() {
                        return 4 + this._parent('getCount')();
                    }
                }
            });

            var Layer3 = oo.class({
                extends: Layer2,
                public: {
                    _construct: function() {
                        this._parent("_construct")();
                        this.sum = this.sum + 8;
                    },
                    getId: function() {
                        return "layer3";
                    },
                    getCount: function() {
                        return 8 + this._parent('getCount')();
                    }
                }
            });


            var layer2 = new Layer2();
            var layer3 = new Layer3();

            assert.equal('layer3', layer3.getId());
            assert.equal('layer2', layer3._parent('getId')());
            assert.equal('layer1', layer3._parent('_parent')('getId')());
            assert.equal('layer1', layer3._parent('_parent')('getId')());
            assert.equal('layer3', layer3.getId());
            assert.equal('layer2', layer3._parent('getId')());
            assert.equal(14, layer3.getCount());

            assert.equal('layer2', layer2.getId());
            assert.equal('layer1', layer2._parent('getId')());
            assert.equal(6, layer2.getCount());

        });
    });
});
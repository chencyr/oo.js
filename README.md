# oo.js
For nodejs object oriented helper.
util.inherits object compatible.

# Install
```
npm install -g oo.js
```

# Example Abstract Define.
```
var oo = require('oo.js');
                
var Car = oo.class({
    public: {
        gas: 10,
        getGas: function() {
            return this.gas;
        },
        addGas: function(gas) {
            this.gas = this.gas + gas;
        }
    },

    abstract: [
        "run"
    ]
});

var SuperCar = oo.class({ extends: Car,
    public: {
        run: function() {
            this.gas = this.gas - 1;
        }
    }
});
            
var myCar = new SuperCar();
console.log(myCar.getGas()); // 10
                
myCar.run();
console.log(myCar.getGas()); // 9
                
myCar.addGas(3);
console.log(myCar.getGas()); // 12
```

# Example call parent method.
```
var oo = require('oo.js');

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
```

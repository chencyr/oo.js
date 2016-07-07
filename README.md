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

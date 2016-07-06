const extend = require('extend');
const util = require('util');

console.log("test feature");
console.log("Object", Object);
console.log("Object.defineProperty", Object.defineProperty);

var MyClass = function() {};

MyClass.prototype.method1 = function() {
    console.log("method1");
};

MyClass.prototype.method2 = function() {
    console.log("method2");
};

MyClass.prototype.method3 = function() {
    console.log("method3");
};

Object.defineProperty(MyClass.prototype, 'method2', {
    enumerable : false,
    writable: false,
    value : MyClass.prototype.method2
});


var myclass = new MyClass();
for(var key in myclass) {
    console.log("key: ", key);
}

myclass.method1();
myclass.method2();
myclass.method3();

console.log("------------------------------------------------");

var obj1 = {
    v1: function() {return 1},
    v2: function() {return 2},
    v3: function() {return 3},
};

var obj2 = {
    v1: function() {return 4},
    v2: function() {return 5},
    v3: function() {return 6},
};


obj2.v2 = obj1.v2;
console.log("obj2.v2 = obj1.v2 ->", obj1.v2(), obj2.v2());

obj1.v2 = function() {return 0;};
console.log("obj1.v2 = function() { return 0; } ->", obj1.v2(), obj2.v2());


console.log("------------------------------------------------");

var MyClass2 = function() {
    return {"test": function() {return "costumer"}};
};

MyClass2.prototype.test = function() {
    return "prototype";
};

var myclass2 = new MyClass2();
console.log("myclass2.test()", myclass2.test());


console.log("------------------------------------------------");

var MyClass3 = function() {
    console.log("myclass3 construct!");
};

for(var name in MyClass2.prototype) {
    MyClass3.prototype[name] = MyClass2.prototype[name];
}


var myclass3 = new MyClass3();
console.log("myclass3.test()", myclass3.test());
console.log(myclass3 instanceof MyClass2);





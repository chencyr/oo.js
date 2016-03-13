const util = require('util');

/**
 * Throw exception when abstract method not implement found.
 * @param abstractList [method1: string, method2: string...];
 * @param publicList {method1: function..., method2: string...}
 */
var checkAbstractMethod = function(abstractList, publicList) {
    if(typeof (abstractList) == 'object') {
        for(var i in abstractList) {
            if(typeof abstractList[i] == 'string') {

                var abstractMethod = abstractList[i];

                //check abstract method was implement by child class.
                if(typeof (publicList) == 'object') {
                    var isImplement = false;
                    for(var name in publicList) {
                        if(typeof publicList[name] == 'function') {
                            if(name == abstractMethod) {
                                isImplement = true;
                            }
                        }
                    }

                    if(! isImplement) {
                        throw {message: "Abstract method '" + abstractMethod + "' not implement error." };
                    }
                }
                else {
                    throw {message: "Abstract method '" + abstractMethod + "' not implement error." };
                }
            }
        }
    }
};

/**
 *
 * @param childClass
 * @param parentClass
 */
var inheritsAbstract = function(childClass, parentClass) {
    childClass.prototype.abstract_ = [];
    for(var i in parentClass.prototype.abstract_) {
        var abstractList = parentClass.prototype.abstract_[i];
        childClass.prototype.abstract_.push(abstractList);
    }
};

/**
 * Support a simply way to develop javascript application by Object Oriented Design.
 */
const oojs = {

    /**
     * Define a new class.
     * @param args {json} {public: {method1:..., method2:...}, abstract: [method1(string), method2(string)], extends: ParentClass }
     */
    class: function(args) {

        var newClass = function() {

            // check abstract method is implement.
            var abstractCollection = this.__proto__.abstract_;
            for(var i in abstractCollection) {
                checkAbstractMethod(abstractCollection[i], this);
            }
        };

        if(typeof (args.extends) == 'function') {
            util.inherits(newClass, args.extends);
            inheritsAbstract(newClass, args.extends);
        }
        else {
            newClass.prototype.abstract_ = [];
        }

        // Setting abstract method list.
        if(typeof (args.abstract) == 'object') {
            for(var i in args.abstract) {
                if(typeof args.abstract[i] != 'string') {
                    throw {message: "Abstract method name not is string error in define list " + i + "." };
                }
            }

            newClass.prototype.abstract_.push(args.abstract);
        }

        // Setting public methods.
        if(typeof (args.public) == 'object') {
            for(var name in args.public) {
                newClass.prototype[name] = args.public[name];
            }
        }

        return newClass;
    },

    interface: function() {

    },

    instanceOf: function() {

    }

};

module.exports = oojs;
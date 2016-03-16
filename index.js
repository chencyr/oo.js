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


var inheritsParentCaller = function(childClass) {

    childClass.prototype._parent = function(methodName) {
        var self = this;
        this.scopeDeep_ = this.scopeDeep_ || {};
        this.scopeDeep_[methodName] = this.scopeDeep_[methodName] || 0;

        return function() {
            self.scopeDeep_[methodName]++;
            var parentClass = childClass.super_;
            for(var i = 1; i < self.scopeDeep_[methodName]; i++) {
                parentClass = parentClass.super_;
            }

            var result =  parentClass.prototype[methodName].apply(self, arguments);
            self.scopeDeep_[methodName]--;
            return result;
        }
    };
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

        var newClass = function(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {

            // check abstract method is implement.
            var abstractCollection = this.__proto__.abstract_;
            for(var i in abstractCollection) {
                checkAbstractMethod(abstractCollection[i], this);
            }

            if(typeof (this._construct) == 'function') {
                this._construct(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11);
            }
            else {
                this._construct = function() {};
            }
        };

        if(typeof (args.extends) == 'function') {
            util.inherits(newClass, args.extends);
            inheritsAbstract(newClass, args.extends);
            inheritsParentCaller(newClass, args.extends);
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

    /**
     * Check two class type is equal.
     * @param class1
     * @param class2
     * @returns {boolean} Return ture when two class are equal.
     */
    typeEqual: function(class1, class2) {
        throw {message: "Not implement the method."};
    }

};

module.exports = oojs;
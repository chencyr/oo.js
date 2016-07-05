const util = require('util');
const extend = require('extend');


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


        var OOJSClassConstructor,
            index,
            $index,
            method,
            $isAbstractExists,
            abstractLength,
            $abstractLength,
            $abstract;

        // Create new class constructor.
        OOJSClassConstructor = function() {
            // check abstract method is implement.
            //var abstractCollection = this.__proto__.abstract_;
            //for(var i in abstractCollection) {
            //    checkAbstractMethod(abstractCollection[i], this);
            //}
            //
            //if(typeof (this._construct) == 'function') {
            //    this._construct(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11);
            //}
            //else {
            //    this._construct = function() {};
            //}
        };

        args = args || {};

        // Initial private properties.
        if(Object.defineProperty) {
            $abstract = [];
            Object.defineProperty(OOJSClassConstructor.prototype, '$abstract', {
                enumerable : false,
                get: function() {
                    return $abstract;
                }
            });

            Object.defineProperty(OOJSClassConstructor.prototype, '$reservedWord', {
                enumerable : false,
                writable: false,
                value : ['$abstract', '$parent', '$reservedWord']
            });
        }
        else {
            OOJSClassConstructor.prototype.$abstract = [];
            OOJSClassConstructor.prototype.$reservedWord = [
                '$abstract',
                '$parent',
                '$reservedWord'
            ];
        }

        // Inherit parent's properties.
        if(typeof (args.extends) == 'function') {
            if(Object.defineProperty) {
                Object.defineProperty(OOJSClassConstructor.prototype, '$parent', {
                    enumerable : false,
                    writable: false,
                    value : args.extends
                });
            }
            else {
                OOJSClassConstructor.prototype.$parent = args.extends;
            }

            // extend abstract list.
            $abstractLength = OOJSClassConstructor.prototype.$parent.prototype.$abstract.length;
            for($index = 0; $index < $abstractLength; $index++) {
                method = OOJSClassConstructor.prototype.$parent.prototype.$abstract[$index];
                OOJSClassConstructor.prototype.$abstract.push(method);
            }

            // extend attributes/methods.
            for($index in OOJSClassConstructor.prototype.$parent.prototype) {
                method = OOJSClassConstructor.prototype.$parent.prototype[$index];
                OOJSClassConstructor.prototype[$index] = method;
            }
        }
        else {
            if(Object.defineProperty) {
                Object.defineProperty(OOJSClassConstructor.prototype, '$parent', {
                    enumerable : false,
                    writable: false,
                    value : null
                });
            }
            else {
                OOJSClassConstructor.prototype.$parent = null;
            }
        }

        // Setting abstract method list.
        if(args.abstract) {
            abstractLength = args.abstract.length;
            for(index = 0; index < abstractLength; index++) {
                method = args.abstract[index]
                if(typeof method != 'string') {
                    throw {message: "Abstract method name error in define list " + index + "." };
                }
                else {
                    $isAbstractExists   = false;
                    $abstractLength     = OOJSClassConstructor.prototype.$abstract.length;
                    for($index = 0; $index < $abstractLength; $index++) {
                        $isAbstractExists = $isAbstractExists ||
                            (OOJSClassConstructor.prototype.$abstract[$index] == method);
                    }

                    if(!$isAbstractExists) {
                        OOJSClassConstructor.prototype.$abstract.push(method);
                    }
                }
            }
        }


        // Setting public methods.
        if(typeof (args.public) == 'object') {
            for(index in args.public) {
                method = args.public[index];
                OOJSClassConstructor.prototype[index] = method;
            }
        }

        return OOJSClassConstructor;
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
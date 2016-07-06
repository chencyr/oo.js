//
//var inheritsParentCaller = function(childClass) {
//
//    childClass.prototype._parent = function(methodName) {
//        var self = this;
//        this.scopeDeep_ = this.scopeDeep_ || {};
//        this.scopeDeep_[methodName] = this.scopeDeep_[methodName] || 0;
//
//        return function() {
//            self.scopeDeep_[methodName]++;
//            var parentClass = childClass.super_;
//            for(var i = 1; i < self.scopeDeep_[methodName]; i++) {
//                parentClass = parentClass.super_;
//            }
//
//            var result =  parentClass.prototype[methodName].apply(self, arguments);
//            self.scopeDeep_[methodName]--;
//            return result;
//        }
//    };
//};

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
            Parent,
            Invoker,
            invoker,
            $isAbstractExists,
            abstractLength,
            $abstractLength,
            $abstract;

        // Create new class constructor.
        OOJSClassConstructor = function() {
            var $index,
                $method,
                method,
                isAbstractImplemented;

            // check abstract method is implement.
            for($index in this.$abstract) {
                $method = this.$abstract[$index];
                isAbstractImplemented = false;
                for(method in this) {
                    isAbstractImplemented = isAbstractImplemented ||
                        (method == $method);
                }
                if(!isAbstractImplemented) {
                    throw "Abstract method [" + $method + "] not implement error.";
                }
            }

            Parent = this.$parent;
            invoker = this;
            var count = 0;
            while(Parent) {
                count++;
                Invoker = Parent.prototype.$invoker;
                invoker.invoker = new Invoker(this);
                Parent = Parent.prototype.$parent;
                invoker = invoker.invoker;
            }

            if(typeof (this._construct) == 'function') {
                this._construct.apply(this, arguments);
            }
            else {
                this._construct = function() {};
            }
        };

        args = args || {};

        if(typeof (args.extends) == 'function') {
            try {
                var util = require('util');
                util.inherits(OOJSClassConstructor, args.extends);
            }
            catch(e) {

            }
        }

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

        OOJSClassConstructor.prototype.$invoker = function(instance) {
            this.instance = instance;
        };

        var $invoker = OOJSClassConstructor.prototype.$invoker;

        for(index in OOJSClassConstructor.prototype) {
            if(index != '$invoker' && typeof OOJSClassConstructor.prototype[index] == 'function') {
                var assign="";
                assign += "$invoker.prototype." + index + " = function() {";
                assign += "                    var parentFunction = OOJSClassConstructor.prototype." + index + ";";
                assign += "                    return parentFunction.apply(this.instance, arguments);";
                assign += "                }";
                eval(assign);
            }
        }

        return OOJSClassConstructor;
    },

    /**
     * Check instance of class.
     * @param object
     * @param classConstructor
     * @returns {boolean} Return true when equal.
     */
    instanceOf: function(object, classConstructor) {
        var isEqual = false,
            parentConstructor = object.$parent;

        while(parentConstructor != null && parentConstructor != undefined) {
            isEqual = isEqual || (parentConstructor == classConstructor);
            try {
                isEqual = isEqual || (parentConstructor instanceof classConstructor);
            }
            catch(e) {}

            parentConstructor = parentConstructor.prototype.$parent;
        }

        return isEqual;
    }

};

module.exports = oojs;
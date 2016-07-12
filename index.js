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
            extendDeep,
            index,
            $index,
            method,
            $isAbstractExists,
            abstractLength,
            $abstractLength,
            $abstract,
            parentAbstract;

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
                    throw {message: "Abstract method [" + $method + "] not implement error."};
                }
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

            if(args.extends.$extendDeep) {
                extendDeep = args.extends.$extendDeep;
            }
            else {
                extendDeep = -1;
            }

            if(Object.defineProperty) {
                Object.defineProperty(OOJSClassConstructor.prototype, '$parent', {
                    enumerable : false,
                    writable: false,
                    value : args.extends
                });

                Object.defineProperty(OOJSClassConstructor.prototype, '$extendDeep', {
                    enumerable : false,
                    writable: false,
                    value : extendDeep + 1
                });
            }
            else {
                OOJSClassConstructor.$extendDeep = extendDeep + 1;
                OOJSClassConstructor.prototype.$parent = args.extends;
            }

            // extend abstract list.
            parentAbstract = OOJSClassConstructor.prototype.$parent.prototype.$abstract || [];
            $abstractLength = parentAbstract.length;
            for($index = 0; $index < $abstractLength; $index++) {
                method = parentAbstract[$index];
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

        // Core methods.
        OOJSClassConstructor.prototype.$eachParent = function(iterator, classConstructor) {
            classConstructor = classConstructor || this.$parent
            if(classConstructor.prototype.$parent) {
                this.$eachParent(iterator, classConstructor.prototype.$parent);
            }
            iterator(classConstructor, this);
        };

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
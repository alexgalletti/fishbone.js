// Fishbone.js
//
// Version: 1.0.1
// URL: https://github.com/aemkei/fishbone.js
// Author: Martin Kleppe <kleppe@ubilabs.net>
// License: WTFPL

Model = function _(object) {

    function Klass() {
        var self = this,
            observers = {},
            attributes = {};

        /**
         * Set attribute value by key
         * @param {string} key
         * @param {void} value
         * @return {this}
         */
        self.set = function (key, value) {
            self.attributes[key] = value;
            self.trigger('change', [key, value]);
            self.trigger('change:' + key, value);
            return self;
        };

        /**
         * Confirms existance of attribute
         * @param  {string}  key
         * @return {boolean}
         */
        self.has = function (key) {
            return typeof self.attributes[key] !== 'undefined';
        };

        /**
         * Returns attribute by key
         * @param  {string} key
         * @return {void}
         */
        self.get = function (key) {
            return self.attributes[key];
        };

        /**
         * Remove attribute by key
         * @param  {string} key
         * @return {this}
         */
        self.unset = function (key) {
            delete self.attributes[key];
            return self;
        };

        /**
         * Register an event listener with a callback
         * @param  {string} event
         * @param  {function} listener
         * @return {this}
         */
        self.on = function(event, listener) {
            (observers[event] || (observers[event] = [])).push(listener);
            return self;
        };

        /**
         * Triggers all events with specified data
         * @param  {string} event
         * @param  {void} data
         * @return {this}
         */
        self.trigger = function(event, data) {
            for (var listeners = observers[event], key = 0; listeners && key < listeners.length;) {
                listeners[key++](data);
            }
            return self;
        };

        /**
         * Remove all event listeners for the specified event
         * @param  {string} event
         * @param  {function} listener
         * @return {this}
         */
        self.off = function(event, listener) {
            for (listeners = observers[event] || [];listener && (key = listeners.indexOf(listener)) > -1;) {
                listeners.splice(key, 1);
            }
            observers[event] = listener ? listeners : [];
            return self;
        };

        for (var key in object) {
            var value = object[key];
            self[key] = (typeof value === 'function') ? function() {return (value = this.apply(self, arguments)) === undefined ? self : value;}.bind(value) : value;
        }

        self.init && self.init.apply(self, arguments);
    }

    /**
     * Extends uninitalized class with a fresh instance
     * @param  {object} overrides
     * @return {function}
     */
    Klass.extend = function(overrides) {
        var value = {};

        for (var key in object) {
            value[key] = object[key];
        }

        for (key in overrides) {
            value[key] = overrides[key];
            object[key] !== undefined && (value['__' + key] = object[key]);
        }

        return _(value);
    };

    return Klass;
};

if (typeof module === 'object') {
    module.exports = Model;
}
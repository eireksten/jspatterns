var steria = steria || {};

steria.eventsmixin = (function () {
	"use strict";

	return function (target) {
	    
	    var events = {};

	    target.on = function (type, func, ctx) {
	        events[type] = events[type] || [];
	        events[type].push({
	            fun: func,
	            ctx: ctx
	        });
	    };

	    target.off = function (type, func) {
	        var listeners = events[type] || [],
	            i = listeners.length = func ? listeners.length : 0;

	        while (i-- > 0) {
	          if (func === listeners[i].fun) {
	                listeners.splice(i,1);
	          }
	        }
	    };

	    target.emit = function () { // emit(type, args...)
	        var args = Array.apply([], arguments),
	            listeners = events[args.shift()] || [], 
	            i;

	        for (i = 0; i < listeners.length; i++) {
	            listeners[i].fun.apply(listeners[i].ctx, args);
	        }
	    };
	};
}());
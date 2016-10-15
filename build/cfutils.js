(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Browser build requires
 *
 */
"use strict";

module.exports = {

    CF: require( "./src/Browser/Namespace.js" )

};

},{"./src/Browser/Namespace.js":2}],2:[function(require,module,exports){
/**
 * CF Utils browser namespace
 *
 */
"use strict";

var CF = CF || {};


//Revision Namespace

CF.Utils = { REVISION: 1 };

CF.Utils.String = require( "./../String.js" );
CF.Utils.Object = require( "./../Object.js" );


//Export

module.exports = CF;

},{"./../Object.js":3,"./../String.js":4}],3:[function(require,module,exports){
/**
 * Object utils
 *
 */
"use strict";

var ObjectUtils = {

    //Object to array

    arrayToObject: function( arr ) {

        var rv = {};

        for( var i = 0; i < arr.length; i++ ) {

            rv[arr[i]] = arr[i];

        }

        return rv;

    },


    //Array remove by value

    arrayRemove: function( array, value ) {

        var al = array.length;

        for( var i = 0; i < al; i ++ ) {

            if( array[ i ] === value ) {

                array.splice( i, 1 );
                return array;

            }

        }

    },


    //Is array polyfill

    isArray: function( array ) {

        if( typeof Array.isArray === "undefined" ) {

            return Object.prototype.toString.call( array ) === "[object Array]";

        } else {

            return Array.isArray( array );

        }

    },


    //In Array

    inArray: function( needle, haystack ) {

        var hl = haystack.length;

        for( var i = 0; i < hl; i ++ ) {

            if( needle === haystack[ i ] ) {

                return true;

            }

        }

        return false;

    },


    //Create a range of numbers

    createRange: function( start, end ) {

        var numArray = Array.apply( null, { length: end + 1 } );
        return numArray.map( Number.call, Number ).slice( start );

    },


    //Create a range of numbers into an object

    createRangeObject: function( start, end ) {

        return ObjectUtils.arrayToObject( ObjectUtils.createRange( start, end ) );

    },


    //Proxy function to bypass no bind() for I.E < 9

    proxy: function( callback ) {

        return function() { callback(); }

    },


    //Highly used as an inheritance

    setDefaults: function( object, defaults ) {

        var defaults = typeof( defaults ) === "object" ? defaults: {};
        var object = typeof( object ) === "object" ? object : defaults;

        if( object === defaults ) { return object; }

        for( var defaultName in defaults ) {

            var defaultVal = defaults[ defaultName ];
            var objectVal = object[ defaultName ];

            if( typeof( defaultVal ) === "object" ) {

                object[ defaultName ] = ObjectUtils.setDefaults( objectVal, defaultVal );

            } else if( typeof( objectVal ) === "undefined" ) {

                object[ defaultName ] = defaults[ defaultName ];

            }

        }

        return object;

    },


    //Get object length "size"

    getObjectSize: function( obj ) {

        var size = 0, key;

        for (key in obj) {

            if( obj.hasOwnProperty( key ) ) { size++; }

        }

        return size;

    }

};

module.exports = ObjectUtils;

},{}],4:[function(require,module,exports){
/**
 * String helpers
 *
 */
"use strict";

var StringUtils = {

    //Similar to UC words php

    labelize: function( string ) {

        string = string.toString().replace( /_/g, " " );

        var pieces = string.split( " " );
        var pl = pieces.length;

        for ( var i = 0; i < pl; i++ ) {

            var j = pieces[i].charAt(0).toUpperCase();
            pieces[i] = j + pieces[i].substr(1);

        }

        return pieces.join( " " );

    },

    unlabelize: function( text ) {

        return text.toLowerCase().replace( /\ /g, "_" ).trim();

    },


    // http://www.broofa.com/Tools/Math.uuid.htm

    generateUUID: (function() {

		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split( '' );
		var uuid = new Array( 36 );
		var rnd = 0, r;

		return function() {

			for( var i = 0; i < 36; i ++ ) {

				if( i === 8 || i === 13 || i === 18 || i === 23 ) {

					uuid[ i ] = '-';

				} else if( i === 14 ) {

					uuid[ i ] = '4';

				} else {

					if( rnd <= 0x02 ) rnd = 0x2000000 + ( Math.random() * 0x1000000 ) | 0;
					r = rnd & 0xf;
					rnd = rnd >> 4;
					uuid[ i ] = chars[ ( i === 19 ) ? ( r & 0x3 ) | 0x8 : r ];

				}

			}

			return uuid.join( '' );

		};

	})()

};


//export

module.exports = StringUtils;

},{}]},{},[1]);

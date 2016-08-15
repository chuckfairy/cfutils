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

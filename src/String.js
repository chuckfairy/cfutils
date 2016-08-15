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

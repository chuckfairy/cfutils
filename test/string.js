/**
 * Basic mocha string tests
 *
 * @requires mocha
 *
 */
"use strict";

var Assert = require( "assert" );

var StringUtils = require( "./../src/String.js" );

describe( "String", function( callback ) {

    it( "Should create unique uuid", uuidTest );

});


/**
 * Very basic uuid test
 *
 * @param Function done
 *
 */

function uuidTest( done ) {

    var str1 = StringUtils.generateUUID();
    var str2 = StringUtils.generateUUID();

    Assert.notEqual( str1, str2 );

    done();

}

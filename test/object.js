/**
 * Basic mocha CF.Object tests
 *
 * @example
 * mocha test/object.js
 *
 * @requires mocha
 *
 */
"use strict";

var Assert = require( "assert" );

var ObjectUtils = require( "./../src/Object.js" );


//Main describe

describe( "Object", function( callback ) {

    it( "Should extend JSON", uuidTest );

});


/**
 * Very basic object extend test
 *
 * @param Function done
 *
 */

function uuidTest( done ) {

    var objJson1 = { test1: "string" };
    var objJson2 = { test2: { "key": 1 } };

    var strJsonFinal = "{\"test1\":\"string\",\"test2\":{\"key\":1}}";

    var objFinal = ObjectUtils.setDefaults( objJson1, objJson2 );

    var strStringify = JSON.stringify( objFinal );

    Assert.equal( strJsonFinal, strStringify );

    done();

}

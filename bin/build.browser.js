#!/usr/bin/env node

/**
 * Browserify api build
 */

"use strict";

var Browserify = require( "browserify" );
var FS = require( "fs" );

var MAIN_FILE = __dirname + "/../browser.js";
var BUILD_URL = __dirname + "/../build/cfutils.js";
var BUILD_STREAM = FS.createWriteStream( BUILD_URL );

var Build = Browserify();
Build.add( MAIN_FILE );
Build.bundle().pipe( BUILD_STREAM );

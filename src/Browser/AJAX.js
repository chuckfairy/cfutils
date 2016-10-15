/**
 * AJAX helper utils
 *
 * @requires[ XMLHttpRequest ]
 */
"use strict";

var AJAX = new function() {

    var scope = this;


    //Request create

    scope.createRequest = function() {

        try { return new XMLHttpRequest(); }
        catch( e ) {}
        try { return new ActiveXObject( 'Msxml2.XMLHTTP.6.0' ); }
        catch (e) {}
        try { return new ActiveXObject( 'Msxml2.XMLHTTP.3.0' ); }
        catch (e) {}
        try { return new ActiveXObject( 'Microsoft.XMLHTTP' ); }
        catch (e) {}
        return false;

    };


    //Basic GET

    scope.get = function( url, callback ) {

        var request = scope.createRequest();

        request.onreadystatechange = function() {

            if( request.readyState === 4 && request.status === 200 ) {

                callback( this.responseText.toString() );

            }

        };

        request.open( "GET", url, true );
        request.send();

    };


    //Basic POST

    scope.post = function( url, title, data, callback, err ) {

        var request = scope.createRequest();
        request.open("POST", url);

        request.onreadystatechange = function() {

            if( request.readyState === 4 ) {

                if( request.status === 200 ) {

                    var responseText = this.response;
                    callback && callback( responseText );

                } else {

                    console.log( this );
                    err && err( this );

                }

            }

        };

        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        postData = title + "=" + encodeURIComponent(JSON.stringify(data));
        request.send(postData);

    };

};


//Export

module.exports = AJAX;

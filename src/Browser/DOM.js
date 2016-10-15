/**
 * DOM Utils
 *
 */
"use strict";

var DOM = {

    elementParse: function( domElement ) {

        var data = {
            id: {},
            class: {},
            attribute: {}
        };

        var dataReg = /^data\-(.+)$/;

        var children = domElement.getElementsByTagName("*");

        var cl = children.length;

        for( var i = 0; i < cl; i ++ ) {

            var child = children[ i ];


            //is specially set

            var id = child.getAttribute( "id" ) || child.getAttribute( "data-id" );

            if( id ) {

                data.id[ id ] = child;

            }


            var attributes = child.attributes;
            var al = attributes.length;

            for( var a = 0; a < al; a ++ ) {

                var attribute = attributes[ a ];

                var value = child.getAttribute( attribute );

                if( attribute === "id" ) { continue; }

                if( !data[ attribute ] ) {

                    data[ attribute ] = {}

                }

                data[ attribute ][ child.getAttribute( attribute ) ] = child;

            }

        }

        return data;

    },


    //Multi event listeners

    addEvents: function( evt, array, fnc ) {

        var al = array.length;

        for( var i = 0; i < al; i ++ ) {

            ObjectUtils.addEvent( evt, array[ i ], fnc );

        }

    },


    //Add event listener

    addEvent: function( evt, obj, fnc ) {

        // W3C model
        if( obj.addEventListener ) {

            return obj.addEventListener( evt, fnc, false );

        }

        // Microsoft model
        else if( obj.attachEvent ) {

            return obj.attachEvent( 'on' + evt, fnc );

        }

        // Browser don't support W3C or MSFT model, go on with traditional
        else {

            evt = 'on'+evt;

            if(typeof obj[evt] === 'function') {

                // Object already has a function on traditional
                fnc = (function(f1,f2){
                    return function(){
                        f1.apply(this,arguments);
                        f2.apply(this,arguments);
                    }
                })(obj[evt], fnc);

            }

            return obj[evt] = fnc;

        }

    },


    dispatchEvent: function( element, event ){

        if( document.createEventObject ){

            // dispatch for IE
            var evt = document.createEventObject();
            return element.fireEvent('on'+event,evt)

        } else {

            // dispatch for firefox + others
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent(event, true, true ); // event type,bubbling,cancelable
            return !element.dispatchEvent(evt);

        }

    },

    //return a dom node from a string

    parseHTML: function( htmlString ) {

        var wrapper = document.createElement( "div" );

        wrapper.innerHTML = htmlString ? htmlString.trim() : "";

        return wrapper.firstChild;

    },


    //get all dom element inputs

    getInputs: function( domElement ) {

        return [].concat(
            [].slice.call( domElement.getElementsByTagName( "textarea" ) ),
            [].slice.call( domElement.getElementsByTagName( "input" ) ),
            [].slice.call( domElement.getElementsByTagName( "select" ) )
        );

    },


    //get input value

    getInputValue: function( questionInput ) {

        if( !questionInput ) { return false; }

        var questionFieldTag = questionInput.tagName;

        switch( questionFieldTag ) {

            case "SELECT":
                return ObjectUtils.selectValue( questionInput );

            case "INPUT": case "TEXTAREA":
                return questionInput.type !== "checkbox" ?
                    questionInput.value : !!questionInput.checked;

            default:
                return questionInput.innerHTML;

        }

    },


    //Get input value

    setInputValue: function( input, defaultVal ) {

        if( !input ) { return; }

        switch( input.tagName ) {

            case "INPUT": case "TEXTAREA":

                var inType = input.getAttribute( "type" );

                if( inType !== "radio" && inType !== "checkbox" ) {

                    input.value = defaultVal || "";

                } else {

                    input.checked = !!defaultVal;

                }

                break;

            case "SELECT":
                if( typeof( defaultVal ) !== "undefined" ) {
                    ObjectUtils.selectToValue( input, defaultVal );
                }
                break;

        }

    },


    //Select element to value

    selectToValue: function( selector, value ) {

        var value = value.toString().trim();
        var options = selector.getElementsByTagName( "option" );
        ol = options.length;

        for( var i = 0; i < ol; i ++ ) {

            var opt = options[ i ];

            if( opt.value.trim() == value ) {

                return selector.selectedIndex = i;

            }

        }

    },


    //Get input value

    selectValue: function( selector ) {

        var opt = selector.options[ selector.selectedIndex ];
        return opt ? opt.value : false;

    }

};


//Export

module.exports = DOM;

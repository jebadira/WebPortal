//var requirejs = require('expose-loader?require!../../../vendor/scripts/require.js');
import { RequireJs } from '../../../vendor/scripts/require.js';
import $ from 'jquery';
var Dispatcher = require('../js/dispatcher.js');
define("Actions",
    function () {
        return {
            loadPlugin: function (name) {
               var promise = $.getScript({
                   method: "get",
                   url: "./" + name + ".js"
               });
               promise.done(function(data){
                debugger;
                    Dispatcher.dispatch({
                        type: 'plugin-loaded',
                        plugin: name
                    });
               });
                /*if (RequireJs.req.defined(name)) {
                    Dispatcher.dispatch({
                        type: 'plugin-loaded',
                        plugin: name
                    });
                } else {
                    RequireJs.req(["TestPlugin"], function (TestPlugin) {

                        debugger;
                        Dispatcher.dispatch({
                            type: 'plugin-loaded',
                            plugin: name
                        })

                    });
                }*/
            }
        }
    }
);


//import {Dispatcher} from '../js/dispatcher.js';

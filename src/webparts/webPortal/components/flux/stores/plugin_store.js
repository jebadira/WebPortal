import fbemitter from 'fbemitter';
var Dispatcher = require('../js/dispatcher.js');
define('PluginStore'
    ,
    function (){
        var _plugins = [];
        var events = new fbemitter.EventEmitter();

        var API = {
            addLoadListener: function(callback) {
               events.addListener('load', callback);
            },
            removeLoadListener : function(callback) {
               event.removeListener('load', callback);
            },
            loaded: function(name) {
               return (_plugins.indexOf(name) !== -1);
            },
            setLoaded : function(name) {
                _plugins.push(name);
                events.emit('load');
            },
        };
       API.dispatchToken = Dispatcher.register(function(action){
            switch(action.type){
                case 'plugin-loaded' :
                    API.setLoaded(action.plugin);
                    break;
            }
        });
        return API;
    }
)
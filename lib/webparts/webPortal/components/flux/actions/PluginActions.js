import $ from 'jquery';
import Dispatcher from '../dispatcher/dispatcher.js';
import PluginActionTypes from './PluginActionTypes.js';
import PluginStore from '../stores/PluginStore.jsx';
import API from '../api/PluginApi.js';
const Actions = {
    loadPlugin : function(plugin){
        debugger;
        
        API.loadPlugin(plugin);
        
        /*else{
            var promise = $.getScript({
            method : "get",
            url: "./" + name + ".js",
        });
            promise.done(function(data){
                Dispatcher.dispatch({
                    type : PluginActionTypes.PLUGINLOADED,
                    plugin : name
                });
            });
            Dispatcher.dispatch({
                type: PluginActionTypes.LOADING,
            });
        }*/
        
    }
}

export default Actions;
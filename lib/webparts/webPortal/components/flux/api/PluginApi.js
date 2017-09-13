import $ from 'jquery';
import Dispatcher from '../dispatcher/dispatcher.js';
import PluginActionTypes from '../actions/PluginActionTypes.js';
import PluginStore from '../stores/PluginStore.jsx';
const API = {
    loadPlugin(plugin){
        if(plugin.has('name')){
            if(plugin.get('url').indexOf('https') > -1){
                var getFile = $.ajax({
                    method : "get",
                    //url: "./" + data.d.results[i].App_x0020_ID + ".js",
                    url : plugin.get('url')
                });
                getFile.done(function(data){
                    debugger;
                    var queryfilter = "DefaultAppPropsNameId eq " + plugin.get('sharePointID') + " ";
                    const loaded = plugin.merge({loaded : true});
                    var loadobj = {};
                    loadobj[loaded.get('ID')] = loaded;
                    Dispatcher.dispatch({
                                type: PluginActionTypes.PLUGINLOADED,
                                loadobj : loaded
                    });
                     var defaultProps = $.ajax({
                        method: "GET",
                        url : "https://asuep.sharepoint.com/sites/DeviLink/_api/web/lists/GetByTitle('App%20Default%20Props')/items?$filter=" + queryfilter,
                        headers: { "Accept": "application/json;odata=verbose" }
                    });
                    defaultProps.done(function(data){
                                debugger;
                                var propObject = {};
                                for(var i = 0; i < data.d.results.length; i++){
                                    propObject[data.d.results[i].AppPropsProp] = data.d.results[i].AppPropsValue;
                                }
                                const plug = plugin.merge({prop: propObject, loaded : true});
                                var plugobj = {};
                                plugobj[plug.get('ID')] = plug;
                                Dispatcher.dispatch({
                                    type: PluginActionTypes.PROPLOADED,
                                    plugin : plugobj
                                });
                            });          
                });
            }
        }
    }
}

export default API;
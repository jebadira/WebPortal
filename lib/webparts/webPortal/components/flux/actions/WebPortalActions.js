import $ from 'jquery'
import Dispatcher from '../dispatcher/dispatcher.js';
import WebPortalActionTypes from './WebPortalActionTypes.js';
import WebPortalStore from '../stores/WebPortalStore.jsx';
import API from '../api/WebPortalApi.js';
const Actions = {
    loadPortal : function(){
        Dispatcher.dispatch({
            type : WebPortalActionTypes.LOADING
        });
        API.loadPortal();
    },

    rearrangePortal : function(){
        Dispatcher.dispatch({
            type: WebPortalActionTypes.REARRANGEPORTAL
        });
    },
    staticPortal : function(){
        //get the value from the store
        debugger;
        var portal = WebPortalStore.getState().get('portal');
        API.save(portal);
        
    },
    updatePortalLayout(currentLayout, layouts){
        debugger;
        var userConfig = {apps : []};
            for(var i =0; i < currentLayout.length; i ++){
                var plugin = WebPortalStore.getState().get('portal').get('apps').find(function(value, key, iter){
                    return value.get('AppID') == currentLayout[i].i;
                });
                userConfig.apps.push({
                   "AppID" : plugin.get("AppID"),
                   "position" : {
                       x : currentLayout[i].x,
                       y : currentLayout[i].y,
                       w : currentLayout[i].w,
                       h : currentLayout[i].h
                   },
                   "Type" : plugin.get("Type")
                });
            }
           if(!Dispatcher.isDispatching()){
                Dispatcher.dispatch({
                    type: WebPortalActionTypes.UPDATEPORTAL,
                    config : userConfig
                });
           }
            
    },
    removeCard(plugin){
        var portal = WebPortalStore.getState().get('portal').get('apps');

        var itemToRemove = portal.findIndex(function(value, key, iter){
            return plugin.get('ID') === value.get('AppID');
        });
        var modifiedPortal = portal.delete(itemToRemove);
        Dispatcher.dispatch({
            type : WebPortalActionTypes.REMOVECARD,
            portal : modifiedPortal
        });
    },
    pinToDashBoard(itemID, layout){
        API.AddApp(itemID, layout);
    }
}

export default Actions;
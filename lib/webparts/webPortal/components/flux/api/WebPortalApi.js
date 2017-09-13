import $ from 'jquery';
import Dispatcher from '../dispatcher/dispatcher.js';
import WebPortalActionTypes from '../actions/WebPortalActionTypes.js';
import PluginStore from '../stores/PluginStore.jsx';
import Immutable from 'immutable';
const API = {
    AddApp(appID, currentConfig){
        debugger;
        var filterstring ="DevilLinkAppListAppID eq '" + appID + "'";
        //get app id from app obj.
        var getData = $.ajax({
                        url : "https://asuep.sharepoint.com/sites/DeviLink/_api/web/lists/GetByTitle('DevilLinkAppList')/items?$filter=" + filterstring,
                        method: "GET",
                        headers: { "Accept": "application/json;odata=verbose" }            
                    });
        getData.done(function(data){
            debugger;
            var pluginObjects = {};
            var isLink = false;
            for(var i = 0; i < data.d.results.length; i++){
                    pluginObjects[data.d.results[i].DevilLinkAppListAppID] ={
                        name : data.d.results[i].DevilLinkAppListAppName,
                        ID : data.d.results[i].DevilLinkAppListAppID,
                        url : data.d.results[i].DevilLinkAppListAppUrl? data.d.results[i].DevilLinkAppListAppUrl.Url : '',
                        link : data.d.results[i].DevilLinkAppListLinkUrl ? data.d.results[i].DevilLinkAppListLinkUrl.Url : '',
                        icon : data.d.results[i].DevilLinkAppListIconClass,
                        loaded: false,
                        sharePointID : data.d.results[i].ID,
                        minHeight: data.d.results[i].DevilLinkAppListminHeight,
                        minWidth: data.d.results[i].DevilLinkAppListminWidth,
                        prop : "NOTLOADED"
                    }
                    if(data.d.results[i].DevilLinkAppListAppUrl){
                       isLink = false; 
                    }else{
                        isLink = true;
                    }
                }
                var x = 0;
                var y = 0;
                var h = 0;
                for(var i = 0; i < currentConfig.length; i++){
                    if(currentConfig[i].x >= x ){
                        x = currentConfig[i].x;
                        if(currentConfig[i].y >= y){
                            y = currentConfig[i].y;
                        }
                    }
                    
                }
                //deploy to both webportal store and plugin store. 
                //need to create the portal object needed for the configuration. 
                var appConfig = Immutable.Map();
                var position = Immutable.Map();
                var MapPos = position.merge({
                    "x" : x,
                    "y" : y + 1,
                    "w" : 300,
                    "h" : 3
                });
                var mapAppConfig = appConfig.merge(
                    {
                    "AppID" : appID,
                    "position" : MapPos,
                    "Type" : isLink ? "LINK" : "APP"
                });
                var appConfig = 
                Dispatcher.dispatch({
                                type: WebPortalActionTypes.ADDEDAPPTOPORTAL,
                                config : mapAppConfig,
                                plugin : pluginObjects
                            });
        });
    },
    loadPortal(){
        var getCurrentUser = $.ajax({
            url: "https://asuep.sharepoint.com/sites/DeviLink/_api/Web/CurrentUser?$select=Id,Title",
            method : "GET",
            headers: { "Accept": "application/json;odata=verbose" }
        });
        getCurrentUser.done(function(data){
            var userID = data.d.Id;
            var username = data.d.Title;
            //query other list.
            var filterstring = "?$filter=UserUserConfigField eq " + userID;
            var promise = $.ajax({
                url: "https://asuep.sharepoint.com/sites/DeviLink/_api/web/lists/GetByTitle('UserConfiguration')/items" + filterstring,
                method : "GET",
                headers: { "Accept": "application/json;odata=verbose" }
            });
            promise.done(function(data){
                debugger;
                var configuration = JSON.parse(data.d.results[0].ConfigUserConfigField);
                //iterate our configuration and get the app ids and then load them? 
                var query = [];
                debugger;
                for(var i = 0; i < configuration.apps.length; i++){
                    if(configuration.apps[i].AppID){
                        if(!PluginStore.getState().has(configuration.apps[i].AppID)){
                            query.push("DevilLinkAppListAppID eq '" + configuration.apps[i].AppID + "' ");
                        }
                    }
                }
                if(query.length > 0){
                    var filterstring = query.join(' or ');
                    var getData = $.ajax({
                        url : "https://asuep.sharepoint.com/sites/DeviLink/_api/web/lists/GetByTitle('DevilLinkAppList')/items?$filter=" + filterstring,
                        method: "GET",
                        headers: { "Accept": "application/json;odata=verbose" }            
                    });
                    getData.done(function(data){
                        //build plugin objects
                        var pluginObjects = {};
                        debugger;
                        var scripts = []
                        for(var i = 0; i < data.d.results.length; i++){
                            pluginObjects[data.d.results[i].DevilLinkAppListAppID] ={
                                name : data.d.results[i].DevilLinkAppListAppName,
                                ID : data.d.results[i].DevilLinkAppListAppID,
                                url : data.d.results[i].DevilLinkAppListAppUrl ? data.d.results[i].DevilLinkAppListAppUrl.Url : '',
                                link : data.d.results[i].DevilLinkAppListLinkUrl ? data.d.results[i].DevilLinkAppListLinkUrl.Url : '',
                                icon : data.d.results[i].DevilLinkAppListIconClass,
                                loaded: false,
                                sharePointID : data.d.results[i].ID,
                                minHeight: data.d.results[i].DevilLinkAppListminHeight,
                                minWidth: data.d.results[i].DevilLinkAppListminWidth,
                                prop : "NOTLOADED"
                            }
                        }
                         Dispatcher.dispatch({
                                    type: WebPortalActionTypes.PORTALLOADED,
                                    config : configuration,
                                    plugin : pluginObjects
                                });
                    });
                }else{
                    Dispatcher.dispatch({
                    type: WebPortalActionTypes.PORTALLOADED,
                    config : configuration
                });
                }
                
            });
        });
    },
    
    save(userConfig){
         var getCurrentUser = $.ajax({
            url: "https://asuep.sharepoint.com/sites/DeviLink/_api/Web/CurrentUser?$select=Id,Title",
            method : "GET",
            headers: { "Accept": "application/json;odata=verbose" }
        });
        getCurrentUser.done(function(data){
            var userID = data.d.Id;
            var username = data.d.Title;
            var listItem = $.ajax({
                url: "https://asuep.sharepoint.com/sites/DeviLink/_api/lists/GetByTitle('UserConfiguration')/items?$filter=UserUserConfigField eq " + userID,
                method: "GET",
                headers : { "Accept": "application/json;odata=verbose" }
            });
            listItem.done(function(data){

                var itemId = data.d.results[0].Id;
                var formdigest = $.ajax({
                    url: "https://asuep.sharepoint.com/sites/DeviLink/_api/contextinfo",
                    method : "POST",
                    headers: { "Accept": "application/json;odata=verbose" }
                });
                
                formdigest.done(function(data){
                    var digest = data.d.GetContextWebInformation.FormDigestValue;
                    debugger;
                    var userConfigJS = userConfig.toJS();
                    var promise = $.ajax({
                        url: "https://asuep.sharepoint.com/sites/DeviLink/_api/lists/GetByTitle('UserConfiguration')/items(" + itemId + ")",
                        headers: { "Accept": "application/json;odata=verbose",
                            "X-RequestDigest" : digest,
                            "IF-MATCH" : "*",
                            "X-HTTP-Method" : "MERGE",
                            'content-type' : "application/json;odata=verbose",
                            },
                        method : "POST",
                        data: JSON.stringify({
                           ConfigUserConfigField: JSON.stringify(userConfigJS),
                           '__metadata'  : {'type' : 'SP.Data.UserConfigurationListItem'}
                        })
                    });
                   
                    promise.done(function(data){
                        Dispatcher.dispatch({
                            type : WebPortalActionTypes.STATICPORTAL
                        });
                    });
                });
            });
        });
    }
}

export default API;
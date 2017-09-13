import {ReduceStore} from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher.js';
import Immutable from 'immutable';
import WebPortalActionTypes from '../actions/WebPortalActionTypes.js';
import PluginActionTypes from '../actions/PluginActionTypes.js';
import Actions from '../actions/WebPortalActions.js';
import API from '../api/WebPortalApi.js';
class WebPortalStore extends ReduceStore{
    constructor(){
        super(Dispatcher);
    }

    getInitialState(){
        const init = Immutable.Map();
        const set = init.merge({
            portal : Immutable.List(),
            portalTemp:  Immutable.List(),
            loading : true,
            static: true
                });
        return set;
    }

    reduce(state,action){
        var updateApps;
        var updatePortal;
        switch(action.type){
            case WebPortalActionTypes.PORTALLOADED :
                debugger;
                return state.merge({loading : false, portal : action.config, portalTemp : action.config});
                break;
            case WebPortalActionTypes.LOADPORTAL:
                return state.merge({loading : true});
                break;
            case WebPortalActionTypes.REARRANGEPORTAL :
                debugger;
                
                return state.merge({static: false});
                break;
            case WebPortalActionTypes.STATICPORTAL:
                debugger;
                return state.merge({static: true});
                break;
            case WebPortalActionTypes.UPDATEPORTAL:
                return state.merge({
                    portal : action.config, portalTemp: action.config
                });
                break;
            case WebPortalActionTypes.SAVEPORTAL:
                API.save(state.get('portal'));
                return state;
                break;
                //attempt to solve why i cant use objects here.
            case "PINTODASHBOARD":
                Actions.pinToDashBoard(action.appID, state.get('portal'));
                return state;
                break;
            case WebPortalActionTypes.ADDEDAPPTOPORTAL: 
                updateApps = state.get('portal').get('apps').push(action.config);
                updatePortal = state.get('portal').merge({"apps" : updateApps});
                return state.merge({
                    portal: updatePortal,
                    portalTemp : updatePortal
                });
                break;
            case WebPortalActionTypes.REMOVECARD : 
                var removeCard = state.get('portal').merge({"apps" : action.portal});
                return state.merge({
                    portal : removeCard,
                    portalTemp : removeCard
                });
            break;
            default: 
                return state;
                break;
        }
    }
}

export default new WebPortalStore();
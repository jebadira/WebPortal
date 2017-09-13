import {ReduceStore} from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher.js';
import Immutable from 'immutable';
import PluginActionTypes from '../actions/PluginActionTypes.js';
import WebPortalActionTypes from '../actions/WebPortalActionTypes.js';
class PluginStore extends ReduceStore{
    constructor(){
        super(Dispatcher);
    }

    getInitialState(){
        const init = Immutable.Map();

        return init;
    }

    reduce(state,action){
        switch(action.type){
            case PluginActionTypes.PLUGINLOADED:
                debugger;
                return state.merge(action.plugin);
                break;
            case PluginActionTypes.PROPLOADED:
                return state.merge(action.plugin);
            break;
            case WebPortalActionTypes.PORTALLOADED : 
                if(action.plugin){
                    return state.merge(action.plugin);
                }else{
                    return state;
                }
                break;
            case WebPortalActionTypes.ADDEDAPPTOPORTAL:
                if(action.plugin){
                    
                    return state.merge(action.plugin);
                }else{
                    return state;
                }
            case "TEST" :
                debugger;
                return state;
                break;
            default :
                return state;
                break;   
        }

    }

}

export default new PluginStore();
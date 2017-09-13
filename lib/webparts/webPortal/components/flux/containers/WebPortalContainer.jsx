'use strict';
import React from 'react';
import Utils from 'flux/utils';
import PluginStore from '../stores/PluginStore.jsx';
import WebPortal from '../../WebPortal.jsx';
import WebPortalActions from '../actions/WebPortalActions.js';
import WebPortalStore from '../stores/WebPortalStore.jsx';
import AppTypes from '../../AppTypes.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ASUTheme from '../../../styles/ASUTheme.js';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
var injectTapEventPlugin = require('react-tap-event-plugin');


class WebPortalContainer extends React.Component{
    static getStores(){
        return [PluginStore , WebPortalStore];
    }

    static calculateState(prevState, props){
        
        return {
            actions : {
                loadPortal : WebPortalActions.loadPortal,
                rearrangePortal: WebPortalActions.rearrangePortal,
                staticPortal : WebPortalActions.staticPortal,
                updatePortalLayout : WebPortalActions.updatePortalLayout,
                removeCard : WebPortalActions.removeCard
            },
            cards : WebPortalStore.getState().get('portal'),
            portalLayout: WebPortalStore.getState().get('portalTemp'),
            portalLoading : WebPortalStore.getState().get('loading'),
            static : WebPortalStore.getState().get('static'),
        }
    }

    render(){

        return (
        
        <MuiThemeProvider muiTheme={getMuiTheme(ASUTheme)}>
            <WebPortal 
        actions={this.state.actions}
        cards={this.state.cards}
        portalLoading={this.state.portalLoading}
        isStatic={this.state.static} 
        portalLayout={this.state.portalLayout}  
        />
        </MuiThemeProvider>
        );
    }
}

export default Utils.Container.create(WebPortalContainer);
injectTapEventPlugin();

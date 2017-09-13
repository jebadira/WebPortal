import React from 'react';
import PluginActions from './flux/actions/PluginActions.js';
import {Spinner, SpinnerSize} from 'office-ui-fabric-react/lib/Spinner';
export default class Plugin extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps){
        debugger;
        if(this.props.plugin.get("ID") !== nextProps.plugin.get("ID") || !nextProps.plugin.get('loaded')){
            PluginActions.loadPlugin(nextProps.plugin);
        }
    }
    componentDidMount(){
        if(!this.props.plugin.get('loaded')){
            PluginActions.loadPlugin(this.props.plugin);
        }
    }
    render(){

            
            return(
                <div className="plugin">
                {this.props.plugin.get('loaded') ? 
                    this.props.plugin.get('prop') !== "NOTLOADED" ?
                    window[this.props.plugin.get('ID')] ? 
                    
                    React.createElement(window[this.props.plugin.get('ID')].default, this.props.plugin.get('prop') ? this.props.plugin.get('prop').toJS() : null)
                  
                  : <Spinner size={SpinnerSize.small} label='Loading Web Part...' />
                  :
                  <Spinner size={SpinnerSize.small} label='Loading Web Part...' />
                  :
                  <Spinner size={SpinnerSize.small} label='Loading Web Part...' />
                
                }
                </div>
            )
   
    }
}
import * as React from 'react';
import CardCollection from './CardCollection.jsx';
import AppTypes from './AppTypes.js';
import {Spinner, SpinnerSize} from 'office-ui-fabric-react/lib/Spinner';
import FlatButton from 'material-ui/FlatButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import {css} from 'office-ui-fabric-react';
const styles = require('./less/webportal.less');
export default class WebPortal extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
      this.props.actions.loadPortal();
      this.rearrangePortal = this.rearrangePortal.bind(this);
      this.staticPortal = this.staticPortal.bind(this);
  }
  staticPortal(e){
    e.preventDefault();
    this.props.actions.staticPortal();
  }
  rearrangePortal(e){
    e.preventDefault();
    this.props.actions.rearrangePortal();
  }
  render() {
    /* <RaisedButton primary={true} label="Rearrange" labelPosition="before" icon={<ModeEditIcon />}
                          onClick={this.props.actions.rearrangePortal} />
                          : <RaisedButton secondary={true} icon={<SaveIcon  />} onClick={this.props.actions.staticPortal}/>*/
    return (
      
          <div>

            {this.props.portalLoading ? 
              <Spinner size={SpinnerSize.large}
                  label="Portal Loading..." /> : 
                  <div>
                      <div className={css(styles.editPortal)}>{this.props.isStatic ?
                    <FlatButton primary={true} label="Rearrange" labelPosition="before" icon={<ModeEditIcon />}
                          onClick={this.rearrangePortal} /> 
                          : 
                      <FlatButton secondary={true} icon={<SaveIcon  />} onClick={this.staticPortal}/>
                        }</div>

              <CardCollection 
                portalLayout={this.props.portalLayout} 
                actions={this.props.actions}
                isStatic={this.props.isStatic} 
                cards={this.props.cards} />
              </div>
            }
           
          </div>
         
    );
  }
}
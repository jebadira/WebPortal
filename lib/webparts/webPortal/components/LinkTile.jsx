import React from 'react';
import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import IconWrapper from './IconWrapper.jsx';
import FontIcon from 'material-ui/FontIcon';
const FA = require('font-awesome/less/font-awesome.less');
const styles = require('./less/webportal.less');
import { css } from 'office-ui-fabric-react';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
export default class LinkTile extends React.PureComponent{

    constructor(props){
        super(props);
        this.RemoveCard = this.RemoveCard.bind(this);
    }
    RemoveCard(){
        this.props.actions.removeCard(this.props.plugin);
    }
    render(){
        var fontclassName= [];
        fontclassName.push(FA.fa);
        fontclassName.push(FA[this.props.icon]);
        fontclassName.push(FA['fa-fw']);
        if(this.props.isStatic){
            return (<div className={css(styles.LinkCard)}>
                        <a href={this.props.plugin.get('link')} target="_blank" className={css(styles.LinkLink)}>
                            <div className={css(styles.iconContainer)}>
                                <i className={css(styles.LinkIcon, FA.fa, FA[this.props.icon], FA["fa-fw"])}></i>
                                <div className={css(styles.iconTitle)}>{this.props.title}</div>
                            </div>
                        </a>
                   
                </div>);
        }else{
            return (<div className={css(styles.LinkCard)}>
                        <div className={css(styles.LinkLink)}>
                            <div className={css(styles.iconContainer)}>
                                {this.props.isDraggable ? <IconButton className={css(styles.LinkClose)} onClick={this.RemoveCard}><NavigationClose  /></IconButton>: null}
                                <i className={css(styles.LinkIcon, FA.fa, FA[this.props.icon], FA["fa-fw"])}></i>
                                <div className={css(styles.iconTitle)}>{this.props.title}</div>
                            </div>
                        </div>    
                   
                </div>);
        }
        
    }
}
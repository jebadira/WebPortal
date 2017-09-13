import React from 'react';
import {Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import IconWrapper from './IconWrapper.jsx';
import { css } from 'office-ui-fabric-react';
const styles = require('./less/webportal.less');
var ReactFitText = require("react-fittext");
import Plugin from './Plugin.jsx';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
export default class CardWrapper extends React.Component{
    constructor(props){
        super(props);
        this.RemoveCard = this.RemoveCard.bind(this);
    }
    RemoveCard(){
        this.props.actions.removeCard(this.props.plugin);
    }
    
    render(){
        //"ms-u-sm12", "ms-u-md4", "ms-u-lg4",
        return(<div className={css(styles.Card)}>
            <Card className={css(styles.materialCard)}>
                <CardHeader 
                title={<ReactFitText><h3 className={css(styles.CardTitle)}>{this.props.title}</h3></ReactFitText>}
                avatar={<IconWrapper icon={this.props.icon}/>}
                style={{"padding": 0}}
                textStyle={{}}
                titleStyle={{"paddingLeft": 5, }}
                >{this.props.isDraggable ? <IconButton className={css(styles.CardClose)} onClick={this.RemoveCard}><NavigationClose  /></IconButton>: null} </CardHeader>
                <CardText>
                    <Plugin plugin={this.props.plugin}/>
                </CardText>
            </Card>
        </div>);
    }

}

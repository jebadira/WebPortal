import React from 'react';
import { css } from 'office-ui-fabric-react';
const styles = require('./less/webportal.less');

export default class CardRowHolder extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        return (
            <div className={css("ms-Grid-row", styles.CardRow)}>
                {this.props.cards}
            </div>
        )
    }
}
import React from 'react';
import { css } from 'office-ui-fabric-react';
const styles = require('./less/webportal.less');
const FA = require('font-awesome/less/font-awesome.less');
export default class IconWrapper extends React.PureComponent{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <span className={css(styles.CardIcon)}>
                <i className={css(styles.Icon, FA.fa, FA[this.props.icon], FA["fa-fw"])}>
                </i>
                </span>
        )
    }

}
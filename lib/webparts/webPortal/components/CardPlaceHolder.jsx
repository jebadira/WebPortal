import React from 'react';
const styles = require('./less/webportal.less');
import { css } from 'office-ui-fabric-react';
export default class CardPlaceHolder extends React.PureComponent{
    
    render(){
            //"ms-u-sm12", "ms-u-md4", "ms-u-lg4",

        return(
        <div className={css(styles.CardPlaceHolder)}>
            <div className={css(styles.CardPlaceHolderBackground)}>
            </div>
        </div>);
    }

}
import React from 'react';
import CardWrapper from './CardWrapper.jsx';
import CardPlaceHolder from './CardPlaceHolder.jsx';
const styles = require('./less/webportal.less');
import AppTypes from './AppTypes.js';
import { css } from 'office-ui-fabric-react';
import PluginStore from './flux/stores/PluginStore.jsx';
import CardRowHolder from './CardRowHolder.jsx';
import {Responsive, WidthProvider} from 'react-grid-layout';
import LinkTile from './LinkTile.jsx';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
export default class CardCollection extends React.Component{
    constructor(props){
        super(props);
        this.state={
            layouts : {}
        }
    }
    render(){
        var cards = [];
        var layouts ={lg : [], md: [], sm:[]};
        var j = 0;
        var row = 0;
        const rowHeight = 5;
        for(var i = 0; i < this.props.cards.get('apps').count(); i ++){
           
            if(this.props.cards.get('apps').get(i).get("Type") === AppTypes.EMPTY){
                cards.push(<div key={i}>
                                <CardPlaceHolder data-grid={{
                        minW: plugin.get("minWidth"),
                        minH: plugin.get("minHeight"),
                        x: parseInt(this.props.cards.get('apps').get(i).get("position").get("x")),
                        y: parseInt(this.props.cards.get('apps').get(i).get("position").get("y")),
                        w: parseInt(plugin.get('minWidth')),
                        h: parseInt(plugin.get('minHeight')),
                    }} />
                            </div>);
            }
            else if (this.props.cards.get('apps').get(i).get("Type") === AppTypes.LINK){
                     var plugin = PluginStore.getState().get(this.props.cards.get('apps').get(i).get("AppID"));
                    cards.push(<div key={this.props.cards.get('apps').get(i).get('AppID')} 
                        data-grid={{
                            minW: plugin.get("minWidth"),
                            minH: plugin.get("minHeight"),
                            x: parseInt(this.props.cards.get('apps').get(i).get("position").get("x")),
                            y: parseInt(this.props.cards.get('apps').get(i).get("position").get("y")),
                            w: parseInt(plugin.get('minWidth')),
                            h: parseInt(plugin.get('minHeight')),
                        }}>
    <LinkTile isStatic={this.props.isStatic} isDraggable={!this.props.isStatic} actions={this.props.actions} plugin={plugin} icon={plugin.get('icon')} title={plugin.get('name')} text={""}  />
                                </div>);
            }
            else{
                var plugin = PluginStore.getState().get(this.props.cards.get('apps').get(i).get("AppID"));
                if(plugin.get("minHeight") != "1" || plugin.get("minHeight") > 1){
                        
                }
                cards.push(<div key={this.props.cards.get('apps').get(i).get('AppID')} 
                    data-grid={{
                        minW: plugin.get("minWidth"),
                        minH: plugin.get("minHeight"),
                        x: parseInt(this.props.cards.get('apps').get(i).get("position").get("x")),
                        y: parseInt(this.props.cards.get('apps').get(i).get("position").get("y")),
                        w: parseInt(plugin.get('minWidth')),
                        h: parseInt(plugin.get('minHeight')),
                    }}>
                                <CardWrapper isDraggable={!this.props.isStatic} actions={this.props.actions} plugin={plugin} icon={plugin.get('icon')} title={plugin.get('name')} text={""}  />
                            </div>);
            }
        }

        return (
            <div className={css (styles.CardCollection , "ms-Grid")}>
                <ResponsiveReactGridLayout
                    breakpoints={{lg: 1200, md:996, sm:768}}
                    autoSize={true}
                    verticalCompact={false}
                    margin={[10,10]}
                    containerPadding={[5,5]}
                    useCSSTransforms={true}
                    rowHeight={150}
                    cols={{lg:4, md:2, sm:1}}
                    layouts={this.props.portalLayout}
                    isDraggable={!this.props.isStatic}
                    onLayoutChange={this.props.actions.updatePortalLayout}
                    isResizable={false}
                    >
                    {cards}

                </ResponsiveReactGridLayout>
                
            </div>
        )
    }

}
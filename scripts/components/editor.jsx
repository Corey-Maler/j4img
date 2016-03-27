import React, {Component} from 'react';
import Panel from './panel.jsx';
import ActionPanel from './ActionPanel.jsx';
import EffectsPanel from './EffectsPanel.jsx';

import getFilterCss, {defaultPresets} from '../libs/filters.js';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const css = require('../styles/editor.css');
const aCss = require('../styles/animations.css');

export default class Editor extends Component {
  
  constructor(props, context) {
    super(props, context);
    
    this.state = {
        smallSize: false,
        editMode: false,
        subpanel: null
    }
  } 
  
  
  openEdit() {
    this.setState({smallSize: true, editMode: true});
  }
  
  save() {
    this.setState({smallSize: false, editMode: false}); 
  }
  
  editSize() {
      const changeVal = (val) => {
          this.refs.container.style.transform = `scale(${val})`;
      };
      
      const save = () => {
          this.setState({subpanel: null});
      }
      
      const subpanelData = {
        label: "scale",
        min: 0.5,
        max: 2,
        save,
        changeVal: changeVal.bind(this), 
      };
      
      const subpanel = <ActionPanel key="3434" data={subpanelData} />;
      this.setState({subpanel});
  }
  
  editEffects() {
      const subpanelData = {
          presets: defaultPresets,
          applyEffect: ({preset}) => {

              const filter = getFilterCss(preset);
              
              console.log(filter);
              this.refs.container
                .setAttribute('style', filter);  
          }
      }
      
      const subpanel = <EffectsPanel key="aa" data={subpanelData} />;
      
      this.setState({subpanel});
  }
    
  render() {
   
    const canvaClass = css.canva + (this.state.smallSize ? " " + css.canva_small : "");  
    
    const p = this.state.subpanel ? 
       this.state.subpanel
       :
       <Panel key="asdd"
         editSize={this.editSize.bind(this)}
         editEffects={this.editEffects.bind(this)}
         /> 
    
    const panel = this.state.editMode ?
      p
      :
      <div key="asdf" className={css.edit_label} onClick={this.openEdit.bind(this)}>Edit</div>;
      
    const saveButton = this.state.editMode ? 
      <div className={css.save_button} onClick={this.save.bind(this)}>Done</div>
      :
      null;
    
    return (
      <div className={css.editor}>
        {saveButton}
        <div className={canvaClass} ref="canva">
          <img ref="container" src={this.props.img} />
        </div>
        <ReactCSSTransitionGroup 
         transitionName={{
            enter: aCss.enter_fade,
            enterActive: aCss.enter_fade_active,
            leave: aCss.leave_fade,
            leaveActive: aCss.leave_fade_active,
         }}
         transitionEnterTimeout={300} transitionLeaveTimeout={200}>
          {panel}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
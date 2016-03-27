import React, {Component} from 'react';

const css = require('../styles/effects.css');


export default class EffectPanel extends Component {
  
  constructor(props, context) {
    super(props, context);
    
    this.state = {imgLoaded: false}
  } 
  
  applyEffect(preset) {
      this.props.data.applyEffect(preset);
  }
   
  render() {
    return (
      <div className={css.panel}>
        {
            this.props.data.presets.map((preset, ind) => {
                return (
                    <div 
                      className={css.item}
                      key={ind + ".filters"}
                      onClick={this.applyEffect.bind(this, preset)}
                      >{preset.name}</div>
                )
            })
        }
      </div>
    );
  }
}
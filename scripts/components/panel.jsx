import React, {Component} from 'react';

const css = require('../styles/panel.css');


export default class Panel extends Component {
  
  constructor(props, context) {
    super(props, context);
    
    this.state = {imgLoaded: false}
  } 
   
  render() {
    return (
      <div className={css.panel}>
        <div className={css.button + " " + css.cropBtn} onClick={this.props.editSize}>
           <label>Crop</label>
        </div>
        
        <div className={css.button + " " + css.effectBtn}>
          <label>Effects</label>
        </div>
        
        <div className={css.button}>
          dont know
        </div>
      </div>
    );
  }
}
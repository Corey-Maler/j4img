import React, {Component} from 'react';
import Slider from './slider.jsx';

const css = require('../styles/panel.css');


export default class ActionPanel extends Component {
  
  constructor(props, context) {
    super(props, context);
    
    this.state = {val: this.props.data.def,
      isChanging: false,    
    };
  } 
  
  onChange(val) {
      this.setState({val: val.toPrecision(3)});
      this.props.data.changeVal(val);
  }
  
  changeState(isChanging) {
      this.setState({isChanging});
  }
   
  render() {
    const valClassName = css.value + 
      (this.state.isChanging ? " " + css.value_active : "");
    
    const labelClassName = css.label + 
      (this.state.isChanging ? " " + css.label_active : "");  
    
    const saveClassName = css.button + " " + css.saveBtn;
    
    return (
      <div className={css.panel}>
        <div className={valClassName}>
          {this.state.val}
        </div>
        <div className={labelClassName}>
          {this.props.data.label}
        </div>
        <div className={css.button}>
           cancel
        </div>
        
        <Slider
          min={this.props.data.min}
          max={this.props.data.max}
          def={this.props.data.def}
          changeState={this.changeState.bind(this)}
          onChange={this.onChange.bind(this)}/>
        
        <div className={saveClassName} onClick={this.props.data.save}>
        </div>
      </div>
    );
  }
}
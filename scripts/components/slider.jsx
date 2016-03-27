import React, {Component} from 'react';

const css = require('../styles/slide.css');

export default class Slider extends Component {
  
  constructor(props, context) {
    super(props, context);
    
    this.state = {imgLoaded: false}
    this.isMove = false;
    this.oldX = 0;
    this.val = 0;
    this.pos = 0;
  }
  
  componentDidMount() {
    this.width = this.refs.area.offsetWidth;  
  }
  
  startDrag(e) {
      e.preventDefault();
      this.isMove = true;
      this.oldX = e.clientX;
      //this.refs.point.style.left = "50px";
      if (this.props.changeState) {
          this.props.changeState(true);
      }
  } 
  
  dragging(e) {
    e.preventDefault();
    if (this.isMove) {
      const x = e.clientX;
      const delta = this.oldX - x;
      this.oldX = x;
      this.pos -= delta;
      
      this.val = this.pos / this.width;
      
      this.real = this.props.min + (this.props.max - this.props.min) * this.val;

      if (this.val > 0 && this.val < 1) {
        this.refs.point.style.left = this.pos + "px";

        if (this.props.onChange) {
            this.props.onChange(this.real);
        }
      }
    }
  }
  
  stopDrag(e) {
    e.preventDefault();
    this.isMove = false;    
    if (this.props.changeState) {
      this.props.changeState(false);
    }
  }   
  
  render() {
    return (
      <div className={css.slider} 
        onMouseMove={this.dragging.bind(this)}
        onMouseUp={this.stopDrag.bind(this)}
        ref="area"
      >
        <div className={css.line}></div>
        <div
          onMouseDown={this.startDrag.bind(this)}
          className={css.circle}
          ref="point"></div>
      </div>
    );
  }
}
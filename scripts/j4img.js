import React, {Component} from 'react';

import DragLoader from './components/loader.jsx';

const css = require('./styles/style.css');

console.log(css);

export default class J4img extends Component {
  
  constructor(props, context) {
    super(props, context);
    
    this.state = {imgLoaded: false}
  } 
  
  onLoad(file) {
      this.img = file.preview;
      
      this.setState({imgLoaded: true});
  }
    
  render() {
      
    const activeComponent = this.state.imgLoaded ? 
      <img src={this.img} />
      :
      <DragLoader onLoad={this.onLoad.bind(this)}/>
      
      
    return (
      <div className={css.root}>
        {activeComponent}
      </div>
    );
  }
}
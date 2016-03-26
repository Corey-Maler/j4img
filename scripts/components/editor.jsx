import React, {Component} from 'react';

const css = require('../styles/editor.css');


export default class Editor extends Component {
  
  constructor(props, context) {
    super(props, context);
    
    this.state = {
        smallSize: false,
        editMode: false
    }
  } 
  
  
  openEdit() {
    this.setState({smallSize: true, editMode: true});
  }
  
  save() {
    this.setState({smallSize: false, editMode: false}); 
  }
    
  render() {
   
    const canvaClass = css.canva + (this.state.smallSize ? " " + css.canva_small : "");  
    
    const panel = this.state.editMode ?
      null
      :
      <div className={css.edit_label} onClick={this.openEdit.bind(this)}>Edit</div>;
      
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
        {panel}
      </div>
    );
  }
}
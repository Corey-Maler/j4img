import React, {Component} from 'react';
import Panel from './panel.jsx';
import ActionPanel from './ActionPanel.jsx';

const css = require('../styles/editor.css');


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
      
      const subpanel = {
        label: "scale",
        min: 0.5,
        max: 2,
        save,
        changeVal: changeVal.bind(this), 
      };
      this.setState({subpanel});
  }
    
  render() {
   
    const canvaClass = css.canva + (this.state.smallSize ? " " + css.canva_small : "");  
    
    const p = this.state.subpanel ? 
       <ActionPanel data={this.state.subpanel} />
       :
       <Panel editSize={this.editSize.bind(this)} /> 
    
    const panel = this.state.editMode ?
      p
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
import React, {Component} from 'react';

const css = require('../styles/style.css');

// for more please see https://github.com/okonet/react-dropzone/blob/master/src/index.js

export default class DragLoader extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.onClick = this.onClick.bind(this);
    
    this.state = {dragged: false}
  } 
   
  onClick() {
    this.refs.fileInput.click();
  }
  
  onDragEnter(e) {
    e.preventDefault();

   
    // This is tricky. During the drag even the dataTransfer.files is null
    // But Chrome implements some drag store, which is accesible via dataTransfer.items
    //const dataTransferItems = e.dataTransfer && e.dataTransfer.items ? e.dataTransfer.items : [];

    // Now we need to convert the DataTransferList to Array
    //const allFilesAccepted = this.allFilesAccepted(Array.prototype.slice.call(dataTransferItems));

    this.setState({dragged: true});

    /*
    this.setState({
      isDragActive: allFilesAccepted,
      isDragReject: !allFilesAccepted
    });
    */

    /* events next time...
    if (this.props.onDragEnter) {
      this.props.onDragEnter.call(this, e);
    }
    */
  }
  
  onDragLeave(e) {
    e.preventDefault();
    this.setState({dragged: false});
  }

    
  render() {
      
    const text = !this.state.dragged ? 
        <div className={css.welcome_cover}>
          <h1 className={css.welcome_title}>Drag and drop your image</h1>
          <h2 className={css.welcome_subtitle}>or just click here</h2>
        </div>
        :
        <div className={css.welcome_cover}>
          <h1 className={css.welcome_title}>Drop file</h1>
        </div>
      
    return (
      <div className={css.welcome}
        onClick={this.onClick.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
        >
         <input type="file" className={css.welcome_input} ref="fileInput" />
         {text}
      </div>
    );
  }
}
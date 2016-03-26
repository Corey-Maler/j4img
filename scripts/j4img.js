import React, {Component} from 'react';

import DragLoader from './components/loader.jsx';

const css = require('./styles/style.css');

console.log(css);

export default class J4img extends Component {
  render() {
    return (
      // Add your component markup and other subcomponent references here.
      <div className={css.root}>
        <DragLoader />
      </div>
    );
  }
}
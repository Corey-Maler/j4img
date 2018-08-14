import * as React from 'react';
import { Action } from '../types';


interface BaseOverlayProps {
	onBack: Action;
	onResize: Action;
}

export class Base extends React.Component<BaseOverlayProps>{

	public render() {
		return <div>
			<button onClick={this.props.onBack}>cancel</button>
			<button onClick={this.props.onResize}>Resize / rotate</button>
		</div>
	}
}
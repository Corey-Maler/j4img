import * as React from 'react';


export default class Wrapper extends React.Component {
	public render() {
		return <div>adasd
			{this.props.children}
		</div>
	}
}
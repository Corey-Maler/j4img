import * as React from 'react';
import styled from 'react-emotion';
import { Action } from '../types';

const Root = styled('div')`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, .3);

	opacity: .3;

	transition: opacity .2s ease;
	&:hover {
		opacity: 1;
	}
`;

const NavBar = styled('div')`
	position: absolute;
	bottom: 0;

	background: rgba(0, 0, 0, .3);
	padding: 8px;
	width: 100%;
	box-sizing: border-box;
`;

interface FullOverlayProps {
	onCancel: Action;
}

export class FullOverlay extends React.Component<FullOverlayProps> {
	public render() {
		return <Root>
			{this.props.children}
			<NavBar>
				<button>apply</button>
				<button onClick={this.props.onCancel}>cancel</button>
			</NavBar>
		</Root>
	}
}
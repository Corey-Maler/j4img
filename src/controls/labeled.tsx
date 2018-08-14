import * as React from 'react';
import styled from 'react-emotion';

const Root = styled('div')`

`;

const Title = styled('div')`
	color: #fff;
	font-size: 12p;
`;

const Control = styled('div')`
	margin: 5px 0 10px;
`;

interface LabeledProps {
	title: string;
}

export class Labeled extends React.Component<LabeledProps> {
	public render() {
		return (<Root>
			<Title>{this.props.title}</Title>
			<Control>{this.props.children}</Control>
		</Root>);
	}
}
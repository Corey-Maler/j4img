import * as React from 'react';
import { ImagePlacement } from './types';

import styled from "react-emotion";

const Root = styled('div')`
	width: 100%;

  img {
    width: 100%;
    transform-origin: left;
    transition: transform .2s ease;

    ${(props: any) => props.ip === 'left' ? 
    `
      transform: scale(.7);
    `:
    `

    `}
  }
` as any;


interface RendererProps {
  ip: ImagePlacement;
  changes: any;
}

export class Renderer extends React.Component<RendererProps> {
	public render() {
		return (<Root ip={this.props.ip}>
      <img src="https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275" />
    </Root>);
	}
}
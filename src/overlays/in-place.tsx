import * as React from 'react';
import styled from "react-emotion";


const Overlay = styled("div")`
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;

  transition: opacity .3s ease;

  opacity: 0;
  &:hover {
    opacity: 1;
  }
` as any;

const Change = styled("button")`
  position: absolute;
  border: none;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.7);
  padding: 3px 6px;
  outline: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  font-size: 24px;
  font-weight: 100;
  pointer-events: none;
` as any;

interface InPlaceProps {
	onClick: () => void;
}

export class InPlace extends React.Component<InPlaceProps> {
	public render() {
		return (
			<Overlay onClick={this.props.onClick}>
				<Change>Edit image</Change>
			</Overlay>
		);
	}
}
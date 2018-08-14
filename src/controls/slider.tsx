import * as React from 'react';
import styled from 'react-emotion';

const handleWidth = 10;
const handleMargin = 3;

const Root = styled('div')`
	position: relative;
	width: 300px;
	height: 20px;
`;

const Bar = styled('div')`
	position: absolute;
	height: 3px;
	border-radius: 3px;
	background: rgba(255, 255, 255, .1);
	bottom: 3px;
	${(props: any) => `
		left: ${props.left}px;
		width: ${props.width}px;
	`}	
` as any;

const Handle = styled('div')`
	position: absolute;
	height: ${handleWidth}px;
	width: ${handleWidth}px;
	bottom: 0;
	border-radius: 100%;
	background: rgba(255, 255, 255, .6);
	cursor: pointer;
	left: ${(props: any) => props.left}px;
` as any;

const Value = styled('div')`
  position: absolute;
  bottom: 10px;
  color: #fff;
  font-size: 12px;
  width: 40px;
  text-align: center;

  left: ${(props: any) => props.left}px;
` as any;

const MinMax = styled('div')`
  position: absolute;
  bottom: 10px;
  color: #fff;
  font-size: 10px;
  ${(props: any) => props.min ? `left: 0` : `right: 0`};
  opacity: ${(props: any) => props.opacity};
` as any;

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  onSubmit: () => void;
}

export class Slider extends React.Component<SliderProps> {
  private oldX: number = 0;

  constructor(props: any) {
    super(props);
  }

  private onMouseDown = (e: React.MouseEvent) => {
    document.addEventListener('mousemove', this.onMouseMove);

    document.addEventListener('mouseup', this.onMouseUp);

    console.log(e.clientX);
    this.oldX = e.clientX;
  }

  private onMouseMove = (e: MouseEvent) => {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;

    const newX = e.clientX;
    const change = newX - this.oldX;

    const minValue = 0;
    const maxValue = 300;
    const width = 300;

    const position = this.position * width;

    const newPosition = position + change;

    if (newPosition > minValue && newPosition < maxValue) {

      this.props.onChange(this.valueFromPos(newPosition));

      this.oldX = e.clientX;
    }
  }

  private valueFromPos(v: number) {
    const width = 300;
    const { min, max } = this.props;
    return (v / width) * (max - min) + min;
  }

  private onMouseUp = (e: MouseEvent) => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.props.onSubmit();
  }

  private get position(): number {
    const { value, min, max } = this.props;
    return (value - min) / (max - min);
  }

  public render() {
    //const { position } = this.state;
    const { value, min, max } = this.props;
    const pos = this.position;
    const width = 300;
    const position = pos * width;
    const rightBarP = position + handleWidth / 2 + handleMargin;
    const minOpacity = Math.max(0, Math.min(1, (position - 10) / 40));
    const maxOpacity = Math.max(0, Math.min(1, (width - position - 10) / 40));
    return (<Root>
      <Bar left={0} width={position - handleWidth / 2 - handleMargin} />
      <Bar left={rightBarP} width={width - rightBarP} />
      <Handle onMouseDown={this.onMouseDown} left={position - handleWidth / 2} />
      <Value left={position - 20}>{value.toFixed(2)}</Value>
      <MinMax min opacity={minOpacity}>{min.toFixed(0)}</MinMax>
      <MinMax opacity={maxOpacity}>{max.toFixed(0)}</MinMax>
    </Root>)
  }
}
import * as React from "react";
import { Slider } from "../controls/slider";
import { Labeled } from "../controls/labeled";

interface ResizeOverlayProps {
  changes: any;
  onChange: (changes: any) => void;
}

export class ResizeOverlay extends React.Component<ResizeOverlayProps> {
  constructor(props: any) {
    super(props);
  }

  private setScale = (scale) => {
    this.props.onChange({...this.props.changes, scale})
  }

  private onSubmit = () => {
    console.log('submit');
  }

  public render() {
    return (
      <div style={{ marginLeft: 550, marginTop: 20 }}>
        <Labeled title="Offset x">
          <Slider onSubmit={this.onSubmit} min={-1} max={1} value={this.props.changes.scale} onChange={this.setScale} />
        </Labeled>
        <Labeled title="Offset y">
          <Slider onSubmit={this.onSubmit} min={-1} max={1} value={this.props.changes.scale} onChange={this.setScale} />
        </Labeled>
        <Labeled title="Scale">
          <Slider onSubmit={this.onSubmit} min={-1} max={1} value={this.props.changes.scale} onChange={this.setScale} />
        </Labeled>
        <Labeled title="Rotate">
          <Slider onSubmit={this.onSubmit} min={-1} max={1} value={this.props.changes.scale} onChange={this.setScale} />
        </Labeled>
 
      </div>
    );
  }
}

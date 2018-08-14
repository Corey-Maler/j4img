import * as React from "react";
import { Slider } from "../controls/slider";

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
      <div style={{ textAlign: "center", margin: 20 }}>
        <Slider onSubmit={this.onSubmit} min={-1} max={1} value={this.props.changes.scale} onChange={this.setScale} />
      </div>
    );
  }
}

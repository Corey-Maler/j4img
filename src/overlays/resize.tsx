import * as React from "react";
import { Slider } from "../controls/slider";
import { Labeled } from "../controls/labeled";
import { Changes } from "../types";
import { nor } from "../tools";

interface ResizeOverlayProps {
  changes: Changes;
  onChange: (changes: Changes) => void;
}

export class ResizeOverlay extends React.Component<ResizeOverlayProps> {
  constructor(props: any) {
    super(props);
  }

  private setScale = (scale) => {
    this.props.onChange({...this.props.changes,
      resize: {
        ...this.props.changes.resize,
        scale,
      }
    })
  }

  private setOffsetX = (x: number) => {
    this.props.onChange({...this.props.changes, resize: {
      ...this.props.changes.resize,
      offset: {
        ...this.props.changes.resize.offset,
        x,
      }
    }})
  }

  private setOffsetY = (y: number) => {
    this.props.onChange({...this.props.changes, resize: {
      ...this.props.changes.resize,
      offset: {
        ...this.props.changes.resize.offset,
        y,
      }
    }})
  }

  private setRotation = (rotation: number) => {
    this.props.onChange({
      ...this.props.changes,
      resize: {
        ...this.props.changes.resize,
        rotation,
      },
    });
  }

  private moveLeft = () => {
    const shift = 0.05;

    const v = {...this.props.changes.resize.offset};
    const res = this.props.changes.resize.rotation / 360 * (2 * Math.PI);

    v.x = nor(v.x + shift * Math.cos(res));
    v.y = nor(v.y + shift * Math.sin(res));

    this.props.onChange({
      ...this.props.changes,
      resize: {
        ...this.props.changes.resize,
        offset: v,
      }
    })
  }

  private onSubmit = () => {
    console.log('submit');
  }

  public render() {
    const { scale: ss, offset, rotation } = this.props.changes.resize;
    const scale = ss as number;

    return (
      <div style={{ marginLeft: 550, marginTop: 20 }}>
        <Labeled title="Offset x">
          <Slider onSubmit={this.onSubmit} min={0} max={1} value={offset.x} onChange={this.setOffsetX} />
        </Labeled>
        <Labeled title="Offset y">
          <Slider onSubmit={this.onSubmit} min={0} max={1} value={offset.y} onChange={this.setOffsetY} />
        </Labeled>
        <Labeled title="scale">
          <Slider onSubmit={this.onSubmit} min={1} max={4} value={scale as number} onChange={this.setScale} />
        </Labeled>
         <Labeled title="Rotate">
          <Slider onSubmit={this.onSubmit} min={0} max={360} value={rotation} onChange={this.setRotation} />
        </Labeled>
        <button onClick={this.moveLeft}>left</button>
        <button>down</button>
      </div>
    );
  }
}
 
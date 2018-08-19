import * as React from "react";
import { Slider } from "../controls/slider";
import { Labeled } from "../controls/labeled";
import { Changes, Vec2 } from "../types";
import { nor } from "../tools";
import { MoveIt } from "./moveit";

interface ResizeOverlayProps {
  changes: Changes;
  onChange: (changes: Changes) => void;
}

export class ResizeOverlay extends React.Component<ResizeOverlayProps> {
  constructor(props: any) {
    super(props);
  }

  private setScale = scale => {
    this.props.onChange({
      ...this.props.changes,
      resize: {
        ...this.props.changes.resize,
        scale
      }
    });
  };

  private setOffsetX = (x: number) => {
    this.props.onChange({
      ...this.props.changes,
      resize: {
        ...this.props.changes.resize,
        offset: {
          ...this.props.changes.resize.offset,
          x,
        },
      },
    });
  };

  private setOffsetY = (y: number) => {
    this.props.onChange({
      ...this.props.changes,
      resize: {
        ...this.props.changes.resize,
        offset: {
          ...this.props.changes.resize.offset,
          y
        }
      }
    });
  };

  private setRotation = (rotation: number) => {
    this.props.onChange({
      ...this.props.changes,
      resize: {
        ...this.props.changes.resize,
        rotation
      }
    });
  };

  private moveLeft = x => {
    const shift = x;

    const v = { ...this.props.changes.resize.offset };
    const res = (this.props.changes.resize.rotation / 360) * (2 * Math.PI);
    v.x = v.x + shift * Math.cos(res);
    v.y = v.y + shift * Math.sin(res);

    this.md(v);
  };

  private moveDown = y => {
    const shift = y;

    const v = { ...this.props.changes.resize.offset };
    const res = (this.props.changes.resize.rotation / 360) * (2 * Math.PI);
    v.x = v.x + shift * Math.sin(-res);
    v.y = v.y + shift * Math.cos(res);
    this.md(v);
  } 

  private md = (v: Vec2) => {
    v.x = nor(v.x);
    v.y = nor(v.y);

    this.props.onChange({
      ...this.props.changes,
      resize: {
        ...this.props.changes.resize,
        offset: v
      }
    });
  };

  private onMove = (x, y) => {
    const s = this.props.changes.resize.scale as number;
    this.moveLeft(x / (s - 0.99));
    this.moveDown(y / (s - 0.99));
  };

  private onSubmit = () => {
    console.log("submit");
  };

  public render() {
    const { scale: ss, offset, rotation } = this.props.changes.resize;
    const scale = ss as number;

    return (
      <div style={{ marginLeft: 550, marginTop: 20 }}>
        <Labeled title="Offset x">
          <Slider
            onSubmit={this.onSubmit}
            min={0}
            max={1}
            value={offset.x}
            onChange={this.setOffsetX}
          />
        </Labeled>
        <Labeled title="Offset y">
          <Slider
            onSubmit={this.onSubmit}
            min={0}
            max={1}
            value={offset.y}
            onChange={this.setOffsetY}
          />
        </Labeled>
        <Labeled title="scale">
          <Slider
            onSubmit={this.onSubmit}
            min={1}
            max={4}
            value={scale as number}
            onChange={this.setScale}
          />
        </Labeled>
        <Labeled title="Rotate">
          <Slider
            onSubmit={this.onSubmit}
            min={0}
            max={360}
            value={rotation}
            onChange={this.setRotation}
          />
        </Labeled>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 500
          }}
        >
          <MoveIt onMove={this.onMove} />
        </div>
        <button onClick={this.moveLeft}>left</button>
        <button>down</button>
      </div>
    );
  }
}

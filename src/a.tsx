import * as React from "react";

import "emotion";
import styled from "react-emotion";
import { Renderer } from "./renderer";
import { InPlace } from "./overlays/in-place";
import { ImagePlacement } from "./types";
import { Base } from "./overlays/base";
import { FullOverlay } from "./overlays/full";
import { ResizeOverlay } from "./overlays/resize";
import { WebGLRenderer } from "./renderers/webgl";

const Root = styled("div")`
  width: 100%;
  position: relative;
  background: #666;
` as any;

const OverlayRight = styled('div')`
  position: absolute;
  right: 0;
  top: calc(100% * 0.15);
`;

const H = styled('div')`
  font-size: 32px;
  color: #999;
`;

interface JS4ImgState {
  mode: 'inplace' | 'base' | 'resize' | 'advanced';
  changes: any;
}

export class A extends React.Component<{}, JS4ImgState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      mode: 'resize',//'inplace',
      changes: {
        scale: 1,
      },
    }
  }

  private enterBaseMode = () => {
    this.setState({
      mode: 'base',
    })
  }

  private onExit = () => {
    this.setState({
      mode: 'inplace',
    })
  }

  private onEnterResizeMode = () => {
    this.setState({
      mode: 'resize',
    });
  }

  private onCancel = () => {
    this.setState({
      mode: 'base',
    })
  }

  private onChange = (changes: any) => {
    this.setState({
      changes,
    });
  } 

  public render() {
    const { mode } = this.state;
    const imagePlacement: ImagePlacement = (mode === 'inplace' || mode === 'resize') ? 'full' : 'left';
    return (
      <Root>
        { /* <Renderer ip={imagePlacement} changes={this.state.changes} /> */ }
        <WebGLRenderer state={this.state.changes} />
        { mode === 'inplace' &&
          <InPlace onClick={this.enterBaseMode} />
        }
        {
          mode === 'base' &&
          <OverlayRight>
            <H>Edit image</H>
            <Base onBack={this.onExit} onResize={this.onEnterResizeMode}/>
          </OverlayRight>
        }
        {
          mode === 'resize' &&
          <FullOverlay onCancel={this.onCancel}>
            <ResizeOverlay changes={this.state.changes} onChange={this.onChange} />
          </FullOverlay>
        }
      </Root>
    );
  }
}
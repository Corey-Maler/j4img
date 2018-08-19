/* https://webglfundamentals.org/webgl/lessons/webgl-image-processing.html was used as Referrence */

import * as React from "react";
import {
  createProgram,
  requestCORSIfNotSameOrigin,
  resizeCanvasToDisplaySize
} from "./utils";

import TestImage from '../../test.jpg';
import { Changes, ResizeObject } from "../../types";

const loadImage = (): Promise<HTMLImageElement> => {
  const promise = new Promise<HTMLImageElement>((res, rej) => {
    const image = new Image();
    /*
    requestCORSIfNotSameOrigin(
      image,
      //"https://webglfundamentals.org/webgl/resources/leaves.jpg"
      "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",
    );
    */
    image.src = TestImage;
    image.onload = function() {
      res(image);
    };
  });

  return promise;
};

function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = Math.min(x + width, 500);
  var y1 = y;
  var y2 = Math.min(y + height, 500);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
    gl.STATIC_DRAW
  );
}

interface WebGLRendererProps {
  state: Changes;
}

export class WebGLRenderer extends React.Component<WebGLRendererProps> {
  private canvas: HTMLCanvasElement | null = null;
  private gl: WebGLRenderingContext | undefined;

  private program: any;
  private brLocation: any;
  private offsetLocation: any;
  private scaleLocation: any;
  private scale: number = 0;
  private positionLocation: any;
  private rotationLocation: any;
  private positionBuffer: any;
  private resolutionLocation: any;
  private texcoordLocation: any;
  private texcoordBuffer: any;

  private resize: ResizeObject;

  public componentDidMount() {
    this.resize = this.props.state.resize;
    this.process(loadImage());
  }

  private async process(_image: Promise<HTMLImageElement>) {
    const image = await _image;
    if (this.canvas === null) {
      return;
    }

    const gl = this.canvas.getContext("webgl");
    if (!gl) {
      return;
    }

    this.gl = gl;

    const program = createProgram(gl);
    this.program = program;

    this.positionLocation = gl.getAttribLocation(program, "a_position");
    this.texcoordLocation = gl.getAttribLocation(program, "a_texCoord");

    // Create a buffer to put three 2d clip space points in
    this.positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    // Set a rectangle the same size as the image.
    setRectangle(gl, 0, 0, image.width, image.height);

    console.log("image width", image.width, image.height);

    // provide texture coordinates for the rectangle.
    this.texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        0.0,
        0.0,
        1.0,
        0.0,
        0.0,
        1.0,
        0.0,
        1.0,
        1.0,
        0.0,
        1.0,
        1.0
      ]),
      gl.STATIC_DRAW
    );

    // Create a texture.
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set the parameters so we can render any size image.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    // Upload the image into the texture.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    this.brLocation = gl.getUniformLocation(program, "brightness");
    this.offsetLocation = gl.getUniformLocation(program, 'offset');
    this.scaleLocation = gl.getUniformLocation(program, 'scale');
    this.rotationLocation = gl.getUniformLocation(program, 'rotation');

    
    // lookup uniforms
    this.resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    this.redraw();
  }

  private redraw() {
    const gl = this.gl;
    const program = this.program;
    if (!gl) {
      return;
    }
    resizeCanvasToDisplaySize(gl.canvas);
    
    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    
    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);
    gl.uniform1f(this.brLocation, this.props.state.color.brightness);
    gl.uniform2f(this.offsetLocation, this.resize.offset.x, this.resize.offset.y);
    gl.uniform1f(this.scaleLocation, this.resize.scale as number);
    gl.uniform1f(this.rotationLocation, this.resize.rotation / 360 * 2 * Math.PI);

    // Turn on the position attribute
    gl.enableVertexAttribArray(this.positionLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2; // 2 components per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(
      this.positionLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    // Turn on the teccord attribute
    gl.enableVertexAttribArray(this.texcoordLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);

    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2; // 2 components per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(
      this.texcoordLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    // set the resolution
    gl.uniform2f(this.resolutionLocation, gl.canvas.width, gl.canvas.height);

    // Draw the rectangle.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType, offset, count);
  }

  componentWillReceiveProps(nextProps: WebGLRendererProps) {
    const scale = nextProps.state.resize.scale as number;
    this.scale = scale;
    this.resize = nextProps.state.resize;
    this.redraw();
  }

  public render() {
    return (
      <canvas ref={node => (this.canvas = node)} width={500} height={500} />
    );
  }
}

import fs from './shaders/a.fs';
import vs from './shaders/a.vs';

function loadShader(gl: WebGLRenderingContext, shaderSource: string, shaderType: number) {
  const shader = gl.createShader(shaderType);

  gl.shaderSource(shader, shaderSource);

  gl.compileShader(shader);

  const isCompiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!isCompiled) {
    // TODO: make WebGl renderer specific errors
    const lastError = gl.getShaderInfoLog(shader);
    throw new Error('Error compiling shader: ' + lastError);
  }

  return shader;
}

export function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = loadShader(gl, vs, gl.VERTEX_SHADER);
  const fragmentShader = loadShader(gl, fs, gl.FRAGMENT_SHADER);


  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (!linked) {
    const lastError = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error('Error in progam linking: ' + lastError );
  }

  return program;
}

/*

	//return createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback);
}
*/

export function requestCORSIfNotSameOrigin(img, url) {
  if ((new URL(url)).origin !== window.location.origin) {
    img.crossOrigin = "";
  }
}

export function resizeCanvasToDisplaySize(canvas, multiplier: number = 1) {
    var width  = canvas.clientWidth  * multiplier | 0;
    var height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width ||  canvas.height !== height) {
      canvas.width  = width;
      canvas.height = height;
      return true;
    }
    return false;
  }
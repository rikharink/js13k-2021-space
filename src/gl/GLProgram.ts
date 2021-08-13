//ADAPTED FROM: https://github.com/englercj/gl-tiled/
// The MIT License

// Copyright (c) 2017-2020 Chad Engler

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { Settings } from '../settings';
import { IDictionary } from '../types';
import { hasOwnKey } from '../util/util';
import { GL_CONSTANTS } from './gl-constants';

export class GLProgram {
  program: WebGLProgram;
  attributes: IDictionary<number> = {};
  uniforms: IDictionary<WebGLUniformLocation> = {};

  constructor(
    gl: WebGL2RenderingContext,
    vertexShader: string,
    fragmentShader: string,
    attributeLocations?: IDictionary<number>,
  ) {
    this.program = GLProgram.compileProgram(
      gl,
      vertexShader,
      fragmentShader,
      attributeLocations,
    );
    const aCount = gl.getProgramParameter(
      this.program,
      GL_CONSTANTS.ACTIVE_ATTRIBUTES,
    );
    for (let i = 0; i < aCount; ++i) {
      const attrib = gl.getActiveAttrib(this.program, i);

      if (attrib) {
        this.attributes[attrib.name] = gl.getAttribLocation(
          this.program,
          attrib.name,
        );
      }
    }

    // build a list of uniform locations
    const uCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uCount; ++i) {
      const uniform = gl.getActiveUniform(this.program, i);

      if (uniform) {
        const name = uniform.name.replace('[0]', '');
        const loc = gl.getUniformLocation(this.program, name);

        if (loc) {
          this.uniforms[name] = loc;
        }
      }
    }
  }

  static compileProgram(
    gl: WebGL2RenderingContext,
    vertexShader: string,
    fragmentShader: string,
    attributeLocations?: IDictionary<number>,
  ): WebGLProgram {
    const vs = GLProgram.compileShader(
      gl,
      GL_CONSTANTS.VERTEX_SHADER,
      vertexShader,
    );
    const fs = GLProgram.compileShader(
      gl,
      GL_CONSTANTS.FRAGMENT_SHADER,
      fragmentShader,
    );
    const program = gl.createProgram()!;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    if (attributeLocations) {
      for (const k in attributeLocations) {
        if (!hasOwnKey(attributeLocations, k)) continue;
        const location = attributeLocations[k];
        if (location) {
          gl.bindAttribLocation(program, location, k);
        }
      }
    }

    if (Settings.debug && !gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const errLog = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      const msg = `Could not link shader program. Log:\n${errLog}`;
      console.error(msg);
      throw new Error(msg);
    }

    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return program;
  }

  static compileShader(
    gl: WebGL2RenderingContext,
    type: number,
    source: string,
  ): WebGLShader {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (Settings.debug && !gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const errLog = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Failed to compile shader. Log:\n${errLog}`);
    }
    return shader;
  }
}

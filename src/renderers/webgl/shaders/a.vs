attribute vec2 a_position;
attribute vec2 a_texCoord;

uniform vec2 u_resolution;
uniform vec2 offset;
uniform float scale;
uniform float rotation;

varying vec2 v_texCoord;

void main() {
   // convert the rectangle from pixels to 0.0 to 1.0
   vec2 zeroToOne = a_position / u_resolution;

   // convert from 0->1 to 0->2
   vec2 zeroToTwo = zeroToOne * 2.0;

   // convert from 0->2 to -1->+1 (clipspace)
   vec2 clipSpace = zeroToTwo - 1.0;

   gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

   // pass the texCoord to the fragment shader
   // The GPU will interpolate this value between points.
   vec2 v_texCoord_temp = (1.0 - 1.0 / scale) * offset + a_texCoord / scale;
   mat2 rot;
   float t = rotation;
   rot[0] = vec2(cos(t), -sin(t));
   rot[1] = vec2(sin(t), cos(t));
   vec2 of = (1.0 - 1.0 / scale) * offset + (1.0  / scale) / 2.0;
   v_texCoord = (v_texCoord_temp - of) * rot + of;
}
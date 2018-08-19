precision mediump float;
uniform float brightness;
// our texture
uniform sampler2D u_image;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

void main() {
   //gl_FragColor = texture2D(u_image, v_texCoord);
   if (v_texCoord.x < 0.0 || v_texCoord.x > 1.0 || v_texCoord.y < 0.0 || v_texCoord.y > 1.0) {
	   gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
   } else {
   vec3 color = texture2D(u_image, v_texCoord).rgb;
	vec3 colorContrasted = (color) * 1.0;
	vec3 bright = colorContrasted + vec3(brightness,brightness,brightness);
	gl_FragColor.rgb = bright;
	gl_FragColor.a = 1.;
   }
}
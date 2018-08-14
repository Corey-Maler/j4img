precision mediump float;

// our texture
uniform sampler2D u_image;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

void main() {
   //gl_FragColor = texture2D(u_image, v_texCoord);
   vec3 color = texture2D(u_image, v_texCoord).rgb;
	vec3 colorContrasted = (color) * 0.1;
    float brightness = 0.6;
	vec3 bright = colorContrasted + vec3(brightness,brightness,brightness);
	gl_FragColor.rgb = bright;
	gl_FragColor.a = 1.;
}
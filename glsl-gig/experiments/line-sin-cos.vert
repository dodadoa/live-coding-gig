/*{
  "pixelRatio": 1,
  "vertexCount": 5000,
  "vertexMode": "LINES",
  "audio": true
}*/

precision mediump float;

uniform float time;
attribute float vertexId;
uniform vec2 resolution;
varying vec4 v_color;
uniform sampler2D samples;
uniform sampler2D spectrums;
uniform sampler2D gamepad;

vec3 posFunctionMover(float t, float i) {
	return vec3(
		cos(t* 3.0 + i * .5) * cos(t * 1.0 + 2.3 * i),
		cos(t* 1.3 + i * 0.5) * sin(t * 2.5 + 1.3 * i),
		cos(t* 3.0 + i * .5) * sin(t * 2.2 + i * 0.4)
	);
}

vec3 posFunction(float t, float i) {
  return posFunctionMover(t*.3, i) + posFunctionMover(t, 1.0);
}

void main() {
  float fps = time * .6;
  float i = vertexId * 10.;

  vec3 ofs = vec3(0.0);
  vec4 _samples = texture2D(samples, vec2(1.0));
	vec4 _spectrums = texture2D(spectrums, vec2(1.0));
	vec3 pos = posFunction(fps, i * _samples.x);
	ofs = abs(fract(pos));
	pos =  vec3(_spectrums) * pos;
	// pos.xy *= -1.0 / pos.z;
	pos.z =  1.0 / pos.z;

  gl_Position = vec4(pos, 1.0);
  gl_PointSize = pos.z * 30.0;

  v_color = vec4(
		ofs,
		1.0
	);
}

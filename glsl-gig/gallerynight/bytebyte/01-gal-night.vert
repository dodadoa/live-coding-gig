/*{
  "pixelRatio": 1,
  "vertexCount": 1000,
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
uniform sampler2D osc_sc_id1;

vec3 posFunctionMover(float t, float i) {
	return vec3(
		cos(t* 3.0 + i * .5) * cos(t * 1.0 + 2.3 * i),
		cos(t* 1.3 + i * 0.5) * sin(t * 2.5 + 1.3 * i),
		cos(t* 3.0 + i * .5) * sin(t * 2.2 + i * 0.4) * tan(t * 3.0 + i)
	);
}

vec3 posFunction(float t, float i) {
  return posFunctionMover(t*.3, i) + posFunctionMover(t, 1.0);
}

void main() {
  float fps = time * .6;  float i = vertexId * 100.;

  vec3 ofs = vec3(0.0);
  vec4 _samples = texture2D(samples, vec2(1.0));
	vec4 _spectrums = texture2D(spectrums, vec2(1.0));
	vec3 pos = posFunction(fps, i * _samples.x);
	vec4 _dur = texture2D(osc_sc_id1, pos.xy);

	ofs = abs(fract(pos));
	pos = vec3(_spectrums) * pos;
	pos.xy *= 1. / pos.z;
	pos.z = 50.0 / pos.x;

  gl_Position = vec4(pos, 5.0);
  gl_PointSize = pos.z * 1.0;

  v_color = vec4(
		ofs,
		1.0
	);
}

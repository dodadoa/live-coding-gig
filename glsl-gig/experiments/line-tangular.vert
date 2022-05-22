/*{
  "pixelRatio": 1,
  "vertexCount": 5000,
  "vertexMode": "LINES",
  "audio": true,
	"gamepad": true
}*/

#define PI radians(180.0)

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
      cos(t * 3.0 + i * .5),
      cos(t * 2.0 + i * .5),
      cos(t * 1.0 + i * .5)
	);
}

vec3 posFunction(float t, float i) {
  return posFunctionMover(t*.3, i * 0.3) + posFunctionMover(t, 1.0);
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle), -sin(_angle),
                sin(_angle), cos(_angle));
}

vec3 push(float t, float i, vec3 ofs, float lerpEnd) {
  vec3 pos = posFunction(t, i) + ofs;
  vec3 posf = fract(pos + 0.1) - 0.5;
  float len = length(posf) * 0.1;
  return (-posf + posf / len) * (1.5 - step(lerpEnd, 1.5));
}

void main() {
	// FPS
	float fps = time * 0.5;
	float i = sin(vertexId) + cos(vertexId) * 20.;
  vec3 pos = posFunction(fps, i);
  vec3 ofs = vec3(0.0);

	vec4 _ss = texture2D(samples, pos.xy);
	vec4 _sp = texture2D(spectrums, pos.xy);

	// ofs = pos;
	for(float ii = 1.0; ii < 100.0; ii++) {
		ofs = ofs + push(fps * 60.0, ii, ofs, 100.0);
	}

	pos.xyz = vec3(_sp * PI);
	pos.xy = mat2(0.2, _ss.y, -0.6, 0.3) * pos.xz;
	pos.yz = mat2(.1, -.6, -0.2, cos(_ss.x)) * pos.yz ;
 //zooming function
  pos.xy *= -50.0 / pos.z;

	vec2 posXY = rotate2d(time * _ss.x * PI) * vec2(pos.x, pos.y);
  gl_Position = vec4(posXY, pos.z, 100.0);
  gl_PointSize = 100.0 * pos.z;

  v_color = vec4(
		ofs,
		1.0
	);
}

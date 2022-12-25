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

vec3 posf2(float t, float i) {
	return vec3(
      cos(t* 3.0 + i * .5)
      + cos(t* 2.0 + i * .5),
      cos(t* 1.3 + i * 0.5)
      + cos(t* 1.2 + i * 0.5),
      cos(t* 1.0 + i * .5)
			+ cos(t + i)
			+ cos(t * 2.0 + i * 35.0)
	)*.2;
}

vec3 posf0(float t) {
  return posf2(t, 1.0);
}

vec3 posf(float t, float i) {
  return posf2(t*.3, i * 0.3) + posf0(t);
}

vec3 push(float t, float i, vec3 ofs, float lerpEnd) {
  vec3 pos = posf(t,i)+ofs;

  vec3 posf = fract(pos + 0.1) - 0.5;

  float l = length(posf) * 0.3;
  return (- posf + posf/l)*(1.5 - smoothstep(lerpEnd,1.5, l));
}

mat2 rotate2(float _angle){
    return mat2(cos(_angle), -sin(_angle),
                sin(_angle), cos(_angle));
}

mat2 scale2(vec2 _scale){
    return mat2(_scale.x, 0.0,
                0.0, _scale.y);
}

void main() {
  float fps = time * .5;
  float i = sin(vertexId) + cos(vertexId) * 20.;
  vec3 pos = posf(fps, i);
  vec3 ofs = vec3(0.0);
  vec4 _ss = texture2D(samples, vec2(0.0));
	vec4 _sss = texture2D(samples, vec2(pos.x, pos.y));
	vec4 _sp = texture2D(spectrums, vec2(0.0));

  for (float f = -300.; f < 0.; f++) {
	  ofs += push(f * fps * 0.1, _sss.r, ofs, _sss.y);
  }
	ofs += push(fps, i, ofs, .0);

	pos = pos/vec3(_sp);
  pos += posf0(fps);
  pos.yz *= scale2(vec2(cos(time)));
  pos.xz *= mat2(.1,.6,.3, cos(time));
  pos.xy *=1.0/(pos.z);

  gl_Position = vec4(pos.x, pos.y, pos.z, 2. / _ss.r);
  gl_PointSize = 2.0;

  v_color = vec4(
		max(length(ofs), 100.0)/ofs,
		1.0
	);
}

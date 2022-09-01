/*{
  "audio": true,
  "midi": true
}*/

precision mediump float;

uniform vec2 resolution;
uniform float time;
uniform sampler2D samples;
uniform sampler2D spectrums;
uniform sampler2D backbuffer;

uniform sampler2D midi;

mat2 rotate2(float _angle){
    return mat2(cos(_angle), -sin(_angle),
                sin(_angle), cos(_angle));
}

mat2 scale2(vec2 _scale){
    return mat2(_scale.x, 0.0,
                0.0, _scale.y);
}

mat3 scale3(vec3 _scale){
    return mat3(_scale.x, 0.0, 0.0,
                0.0, _scale.y, 0.0,
                0.0, 0.0, _scale.z);
}

float sdSphere( vec3 p, float s )
{

  float scene = 0.0;
  p = abs(p) - 0.5;
  p = abs(p) - 0.3;
  for (float i = 0.0; i < 30.0; i ++) {
    p.xy = rotate2(time * 3.14) * p.xz;
  }
  scene = length(p.xyz) - 0.1;
  return scene;
}

float map(vec3 p) {
  float scene = 0.0;
  scene += sdSphere(p, 1.0);
  return scene;
}

float mic(float i, float j){
 return texture2D(samples, vec2(i,j)).r;
}

void main() {
  float mi7a = texture2D(midi, vec2(176. / 256., 7. / 128.)).x;
  float mi38a = texture2D(midi, vec2(176. / 256., 10. / 128.)).x;
  float mi114a = texture2D(midi, vec2(176. / 256., 114. / 128.)).x;

  vec2 st = gl_FragCoord.xy / resolution - 0.5;
  st *= 10. * mic(1.0, cos(time));
	float l = 3.0 * mic(time, time);
	vec3 col = vec3(l, 0.5, 0.3);
	float f = 0.0;
	for(float i = 0.0; i < 50.0; i++)
	{
		float s = sin(time + i) * mic(i, i * 1.5) + smoothstep(col.x, col.y, col.z);
		float c = cos(cos(time + i)) * mic(i * i, i * 3.0);
		f += 0.0025 * length(st * vec2(c * 3.0 * mic(i, i), s / 10.0)) * mic(i, i * 3.0);
	}

  for(float i = 0.0; i < 50.0; i++)
	{
    float s = sin(time + i * 30.0);
		float c = tan(cos(time + i));

		f += f * 0.0005 / length(st * vec2(c * s *  mic(i, i), s / 10.0));
    f += (.0001 * mi7a) / length(st * vec2(atan(sin(time)) * c * fract(mic(i, i)), s / 10.0));
	}

  vec3 pos = vec3(0, 0, -3.0);
  vec3 ray = normalize(vec3(st, 1.0));
  float shade = 0.0;
  const float  count = 30.0;
  for (float i = count; i > 0.0; i--) {
    float dist = map(pos);
    if (dist < 0.0001) {
      shade = i / count;
      break;
    }
    pos = pos + ray * dist ;
  }

  f += shade / 2. * mi7a;

	gl_FragColor = vec4(vec3(f / col) * 2.0 * mi38a, .4);
}

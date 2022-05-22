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

float rand(float n){return fract(sin(n) * 43758.5453123);}
float rand2(vec2 n) {
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}


float mic(float i, float j){
 return texture2D(samples, vec2(i,j)).r;
}

void main() {
  vec2 st = gl_FragCoord.xy / resolution;

  float mi7a = texture2D(midi, vec2(176. / 256., 7. / 128.)).x;
	float mi38a = texture2D(midi, vec2(176. / 256., 10. / 128.)).x;
	float mi114a = texture2D(midi, vec2(176. / 256., 114. / 128.)).x;
  st.x += 2.0;
  st *= 5. * mic(1.0, cos(time));
	float l = 3.0 * mic(time, 1.0);
	vec3 col = vec3(l, .2, .8);
	float f = 0.0;
	for(float i = 0.0; i < 50.0; i++)
	{
		float s = sin(time) * mic(i, i * 1.5);
		float c = cos(time + i) * mic(i * i, i * 3.0) + s * rand(2.0);
		f += 0.05 * length(st * vec2(mic(i, i), s)) * mic(i, c);
    f += 0.01 * abs(sin(time) + c);
    f *= smoothstep(f * mi7a, cos(st.x), sin(st.y));
  }

	gl_FragColor = vec4(vec3(col * 0.5 * f * mi38a), 1.0);
}

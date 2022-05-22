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

float mic(float i, float j){
 return texture2D(samples, vec2(i,j)).r;
}

void main() {
  vec2 st = cos(abs(time)) + tan(time) * sin(time) -  gl_FragCoord.xy / resolution;

	float l = 3.0 * mic(time, time);
  float m14 = texture2D(midi, vec2(177. / 256., 14. / 128.)).x * 127.0;
	vec3 col = vec3(l, 0.5, 0.3);
	float f = 0.0;

  st *= 100. * mic(1.0, cos(time));

  for(float i = 0.0; i < 300.0; i++)
	{
    float c = cos(sin(time + i)) * mic(i * i, i * 3.0);
		float s = sin(fract(time)) * i * mic(i, i * 1.5);
		f += 0.05 * length(st * vec2(c * mic(i, i), s / 10.0)) * mic(i, i * 3.0);
	}

  col.xy *= rotate2(cos(time)) * st.x * m14;
  col.xz *= rotate2(tan(time) * st.y * m14 * mic(time, time));
  col.xyz = col.xyz - (mic(col.x, st.x) * 10.0);
  col.xy *= st.x + mic(st.x, st.y) * l * mic(cos(time), sin(time));
  col.xy += st.x + mic(col.x, col.y) * l * mic(sin(st.x), sin(time));
  st.xy = st.xy * scale2(vec2(mic(fract(time) + cos(time), 1.0)));
  st.xy = st.xy * scale2(vec2(cos(time))) + sin(time);
  st.xy = st.xy + mic(st.x, st.y);
  col.xy *= col.yz * fract(cos(time * mic(st.x, st.y)));

	gl_FragColor = vec4(vec3(col + cos(time)), 1.3);
}

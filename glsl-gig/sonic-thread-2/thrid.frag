/*{
  "audio": true
}*/

precision mediump float;

uniform vec2 resolution;
uniform float time;
uniform sampler2D samples;
uniform sampler2D spectrums;
uniform sampler2D backbuffer;

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
  st *= 10. * mic(1.0, cos(time));
	float l = 3.0 * mic(time, time);
	vec3 col = vec3(l, 0.5, 0.3);
	float f = 0.0;

  // for(float i = 0.0; i < 300.0; i++)
	// {
  //   float c = cos(sin(time + i)) * mic(i * i, i * 3.0);
	// 	float s = sin(fract(time)) * i * mic(i, i * 1.5);
	// 	f += 0.05 * length(st * vec2(c * mic(i, i), s / 10.0)) * mic(i, i * 3.0);
	// }

  // col.xy *= rotate2(cos(time)) + st.x * st.y;
  // col.yz *= rotate2(sin(time)) + st.y * st.x;
  // col.xy *= rotate2(sin(time) * st.x * st.x);
  // col.xz *= rotate2(tan(time) * st.x * st.y * mic(time, time));
  // col.xyz = col.xyz - (mic(col.x, st.x) * 10.0);
  // col.xy *= st.x + mic(st.x, st.y) * l * mic(cos(time), sin(time));
  // col.xy += st.x + mic(col.x, col.y) * l * mic(sins(st.x), sin(time));
  // st.xy = st.xy * scale2(vec2(mic(fract(time) + cos(time), 1.0)));
  // st.xy = st.xy * scale2(vec2(sin(time * _ss.x)));
  // st.xy = st.xy * scale2(vec2(cos(time)));

	// gl_FragColor = vec4(vec3(col + sin(time)), 1.3);
}

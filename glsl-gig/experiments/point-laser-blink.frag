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
  vec2 st = gl_FragCoord.xy / resolution - 0.5;
  st *= 10.; //* mic(1.0, cos(time));
	float l = 3.0 * mic(time, time);
	vec3 col = vec3(l, 0.5, 0.3);
	float f = 0.0;
	for(float i = 0.0; i < 50.0; i++)
	{
		float s = sin(time + i) * mic(i, i * 1.5);
		float c = cos(cos(time + i)) * mic(i * i, i * 3.0);
		f += 0.0025 * length(st * vec2(c * 3.0 * mic(i, i), s / 10.0)) * mic(i, i * 3.0);
	}

  for(float i = 0.0; i < 50.0; i++)
	{
    float s = sin(time + i * 30.0);
		float c = tan(cos(time + i));

		f += f * 0.0005 / length(st * vec2(c * s *  mic(i, i), s / 10.0));
	}

	gl_FragColor = vec4(vec3(f / col), .4);
}

/*{
  "pixelRatio": 1,
  "vertexCount": 5000,
  "vertexMode": "LINES",
  "audio": true
}*/


precision mediump float;

uniform vec2 resolution;
uniform float time;
uniform sampler2D spectrums;
uniform sampler2D samples;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle), -sin(_angle),
                sin(_angle), cos(_angle));
}

float map (vec3 p) {
  float scene = 0.0;
  p = abs(p) - 0.5;
  p = abs(p) - 0.3;
  for (float i = 0.0; i < 30.0; i ++) {
    p.xy = rotate2d(time * 3.14) * p.xz;
  }
  scene = length(p.xyz) - 0.1;
  return scene;
}

void main() {
  vec2 uv = 2.*(gl_FragCoord.xy - 0.5 * resolution.xy)/resolution.y;
  vec3 pos = vec3(0, 0, -3.0);
  vec3 ray = normalize(vec3(uv, 1.0));
  vec4 _sp = texture2D(spectrums, vec2(1.0));
  vec4 _ss = texture2D(samples, vec2(1.0));
  float shade = 0.0;
  const float  count = 50.0;
  for (float i = count; i > 0.0; i--) {
    float dist = map(pos * _ss.x);
    if (dist < 0.001) {
      shade = i / count;
      break;
    }
    pos = pos + ray * dist;
  }
  gl_FragColor = vec4(shade);
}

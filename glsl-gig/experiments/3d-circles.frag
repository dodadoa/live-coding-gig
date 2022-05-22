

precision mediump float;

uniform float time;
uniform vec2 resolution;

float sdSphere( vec3 p, float s )
{
  return length(p)-s;
}

float map(vec3 p) {
  float scene = 0.0;
  scene += sdSphere(p, 1.0);
  return scene;
}

void main() {
  vec2 uv = 2.0 * (gl_FragCoord.xy - 0.5 * resolution.xy)/resolution.y;
  vec3 pos = vec3(0, 0, -3.0);
  vec3 ray = normalize(vec3(uv, 1.0));
  float shade = 0.0;
  const float  count = 30.0;
  for (float i = count; i > 0.0; i--) {
    float dist = map(pos);
    if (dist < 0.0001) {
      shade = i / count;
      break;
    }
    pos = pos + ray * dist;
  }

  gl_FragColor = vec4(
    shade
  );
}

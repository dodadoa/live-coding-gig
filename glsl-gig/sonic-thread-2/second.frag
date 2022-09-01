precision mediump float;

uniform float time;
uniform sampler2D spectrums;
uniform sampler2D samples;
uniform vec2 resolution;

#define t time
#define PI2 (2.0*3.1416)
#define vol 0.1
mat2 rot2(float a) {return mat2(cos(a), -sin(a), sin(a), cos(a));}

float f(vec2 uv, float s) {
  return sin(uv.y + uv.x + s * t);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
  vec4 _samples = texture2D(samples, uv);
  vec4 _spectrums = texture2D(spectrums, uv);
  vec4 _ss = texture2D(samples, vec2(1.0));
  vec3 col;
  vec2 pv = uv;
  pv.x += 1.5 * sin(t * _ss.x);
  pv.y += 1.5 * cos(t * t * _ss.y);
  pv = vec2(length(pv), atan(pv.x,pv.x * _ss.y));
  uv.x += tan(uv.y * 2.5);
  uv *= mix(0.5, 2.0, 0.5 + 0.5 * fract(cos(t) * 30.0 * _ss.x));
  int m = int(mix(2.0, 10.0, 0.5 + 0.5 * (texture2D(samples, vec2(uv)).r * 10.0 * vol)));

  col.r = f(vec2(atan(uv.y * float(m)), uv.x - _ss.x), 1.0);
  col.r += f(vec2(fract(uv.x * 120.0), 5.0 * _ss.x + 5.0 * sin(t * _ss.x / 100.0)), 0.5);
  col.r += step(0.5 , fract(f(vec2(fract(pv.x * 120.0), 5.0 * pv.x + 5.0 * cos(t / 10.0)), 0.5)));
  col.r += step(3.0 , fract(f(vec2(fract(pv.x * 120.0), 5.0 * pv.x + 5.0 * cos(t / 10.0)), 0.5)));
  col.r += step(5.0 , fract(f(vec2(fract(pv.x * _ss.x * 100.0), 3.0 * pv.x * 5.0 * atan(t * t)), 0.3)));
  gl_FragColor = vec4(col - cos(fract(t) * _ss.x) * 0.3, .01);
}

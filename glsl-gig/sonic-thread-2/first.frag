precision mediump float;

uniform float time;
uniform sampler2D spectrums;
uniform sampler2D samples;
uniform vec2 resolution;

#define t time

float f(vec3 p) {
    p.z-= time*.5;
    return length(cos(p)-.1*cos(9.*(p.z+.1*p.x-p.y)+time*2.0))-(0.9+sin(time)*.1);
}

void main() {
  vec3 uv = 1.0 - vec3(gl_FragCoord.xy, 0.3) / resolution.y;
  vec4 ss = texture2D(samples, uv.xy);
  vec4 sp = texture2D(spectrums, uv.xy);
  vec4 _ss = texture2D(spectrums, vec2(1.0));
  vec4 _sp = texture2D(spectrums, vec2(1.0));
  uv.x = length(uv.x) * (_ss.x * _ss.y);
  uv.y += 0.3 * length(cos(fract(t)) * ss.y * fract(_ss.x) * _sp.x);
  vec3 o = uv * _ss.x;
  float l = length(uv.xyz * _ss.x) * float(cos(t)) + ss.y;
  float a = atan(uv.y, uv.x);
  o.xy*= mat2(sin(t+cos(a + t)) + 0.3, sin(.01 * atan(_ss.x) * length(t) * t * _ss.x + ss.x + _ss.y)*2.0, -tan(t*t + fract(a) + _ss.x),cos(sin(t) + uv.z+l)+10.0);
  float m = 0.0;
  for(int i=0; i<100; i++){
    m = texture2D(samples, vec2(ss.y + sp.x * float(i / 40))).r;
    o.y = length(o*uv) + m * m;
    o+=f(o+m)*(uv - m);
  }
  for (int i = 0; i < 70; i++) {
    o.x = atan(t * float(i));
  }
  gl_FragColor = vec4(sin(t + abs((o - uv)+length(o.xy * step(o.z, 500.0))))*.3+.7,1.0);
}

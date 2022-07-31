/*{
  "pixelRatio": 1,
  "vertexCount": 5000,
  "vertexMode": "LINES",
  "audio": true,
	"gamepad": true,
  "osc": 3333,
  "midi": true
}*/

precision mediump float;

uniform float time;
uniform sampler2D spectrums;
uniform sampler2D samples;
uniform sampler2D osc_oscMsg;      // OSC on /oscMsg
uniform vec2 resolution;

#define t time

float f(vec3 p) {
    p.z-= time*.5;
    return length(cos(p)-.1*cos(9.*(p.z+.1*p.x-p.y)+time*2.0))-(0.9+sin(time)*.1);
}

void main() {
  vec3 uv = 0.5 - vec3(gl_FragCoord.xy, 0.3) / resolution.y;
  vec4 ss = texture2D(samples, uv.xy);
  vec4 sp = texture2D(spectrums, uv.xy);
  vec4 _ss = texture2D(spectrums, vec2(1.0));
  vec4 _sp = texture2D(spectrums, vec2(1.0));
  vec4 _osc = texture2D(osc_oscMsg, vec2(1.0));

  uv.x = length(uv.x) + cos(_osc.x);
  vec3 o = uv * _ss.x * _ss.y * 10.0;
  float l = length(uv.xyz) * float(cos(t));
  float a = atan(uv.y, uv.x);
  float m = 0.0;
  for(int i=0; i<100; i++){
    m = texture2D(samples, vec2(float(i / 40))).r;
    o+=f(o*m)*(uv * m / _ss.x);
    uv.x *= m * _ss.y;
    uv.z *= m * fract(t) + _ss.x;
  }
  for (int i = 0; i < 70; i++) {
    o.x = atan(t * float(i));
    o.y *= length(sin(t));
  }
  gl_FragColor = vec4(sin(t - abs((o - uv)-length(o.xy * step(o.z, 100.0))))*.3+.7,1.0);
}

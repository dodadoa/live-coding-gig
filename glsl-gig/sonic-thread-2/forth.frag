/*{
  "audio": true,
  "gamepad": true
}*/
precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrums;
uniform sampler2D samples;
uniform sampler2D gamepad;

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size, _size + vec2(0.001),_st)
      * smoothstep(_size, _size + vec2(0.001), vec2(1.000)-_st);
    return uv.x  * uv.y;
}

void main() {
  vec2 st = gl_FragCoord.xy/resolution;
  float sm = 0.;
  vec3 _box = vec3(cos(time));
  vec4 _samples = texture2D(samples, st);
  vec4 _spectrums = texture2D(spectrums, st);

  sm += smoothstep(0.1, 0.5, st.x) - smoothstep(0.2, 0.8, st.x);
  sm += smoothstep(sin(0.1 + time), 0.5, st.y) - smoothstep(sin(time), 0.4, st.y);
  sm += smoothstep(0.1, cos(time), st.y) - smoothstep(0.2, 0.8, st.y);
  sm += smoothstep(0.1, 0.7, sin(st.x + time)) - smoothstep(0.2, 0.4, st.x);
  sm += smoothstep(cos(time), sin(time), abs(sin(st.x))) - smoothstep(0.3, 0.2, st.x);
  sm += distance(st, vec2(texture2D(spectrums, 1. - st).x, texture2D(spectrums, st).y));
  sm += smoothstep(texture2D(samples, 0.5 -  st).x, cos(1.0), sin(1.0));
  sm += smoothstep(texture2D(spectrums, 0.5 -  st).x, cos(1.0), sin(1.0));
  sm += smoothstep(texture2D(samples, st).x, cos(st.x + time), sin(st.y + time));
  sm += smoothstep(texture2D(samples, 0.5 - st).x, cos(st.x + time), cos(st.y + time));
  sm += step(texture2D(samples, st).y, sin(time + st.x * st.y));

  vec3 io_out = vec3(sin(sm + time), cos(sm + time), sin(sm + time) + cos(sm + time)) + _box;

  gl_FragColor = vec4(
    sin(sm + time),
    cos(sm + time),
    sin(sm + time) + cos(sm + time),
    1.0
  );

}

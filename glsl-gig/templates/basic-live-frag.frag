/*{
  "pixelRatio": 1,
  "vertexCount": 5000,
  "vertexMode": "LINES",
  "audio": true,
  "osc": true
}*/

precision mediump float;

uniform float time;
uniform sampler2D spectrums;
uniform sampler2D samples;
uniform vec2 resolution;

void main() {
  vec2 uv = gl_FragCoord.xy/resolution;

  gl_FragColor = vec4(
    uv.x,
    uv.y,
    1.0,
    1.0
  );
}

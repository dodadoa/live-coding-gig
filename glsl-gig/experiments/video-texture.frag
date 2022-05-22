/*
{
  "IMPORTED": {
    "video": {
      "PATH": "./videos/video.mp4",
      "SPEED": "2"
    },
  }
}
*/

precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D video;
uniform sampler2D backbuffer;
uniform sampler2D samples;
uniform sampler2D spectrums;

mat2 rotate2(float _angle){
    return mat2(cos(_angle), -sin(_angle),
                sin(_angle), cos(_angle));
}

void main() {

  vec2 uv = gl_FragCoord.xy / resolution;

  vec4 _samples = texture2D(samples, uv);
  vec4 _spectrums = texture2D(spectrums, uv);

  vec2 sm = smoothstep(sin(time), cos(time), uv) + uv.xy;
  vec4 bb = texture2D(backbuffer, _samples.xy * uv);
  vec4 vidT = texture2D(video, rotate2(_samples.x / .03 * 2.0 * 3.14) * uv);
  vec4 o = vidT / bb;

  gl_FragColor = o;
}

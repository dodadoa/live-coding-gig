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

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  vec4 vidT = texture2D(video, uv);

  gl_FragColor = vidT;
}

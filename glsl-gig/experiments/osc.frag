/*{ "osc": 3333 }*/
precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform sampler2D osc_oscMsg;      // OSC on /foo
uniform sampler2D osc_foo_bar;  // OSC on /foo/bar

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    if (uv.y < .5) {
        gl_FragColor = texture2D(osc_oscMsg, uv);
    } else {
        gl_FragColor = texture2D(osc_foo_bar, uv);
    }
}

/*{
  "audio": true
}*/

precision mediump float;

uniform vec2 resolution;
uniform float time;
uniform sampler2D samples;
uniform sampler2D spectrums;
uniform sampler2D backbuffer;

#define NUM_OCTAVES 5

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

#define PI radians(180.0)

// See http://iquilezles.org/www/articles/palettes/palettes.htm for more information
vec3 palettes(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
    return a + b * cos(2.0 * PI *(c * t + d));
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f*f*(3.0-2.0*f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(time), sin(time),
                    -sin(time), cos(time));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= .15;
    }
    return v;
}

void main() {
    vec2 st = gl_FragCoord.xy/resolution.xy*3.;
    st += st * abs(sin(time*0.1)*3.0);
    vec3 color = vec3(1.0);

    vec4 _ss = texture2D(samples, vec2(1.0));
    vec4 _sp = texture2D(spectrums, vec2(1.0));
    vec4 _b = texture2D(backbuffer, vec2(1.0));
    vec4 _sss = texture2D(samples, vec2(color.x, color.y));

    vec2 q = vec2(0.);
    q.x = fbm(st + time);
    q.y = fbm(st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0 * q + vec2(1.7, 9.2)+ 0.15*time );
    r.y = fbm( st + 1.0 * q + vec2(8.3, 2.8)+ 0.126*time);

    float f = fbm(st * _ss.x * _sss.x * _sss.y + sin(time) + 30.5);

    color = mix(vec3(0.2, 0.6,0.7),
                vec3(0.67,0.67,0.5),
                clamp((f * r.y) * 10.0 * cos(time),0.0,1.0));

    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    // float m_dist = .4;
    // for (int j= -1; j <= 1; j++ ) {
    //     for (int i= -1; i <= 1; i++ ) {
    //         vec2 neighbor = vec2(float(i),float(j));
    //         vec2 offset = random2(i_st * neighbor);
    //         offset = .5 + .5 * sin(time * offset * 3.0);
    //         vec2 pos = neighbor + offset - i_st;
    //         float dist = length(pos);
    //         m_dist = max(m_dist, m_dist * dist);
    //     }
    // }

    float x = 0.0;
    if (_ss.r < 0.001) {
      x = 10.0;
    } else {
      x = 100.;
    }
    // color += step(0.60, m_dist * _sss.x * _sss.y);


    gl_FragColor = vec4((f * 3.0) * color, 1.0);
}

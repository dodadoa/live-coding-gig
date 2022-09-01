precision mediump float;

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size, _size + vec2(0.001),_st)
      * smoothstep(_size, _size + vec2(0.001), vec2(1.000)-_st);
    return uv.x  * uv.y;
}

float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/4.)) +
            box(_st, vec2(_size/4.,_size));
}

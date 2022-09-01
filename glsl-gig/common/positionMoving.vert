vec3 posFunctionMover(float t, float i) {
	return vec3(
      cos(t * 3.0 + i * .5),
      cos(t * 2.0 + i * .5),
      cos(t * 1.0 + i * .5)
	);
}

vec3 posFunction(float t, float i) {
  return posFunctionMover(t*.3, i * 0.3) + posFunctionMover(t, 1.0);
}

vec3 push(float t, float i, vec3 ofs, float lerpEnd) {
  vec3 pos = posFunction(t, i)+ofs;

  vec3 posf = fract(pos + 0.1) - 0.5;

  float l = length(posf) * 0.1;
  return (- posf + posf/l)*(1.5 - smoothstep(lerpEnd,1.5, l));
}

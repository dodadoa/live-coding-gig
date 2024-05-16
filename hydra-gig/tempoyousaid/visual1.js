
osc(5,0.4,1)
// .scale(0.5, Math.sin(time))
// .color(0.5, () => a.fft[0] * 10, [1,0])
// .repeat(1, 2)
.diff(src(o0).scale(() => Math.sin(time)), 0.5)
// .colorama(0.001)
.modulateScale(osc(2, 0.1, 0.2), 0.2)
.modulateRotate(osc(10, 0.5, 1), 0.6)
// .rotate(() => time * 1)
// .scale(60)
// .modulate(o0, 0.7)
.modulateScale(o0, 0.6)
// .pixelate(300, 100)
// .modulate(o0, 0.3)
// .add(o1, 0.5)
// .thresh(0.7)
// .luma(0.5)
.out(o0)


osc(5,0.4,1)
.diff(src(o0).scale(() => Math.sin(time)), 0.5)
.modulateScale(osc(2, 0.1, 0.2), 0.2)
.modulateRotate(osc(10, 0.5, 1), 0.6)
.modulateScale(o0, 0.6)
.out(o0)

speed = 0.1
speed = 1
bpm = 155

voronoi(10, 1, 0.1)
// .modulate(noise(2, 2), 1)
// .modulateRotate(o0 , 1)
// .rotate(() => time * 0.5)
.out(o1)

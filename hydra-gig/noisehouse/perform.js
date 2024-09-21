bpm = 200

osc(5,0.4,2)
.modulateScale(osc(2, 0.1, 0.2), 0.9)
.modulateRotate(osc(10, 0.5, 1), 0.6)
// .pixelate(100, [100, 1000, 200])
.color([1, 0.2, 0.5],[-0.5, 1], [1,-0.75, 0.5])
.brightness(0.3 )
.diff(o1)
.modulate(o1, 1)
.thresh([0.7], 0)
.pixelate([2,8, 100, 1000], 1000)
.out(o1)

hush()

bpm = 90
speed = 0.5
speed = 2

osc(5,1.25, 5)
  .diff(gradient(5))
  .color([1, 0.2, 0.5], [0.5, 1], [1,0.75, 0.5])
  // .modulateKaleid(shape([2, 1, 5], 10), 0.6)
  .modulate(o0, 0.75)
  .saturate(2)
  // .brightness(-0.4)
  .scale(1)
  // .rotate(() => time)
  // .layer(src(o1).luma(0.6))
  .modulate(o0, 0.5)
  .modulateRotate(src(o1).scale(3))
  // .thresh(0.9)
  .out(o0)

speed = 2
bpm = 70

osc(10, 0.1, 10)
  .mask(
    osc(10, 0.1)
      .thresh([0.2, 0.3, 0.8])
      .rotate(() => time / 2)
      .modulateScale(noise(0.3))
  )
  .modulateRotate(osc([100, 20, 1].fast()))
  .color(1, [0, 0.2,1].smooth(), [0, 1])
  .scroll([2, 4, 6], [2, 3, 4])
  // .scale([0.5, 1, 2, 4])
  .colorama(2)
  // .layer(src(o0))
  .modulate(o0, 0.5)
  // .brightness(-0.15)
  .out(o1)

bpm = 110
speed = 1

osc(10, 1, 10)
  .invert([0, 1])
  .modulateScrollX(osc([1, 3, 2], 0.2))
  .scale([1, 0.83, 0.6, 0.5])
  .modulateRotate(noise(0.1), [0.2, 0.4, 0])
  .color([1, 0, 2], [0, 1], 0.7)
  .mask(shape(2).scale([2, 1, 1.5].fast()))
  .mask(shape(2).scale(() => Math.random() * 4))
  // .scale(2.2)
  .modulate(o1, [0, 1, 2, 3])
  .out(o0)

speed = 1.5

voronoi(3, 1)
  .modulateRotate(o0, 1)
  .diff(gradient([1, 5]))
  .layer(shape(4).rotate(() => time /2).luma(0).scale([1, 3, 0.2]).color(1, 0, 0))
  // .diff(src(o1).mask(shape(4).scale(2)))
  // .blend(src(o1).scale(2))
  .modulate(o0, 0.5)
  .luma(0.4)
  .layer(src(o1).luma(0.3))
  .sub(src(o0).thresh([0.8, 0.4, 0.9]))
  .luma(0.1)
  // .diff(gradient(50))
  .thresh([0.75, 0.55, 0.9])
  .modulateScale(o0, 1)
  .out(o0)

bpm = 100
speed = 1.5

osc(5, [0.5, -0.5], 0)
  .modulate(noise(1), 0.1)
  // .modulateScale(shape(2).rotate(() => time), () => time / 2)
  // .modulate(o0, 0.5)
  // .brightness(0.5)
  .sub(o1)
  .luma(0.8)
  .thresh(0.5)
  .pixelate([10, 50, 100], 2)
  .out(o0)

speed = 0.3

osc(3, [0.1, -0.1], [0.1, 0.3, 0.5])
  .modulateRotate(o0, 0.5)
  .luma(0.3)
  .diff(
    osc(2,)
  )
  .modulate(o0)
  .luma(0.2)
  .modulate(o0)
  .colorama([1, 20, 16])
  .luma(0.3)
  .brightness(-0.2)
  .out(o0)

hush()

bpm = 110
speed = 1

hush()

osc(10, 0.1, 10)
  .mask(
    osc(10, 0.1)
      .thresh([0.2, 0.3, 0.8])
      .rotate(() => time / 2)
      .modulateScale(noise(0.3))
  )
  .pixelate(2, 1000)
  .colorama(0.1)
  .modulateRotate(osc([100, 20, 1].fast()))
  .color(1, [0, 0.2,1].smooth(), [0, 1])
  .scroll([2, 4, 6], [2, 3, 4])
  .scale(1.5)
  .diff(o1, 0.9)
  // .luma(0.3)
  .out(o0)

bpm = 110
speed = 0.1

// src(s0)
osc(10, 1, 10)
  .invert([0, 1])
  .modulateScrollX(osc([1, 3, 2], 0.2))
  // .modulate(osc(20, 0.2))
  .scale([1, 0.83, 0.6, 0.5])
  .modulateRotate(noise(0.1), [0.2, 0.4, 0])
  .color([1, 0], [0, 1], 0.3)
  .mask(shape(2).scale([2, 1, 1.5].fast()))
  .mask(shape(2).scale(() => Math.random() * 4))
  .scale(1.2)
  .modulate(o0, [0, 1, 2, 3])
  // .blend(solid(1, 1, 1), [0, 1].fast())
  // .diff(o1)
  // .layer(src(o1).luma(0.6))
  .out(o1)

hush()

bpm  = 140
speed = 2

voronoi(3, 1)
  .modulateRotate(o0, 1)
  .diff(gradient([1, 5]))
  .layer(shape(4).rotate(() => time /2).luma(0).scale([1, 3, 0.2]).color(1, 0, 0))
  .diff(src(o1).mask(shape(4).scale(2)))
  // .blend(src(o1).scale(2))
  .modulate(o0, 0.5)
  // .sub(o1)
  // .luma(0.4)
  // .layer(src(o1).luma(0.3))
  // .diff(src(o1))
  .out(o0)

  voronoi(3, 1)
    .modulateRotate(o0, 1)
    .diff(gradient([1, 5]))
    .layer(shape(4).rotate(() => time /2).luma(0).scale([1, 3, 0.2]).color(1, 0, 0))
    .diff(src(o1).mask(shape(4).scale(2)))
    .modulate(o0, 0.5)
    .out(o0)

bpm = 115
speed = 0.5

noise(0.5, 0.1)
// osc([10, 5, 1], 0.1, 0)
.colorama(5)
.color(1, 0.2, 2)
.sub(o0, 0.7)
.add(gradient(2).luma(0.2))
.sub(osc(10, 0.5, 10))
.rotate(() => time / 4)
.modulate(o0, [0, 0.2, 0.5])
// .thresh(0.2)
.color(0, 0.1, [0.5, 0.9, 0.3])
// .colorama(2)
.pixelate([10, 100, 300].ease(), [100, 10, 50].ease())
.out(o1)

bpm = 105
speed = 0.8

shape(3)
.modulateRotate(noise([3, 5, 1]))
.scale(1, () => Math.sin(time))
.color(0.5, 2, [1,0.10].smooth())
.rotate(() => time / 2)
// .add(o0, 0.1)
.modulateRepeat(osc(10, 0.1), 0.5)
.scale(2)
.colorama(10)
// .modulateRepeatX(osc(10))
.modulateRepeatY(osc([2, 10, 20].fast()))
.diff(o1, 0.1)
.modulate(o0, 0.3)
// .invert()
.out(o1)

bpm = 130
speed = 0.5

shape(3)
.scale(0.5, () => Math.sin(time))
.modulateRotate(voronoi(5,0.8).thresh(0.2), () => a.fft[1] * 5)
.modulate(o0, 0.5)
.diff(o0, 0.2)
.luma([0.2, 0].smooth())
.scale(1.2)
.rotate(() => time / 2)
.color(1, 0.2, 0)
// .thresh(0.2)
.out(o1)

osc(3, 0.5, 2)
  .modulateRotate(o0, 1)
  .sub(shape(1).scale(10), () => a.fft[0] * 1)
  .luma(0.3)
  .modulateRotate(osc(3, 0.1, 5), 1)
  .modulate(o1, 1)
  .diff(
    shape(2)
      .scale(() => Math.sin(time) * 0.5 + 1.5)
      .rotate(() => time / 2)
  )
  // .pixelate([30, 2, 10, 300], 500)
  // .color(0, 0, 1)
  // .modulate(o0, [0, 0.2, 0.7, 1].ease())
  // .modulate(osc(20))
  .out(o1)

osc(5, 3, 1)
  .modulate(noise(1), 0.1)
  .modulate(o0, 0.5)
  .modulateScale(shape(2).rotate(() => time), () => time / 2)
  .brightness(0.3)
  .sub(o0)
  .out(o0)

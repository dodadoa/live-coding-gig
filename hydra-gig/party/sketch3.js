bpm = 120
speed  = 3
speed = 0.1

osc(10, 1, 1)
.modulate(noise(10, 10, 1))
.modulate(o0)
.out(o0)

bpm = 90
speed = 0.05

osc(10, [1, 1, -1, -1], 1)
  .modulate(osc([5, 2, 3], [0.2, 0.2, -0.2, -0.2]), 1)
  .modulateRotate(o0, 0.2)
  .diff(shape(1).scale(10), () => a.fft[2] * 1)
  .luma(0.3)
  // .modulateRotate(osc(30, 0.1, 5), 0.5)
  // .pixelate([332, 33, 13, 30], 130)
  .modulate(o0, 1)
  .color(0, 0.1, 1)
  // .luma(0.1)
  .pixelate([50, 2, 2000, 20, 1000], 500)
  .add(noise(2, 0.5, 0.1).color(0, 0, 1).luma(0.1))
  .modulate(o0, 0.5)
  .out(o0)

speed = 0.25
bpm = 124

osc(3, 0.5, 1)
  .colorama(0.1)
  .diff(gradient(4))
  .modulate(noise(1), 0.1)
  // .modulate(o1, () => a.fft[0] * 2)
  .modulateScale(o0, () => time  / 100)
  .luma(0.2)
  // .color(1,0.5,1)
  // .add(solid(1).scale(100).luma([0, 10]).color(0,0,0.2))
  .color([1, 0.5, 0.1], 0.1, [0.2, 0.5, 1, 0.5, 0.1])
  // .thresh(0.9)
  .modulate(o0, 0.4 )
  .out(o0)

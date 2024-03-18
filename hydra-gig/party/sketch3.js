bpm = 120
speed  = 3
speed = 0.1

osc(10, 1, 1)
.modulate(noise(10, 10, 1))
.modulate(o0)
.out(o0)

osc(3, 0.5, 1)
  .modulate(noise(1, 2), 1)
  .modulateRotate(o0, 0.2)
  .diff(shape(1).scale(10), () => a.fft[2] * 1)
  .luma(0.3)
  .modulateRotate(osc(22, 0.1, 5), 1)
  .pixelate([332, 33, 13, 30], 130)
  .modulate(o0, 1)
  // .diff(osc(10, 0.1, 0.1)1
  .out(o0)

speed = 1
bpm = 130

osc(10, 10, 1)
  .modulate(noise(1), 0.1)
  .modulate(o1, () => a.fft[0] * 2)
  .modulateScale(o0, () => time  / 100)
  .luma(0.3)
  .color([1, 0.5, 0.1], 0.1, [0.2, 0.5, 1, 0.5, 0.1])
  // .thresh(0.9)
  .out(o0)

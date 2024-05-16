speed = 2
bpm = 130

osc(10, 0.1, 10)
  .mask(
    osc(10, 0.1)
      .thresh([0.2, 0.3, 0.8])
      .rotate(() => time / 2)
      .modulateScale(noise(0.3))
  )
  .colorama(0.1)
  .modulateRotate(osc([100, 20, 1].fast()))
  .color(1, [0, 0.2,1].smooth(), [0, 1])
  .scroll([2, 4, 6], [2, 3, 4])
  .scale(1.5)
  .out(o0)

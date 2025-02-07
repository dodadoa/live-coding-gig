

// SUHSI

bpm = 145
speed = 1

osc(10,1,0.5)
.modulateRotate(osc(20))
.modulateScrollX(noise(5).pixelate(100,10))
.rotate(() => time / 10)
.thresh(0.9)
.modulatePixelate(o0, [0.2, 0.85, 0.5, 1])
.scrollX(() => time /5)
.modulate(o0, 0.8)
.color([1, 0],[0,0.1],[0,1])
.add(shape(4)
  .repeat([2, 4], [2, 10, 100].fast())
  .scrollY(2, 0.5)
  .color(0,[0,1],[1,0.7])
  .rotate([10, 0, 100, 1000, 0, 0, 0]).modulate(o0))
.brightness(0.3)
.contrast(10)
.out(o0)

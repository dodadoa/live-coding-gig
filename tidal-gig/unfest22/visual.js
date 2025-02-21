noise(2)
.modulateScale(osc(3))
.diff(gradient(2))
.modulatePixelate(osc(10,0.1,0.5))
.color(1,0,0)
.luma(0.01)
.modulate(o0, 0.2)
.luma(0.1)
.layer(solid(0,1,0).diff(gradient(10).color(1,0,1)).luma([1,1,1,1,1,1,1,0].fast()))
.out()
bpm = 130
speed = 2

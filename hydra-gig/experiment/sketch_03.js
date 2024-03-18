shape(3)
.scale(0.5, () => Math.sin(time))
.modulateRotate(voronoi(5,0.8), () => a.fft[1] * 5)
.modulate(o0, 0.5)
.diff(o0, 0.2)
.scale(0.9)
.colorama(0.1)
.out()



osc(2, 1, [1, 0.6, 0.1])
// .scale(0.5, () => Math.sin(time))
.color(0.5, ()  => a.fft[0] * 10, [1,0.10].smooth())
// .modulateScale(osc(50,0.8, 0.2),() => a.fft[0] * 10)
.repeat(1,2)
.modulateRotate(osc(1), () => a.fft[1] * 5)
.modulateRotate(o0, 1)
.scale([1, 2, 5, 0.5])
.colorama([0.1, 0.5, 0.7])
.luma(0.6)
.modulate(o0)
.out(o0)

osc(20, 1, 0.1)
.out(o0)

speed 1
speed = 0.3
speed = 0.1
bpm = 84

hush()

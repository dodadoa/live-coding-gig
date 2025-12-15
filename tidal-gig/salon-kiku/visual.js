speed = 0.5
bpm = 130

osc().out()

osc(10,0.1,1)
.diff(gradient(0.1))
.hue(0.2, 0.5, 0.1)
.brightness(-0.4)
// .scale([0.5,1].smooth())
.modulateScale(noise(1), 0.6)
.luma(0.2)
.modulate(o0, 0.25)
.out(o0)

hush()

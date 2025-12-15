bpm = 130
speed = 10

osc(10,0.5,1)
.diff(gradient(50))
.color(1,0.4,0.4)
.brightness(-0.4)
.rotate(() => time/5)
.modulate(o0, 0.5)
.modulate(voronoi(2))
.modulate(noise(2))
.modulate(o0, 1)
.blend(solid([1,0],[0,0,1],[0,1]).luma([0,0,1,0].smooth()))
.out(o0)

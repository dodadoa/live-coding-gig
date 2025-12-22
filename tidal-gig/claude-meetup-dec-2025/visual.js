speed = 1
bpm=140
osc(3,0.1,0.5)
.scrollX(0,0.1)
.scale(0.4)
.pixelate(10,5)
.saturate(2)
.color(1,0.2,0.4)
.diff(noise(0.5).colorama(0.5))
.modulate(o0, 0.5)
.luma([0.3,0.5,0.8])
.brightness(-0.4)
.thresh(0.25)
.pixelate([500,100,1000,50,250].smooth(),500)
// .scrollY(0,[0.1])
.modulate(o0, 0.75)
.out()

hush()

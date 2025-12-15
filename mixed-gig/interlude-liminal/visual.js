bpm = 120
speed = 1

a.setBins(6)
a.show()

noise(2)
.modulateScale(osc(3))
.diff(gradient(2))
.modulatePixelate(osc(10,0.1,0.5))
.color(1,0,0)
.luma(0.01)
.modulate(o0, 0.2)
.luma(0.2)
.layer(solid(0,1,0).diff(gradient(10).color(1,0,1)).luma([1,1,1,1,1,1,1,0].fast()))
.out(o1)


// NOISE PIXEL + BG
noise(2, 1)
	.modulate(
  		shape(3).rotate(
          () => (time / Math.PI)
        )
  		.scrollX(() => Math.sin(time))
  		.modulateRotate(shape(3).modulateRepeat(noise(10)))
	)
	.modulate(voronoi(2).modulate(noise()))
	.color(1, 0, 0)
	.diff(
  		osc(1, 0.5, 4)
	)
	.diff(noise(3).rotate(() => time / 2))
	.diff(gradient(2))
	.modulatePixelate(osc(2).rotate(() => Math.cosine(time)).scale(() => Math.sin(time) * 0.2 + 0.4))
    .modulateScale(noise(5).scale([0.1, 0.2, 0.3, 2, 0.2].smooth()), 0.4)
	.diff(osc(4, 0.8, 1))
  	.modulate(o0)
	.mult(
  		shape(50)
  		.scale(3, 0.5)
  		.modulateScale(noise(2, 0.5))
  		.modulateRotate(noise(3, 0.2))
  		.scale(
          () => a.fft[0] * 1.5 + 1
        )
	)
	.diff(gradient(0.1).color([1, 0.2, 0.4].smooth(), 0.2, 0.2).colorama(10).luma(0.85))
	.pixelate([80, 200, 1000].smooth(), 150)
	.modulate(o0)
	.out(o0)

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
  .diff(o1)
  .layer(src(o1).luma(0.35))
  .out(o0)

speed = 1

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
  .luma(0.4)
  .modulate(o0, 0.5)
  .diff(o1)
  .out(o0)

hush

// RAVE!
osc(13,0,1)
  .kaleid(4)
  .mask(shape(4,0.3,1))
  .modulateRotate(shape(4,0.1,1))
  .modulateRotate(shape(4,0.1,0.9))
  .modulateRotate(shape(4,0.1,0.8))
	// .modulateScale(osc(100, 1).thresh(0.9))
	.mult(gradient(2).colorama(10).brightness(-1.5))
  .scale([0.3, 0.5, 0.7, 1, 0.7, 0.3].smooth())
  .add(shape(4,0.2,1).color(1,1,1,0.4))
	.colorama([0.5, 1, 2].smooth())
	.luma([0.6,0.2,0,0.3].smooth())
	// .thresh([0.5, 0.9, 0.7].fast())
	// .colorama(2)
	// .color(1,0.3,4)
	// .colorama([15, 15, 15, 0, 0, 0].fast())
  .color(1,0,1)
	.brightness(-0.2)
  // .luma(0.2)
  .rotate(()=>time)
  // .diff(o1)
  .modulate(o0)
  .out(o0)

speed = 0.36
bpm = 132

hush()

bpm = 130
speed = 1

osc(100, 0.1, 0.5)
.brightness(-0.3)
.out(o0)

//AHIVAR
bpm = 140
speed = 0.25
osc([1, 10, 20], 0.2, 1)
  .modulate(osc(40).rotate(() => time))
  .pixelate(100,400)
  .modulate(o0)
  .pixelate([1000,100, 2], 100)
  .scale([0.1, 1, 2, 10, 20])
  .layer(src(o1).luma(0.2))
  .rotate(() => time / 4)
  .contrast(1.4)
  .rotate(() => -time / 3)
  .color([1,0,0,1],0,[0,1,1])
  .scrollX(() => time / 4)
  .brightness(-0.45)
  .hue(() => Math.sin(time))
  // .layer(shape(3).rotate(() => time / 4).color(1,0,0).scale(0.3).luma(0.1).scroll(() => mouse.x, () => mouse.y))
  // .luma(0.1)
  .pixelate([2, 200, 200, 500, 500].fast(), [1000, 1000, 1000, 1000].fast())
  .modulate(o0, 0.9)
  .out(o0)

speed = 0.1

speed = 0.25
osc()
	.modulateScale(gradient(10))
	.modulate(src(o0).mult(osc(10)))
	.modulate(osc(2).repeatX(10).modulateRepeatX(osc(10)))
	// .colorama(0.35)
	.color(2,0.4,0.4)
	.rotate(() => time / 10)
	.luma(0.25)
	.modulate(shape(4,0.2,2.5))
	// .modulate(shape(4,0.5,1.5).rotate(2).scrollX(0.5))
	// .modulate(shape(4,0.5,1.5).rotate(5).scrollX(0.8))
	.luma(0.4)
	// .mult(noise(5,0.1).pixelate(100, [2,3,3,4,5].smooth()))
  .diff(gradient(1))
  .color(0.5,0,0.5)
  .rotate(() => time / 8)
  .modulate(o0, 0.5)
  .brightness(-0.3)
  // .layer(src(o1).luma(0.4).color(0,0,10))
	.out(o0)

hush()

bpm = 110
speed = 0.2

osc(10, 1, 10)
  .invert([0, 1])
  .modulateScrollX(osc([1, 3, 2], 0.2))
  // .modulate(osc(20, 0.2))
  .scale([1, 0.83, 0.6, 0.5])
  .modulateRotate(noise(0.1), [0.2, 0.4, 0])
  .color([1, 0], [0, 1], 0.3)
  .mask(shape(2).scale([2, 1, 1.5].fast()))
  .mask(shape(2).scale(() => Math.random() * 4))
  .scale(0.9)
  .modulate(o0, [0, 1, 2, 3])
  // .blend(solid(1, 1, 1), [0, 1].fast())
  // .diff(o1)
  // .layer(src(o1).luma(0.6))
  // .thresh(0.2)
  .luma([0.2, 0.4, 0.3])
  // .rotate(() => time / 4)
  // .colorama(0.01)
  .scrollY(() => time / 10)
  .repeat(2, 2)
  .pixelate(400, 2000)
  .out(o0)

speed = 0.5
osc(2,0.3,0.6)
  .brightness(-0.7)
  .rotate(() => time / 4)
  .pixelate(1000,[10, 15, 20, 100])
  .layer(osc(2,1,0.4).luma(0.8).brightness(-0.4))
  // .modulate(o0)
  .colorama(0.4)
  .brightness(-0.3)
  // .luma(0.5)
  .contrast(2)
  .rotate(() => time / 4)
  .modulate(o0, 2)
  .out(o0)

speed = 0.3

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

hush()

speed = 0.35
bpm = 125

osc(3, 1, 1)
  .modulateRotate(o0, 1)
  .modulateRotate(o0, [0, 0.2, 0.3, 1])
  .luma(0.7)
  .color([5,2, 1], [0.3,0.2,0.1], [1,4])
  .brightness([-0.2, -0.3, -0.3, -0.2].smooth())
  // .modulate(o0, 1)
  // .thresh(0.25)
  // .mult(o1, 0.2)
  // .modulate(o1, [0.7, 0, 0.5])
  .pixelate([3, 5, 10, 100, 1000], [5, 100])
  .rotate(() => time / 2)
  .layer(
    osc(10, 1, 1)
      .color(1,0,0)
      .luma(0.2)
  )
  .scale(() => Math.sin(time/ 4))
  .scale(1.2)
  .pixelate([1, 2, 10, 200], 300)
  .contrast(1.15)
  .brightness(-0.4)
  // .modulate(src(s0).scale(0.5).rotate(() => time / 10), 0.5)
  .add(o1)
  .modulate(o0, 0.4)
  .out(o0)

speed = 0.4

osc(10, 0.1)
	.colorama(10)
	.add(gradient(2).brightness(-0.75).thresh(0.2))
	.color(1,0.6,1)
	.modulateRotate(shape(4, 0.1))
	.modulateRotate(shape(4, 0.5).repeat([10, 20, 30].smooth()))
	.modulateRotate(shape(4, 0.1))
//	.modulateScale(osc([1,2,3].smooth()))
	.colorama(0.1)
	.luma(0.45)
	.modulate(o0, 0.1)
  .brightness(-0.5)
	//.blend(shape(4).scale(10).color(1.5,0.1,0.1).luma([0.15,0.5,0.5,0.15].smooth()).brightness(-0.2).luma(0.21))
	.out(o1)

voronoi(5, 2, 0)
  .modulateRotate(o0, 1)
  .rotate(() => time / 4)
  .diff(gradient(2))
  .luma(0.6)
  .layer(
    osc(10, 2, 2)
      .color(0,0,1)
      .luma(0.085)
  )
  .pixelate(250, 1500)
  .out(o1)


// act as BG
osc(10, 1, 1)
  .modulate(noise(10, 5))
  .modulate(o0, 0.2)
  .color(0.2,0.7,0.5)
  .brightness(-0.3)
  .out(o1)

speed = 0.1

speed = 0.3
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
  // .scroll([2, 4, 6], [2, 3, 4])
  .scale(1.5)
  // .thresh(0.2)
  // .modulate(o0, 0.5)
  .modulateRotate(o1, 2)
  // .thresh(0.5)
  .color(0.8, 0.4, 1)
  .pixelate([20, 10, 50], 1000)
  .modulate(o0, 1)
  .out(o0)

osc(10, 0.1, 10)
  .mask(
    osc(10, 0.1)
      .thresh([0.2, 0.3, 0.8])
      .rotate(() => time / 2)
      .modulateScale(noise(0.3))
  )
  .modulateRotate(osc([100, 20, 1].fast()))
  .color(1, [0, 0.2,1].smooth(), [0, 1])
  .scroll([2, 4, 6], [2, 3, 4])
  // .scale([0.5, 1, 2, 4])
  .colorama(2)
  // .layer(src(o0))
  .modulate(o0, 0.5)
  // .brightness(-0.15)
  .out(o1)

osc(3, [0.1, -0.1], [0.1, 0.3, 0.5])
    .modulateRotate(o0, 0.5)
    .luma(0.3)
    .diff(
      osc(2,)
    )
    .modulate(o0)
    .luma(0.2)
    .modulate(o0)
    .colorama([1, 20, 16])
    .luma(0.3)
    .brightness(-0.2)
    .out(o1)

hush()

speed = 0.3
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
  // .modulatePixelate(osc(2).rotate(() => Math.cosine(time)).scale(() => Math.sin(time) * 0.2 + 0.4))
  // .modulateScale(noise(5).scale([0.1, 0.2, 0.3, 2, 0.2].smooth()), 0.4)
  .diff(osc(4, 0.8, 1))
  // .modulate(o0)
  .mult(
      shape(50)
      .scale(3, 0.5)
      .modulateScale(noise(2, 0.5))
      .modulateRotate(noise(3, 0.2))
      .scale(
          () => a.fft[0] * 1.5 + 1
        )
  )
  // .diff(gradient(0.1).color([1, 0.2, 0.4].smooth(), 0.2, 0.2).colorama(10).luma(0.85))
  .pixelate([80, 200, 1000].smooth(), 150)
  .modulate(o0)
  .scale([0.4, 1, 1.5, 2].fast())
  .out(o0)

osc(5,0.4,2)
  .modulateScale(osc(2, 0.1, 0.2), 0.9)
  .modulateRotate(osc(10, 0.5, 1), 0.6)
  .pixelate(100, [100, 1000, 200])
  .color([1, 0.2, 0.5],[-0.5, 1], [1,-0.75, 0.5])
  .contrast(1.1)
  .brightness(-0.4)
  .out(o1)

bpm = 132
speed = 0.5
osc(3, 0.5, 2)
  .modulateRotate(o0, 1)
  .luma(0.3)
  .modulateRotate(osc(3, 0.1, 5), 1)
  .modulate(o0, 1)
  .diff(
    shape(2)
      .scale(() => Math.sin(time) * 0.5 + 1.5)
      .rotate(() => time / 2)
  )
  .modulate(o0, [0, 0.2, 0.7, 1].ease())
  .modulate(osc(20))
  .brightness(-0.2)
  .contrast(1.2)
  .luma(0.4)
  .color(1,0,1)
  .layer(src(o1).luma(0.41).color(1,0.4,0.3))
  .rotate(() => time / 4)
  .modulate(o0)
  .pixelate([30, 2, 10, 300], 500)
  .out(o0)

speed = 0.5
shape(3)
  .modulateRotate(noise([3, 5, 1]))
  .scale(1, () => Math.sin(time))
  .color(0.5, 2, [1,0.10].smooth())
  .rotate(() => time / 2)
  // .add(o0, 0.1)
  .modulateRepeat(osc(10, 0.1), 0.5)
  .scale(2)
  .colorama(15)
  .modulateRepeatX(osc(10))
  .modulateRepeatY(osc([2, 10, 20].fast()))
  // .add(src(o1))
  .pixelate([30, 2, 10, 300], 500)
  .modulate(o0, 0.7)
  .out(o0)

speed = 0.5
osc(1, 2, 0.2)
  .modulateRotate(o0, 1)
  .sub(shape(1).scale(10), () => a.fft[0] * 1)
  .modulateRotate(o0, [0, 0.2, 0.3, 1])
  .luma(0.3)
  .color([5,2, 1], [0.3,0.2,0.1], [1,4])
  .brightness([-0.2, -0.3, -0.3, -0.2].smooth())
  .modulate(o1, 1)
  .sub(o1)
  // .thresh(0.25)
  .sub(o1, 0.2)
  .pixelate(2, 100)
  // .rotate(() => time / 2)
  // .scale(2)
  .modulate(o1, [0.7, 0, 0.5])
  .pixelate([3, 5, 10, 100, 1000], [10, 20, 200])
  // .sub(o2)
  // .diff(o0)
  // .mult(o0)
  .rotate(() => time / 2)
  .scale([0.2, 0.5, 1, 4])
  // .scale(1.4)
  // .pixelate([1, 2, 10, 100], 100)
  // .modulate(o0)
  // .modulate(src(s0).scale(0.5).rotate(() => time / 10), 0.5)
  // .sub(o1)
  .luma(0.3)
  .color(1,0,[0,1])
  .brightness(-0.4)
  .modulate(o0)
  .out(o0)

speed = 1
noise(0.5, 0.1)
// osc([10, 5, 1], 0.1, 0)
  .colorama(5)
  .color(1, 0.2, 2)
  .sub(o0, 0.7)
  .diff(gradient(2).luma(0.3))
  .sub(osc(10, 0.5, 10))
  .rotate(() => time / 4)
  .modulate(o0, [0, 0.2, 0.5])
  .thresh([0.2, 0.3, 0.1, 0].fast())
  .color(0, 0.1, [0.5, 0.9, 0.3])
  // .colorama(2)
  .pixelate([10, 100, 300].ease(), [100, 10, 50].ease())
  .diff(o1)
  .modulate(o0, 0.5)
  .out(o0)

bpm = 130
speed = 1
voronoi(3, 1)
  .modulateRotate(o0, 1)
  .diff(gradient([1, 5]))
  .layer(shape(4).rotate(() => time /2).luma(0).scale([1, 3, 0.2, 0.5, 1, 0.9].smooth()).color(1, 0, 0))
  .diff(src(o1).mask(shape(4).scale(2)))
  // .blend(src(o1).scale(2))
  .modulate(o0, 0.5)
  // .sub(o1)
  // .luma(0.4)
  // .layer(src(o1).luma(0.3))
  .diff(src(o1))
  .luma(0.1)
  .brightness(-0.2)
  .out(o1)

hush()

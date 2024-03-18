// SETUP

s0.initScreen()

// elephant
s0.initVideo("https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXY4azE2ZWczZ3c4ejJnMjM5dGQ5Y29ka3dvdXFxejMwa3NhZGlmeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dNCZp9aaDHPi0/giphy.mp4")
// hacker
s0.initVideo("https://media.giphy.com/media/12W5Sg2koWYnwA/giphy.mp4")

// CONTROL

bpm = 120
speed = 0.3

hush()

// VISUAL PART

bpm = 120
speed = 1

osc(3, 0.5, 2)
  .modulateRotate(o0, 1)
  // .sub(shape(1).scale(10), () => a.fft[0] * 1)
  // .luma(0.1)
  .modulateRotate(osc(3, 0.1, 5), 1)
  .diff(
    shape(2)
      .scale(() => Math.sin(time) * 0.5 + 1.5)
      .rotate(() => time / 2)
  )
  .pixelate([1, 2, 10, 100], 500)
  .luma(0.6)
	.modulate(o0)
	// .mult(o0)
	// .mult(o1, 0.2)
	.color([0, 0.2, 0.5], () => a.fft[0] * 2, 1)
  .out(o0)


bpm = 125
speed = 0.1
shape(2,0.4,1)
  .scale(0.5, Math.sin(time))
  .color(0.5, 2, [1,0.10].smooth())
  // .repeat(1, 2)
  .rotate(() => time / 10)
  .diff(o0, 0.1)
  // .colorama(0.1)
  .modulateRepeat(osc(50,0.8, 0.2), 0.5)
  .modulateRotate(o1, 0.6)
  // .add(o0, 0.3)
  .scale(1.4)
  .colorama(0.15)
  // .invert([0, -0.5, -0.2])
	.luma(0.5)
  .out(o0)

bpm = 90
speed = 0.1

osc(10, 0.4, 0.5)
  .modulate(noise(1), 0.1)
  .modulate(o1, () => a.fft[0] * 2)
  .modulateScale(o0, [1, 0.5])
  .color([1, 0.5, 0.1], 0.1, [0.2, 0.5, 1, 0.5, 0.1])
	// .luma(0.3)
  .thresh(0.1)
	.pixelate(100, [1, 20, 100])
  .out(o0)

hush()

bpm = 135
speed = 1
osc(5,1)
  .modulate(noise(6), 1)
  // .sub(o0)
	.modulateHue(osc(1, 5).modulate(osc().rotate(),.11))
	.color([1, 0.5, 0.1], 0.1, [0.2, 0.5, 1, 0.5, 0.1])
	.brightness(0.2)
	.diff(o0)
	.sub(noise([1, 3, 10]))
	.mult(noise([3, 0, 1, 10]))
	.mult(osc(10, [2, 5, 10], 2))
  // .modulateRepeatY(o0)
	// .modulate(o1)
	.add(shape([3, 2, 5, 10]).scale([0.25, 1,  0.5]).rotate(() => time / 2).repeatX([3, 5, 8]))
	// .luma(0.3)
	.modulate(o0)
	// .mult(noise(13))
	.pixelate([2, 10, 100], 1000)
  .out(o0)

bpm = 130
speed = 1

noise(6,.05, 2)
  .modulateRotate(shape(100, 10, ()=>Math.sin(time)), 20)
  .diff(
    osc(9,.03).brightness(1.2).contrast(2)
      .mult( osc(9,0, ()=>Math.sin(time/3)+13 ) )
  )
  .rotate(() => time /10)
  .modulate(o0)
  .out(o0)









osc(5,0.4,1)
// .color(2, 2, [0.1,3])
// .diff(o0, 0)
// .modulateKaleid(shape(2, 0.1, 0.2), [0.2, 0.5, 0.7].smooth())
.modulateKaleid(shape(2, 0.1, 0.2), 0.3)
// .modulateRotate(osc(10, 0.5, 1), 0.6)
.luma(0.7)
.out(o1)

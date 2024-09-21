bpm = 90
speed = 0.2

hush()

osc(3, 1, 1)
  .modulateRotate(o0, 1)
  .sub(shape(1).scale(10), () => a.fft[0] * 1)
  .modulateRotate(o0, [0, 0.2, 0.3, 1])
  .luma(0.7)
  .color([5,2, 1], [0.3,0.2,0.1], [1,4])
  .brightness([-0.2, -0.3, -0.3, -0.2].smooth())
  .modulate(o0, 1)
  // .sub(o2)
  // .thresh(0.25)
  // .mult(o1, 0.2)
  // .modulate(o1, [0.7, 0, 0.5])
  // .pixelate([3, 5, 10, 100, 1000], [5, 100])
  // .sub(o2)
  // .diff(o0)
  // .mult(s0)
  .rotate(() => time / 2)
  // .scale(() => Math.sin(time/ 4))
  .scale(1.4)
  // .pixelate([1, 2, 10, 100], 100)
  // .modulate(o0)
  // .modulate(src(s0).scale(0.5).rotate(() => time / 10), 0.5)
  .out(o0)

osc(5, 0.5, 2)
  .modulate(noise(1), 0.1)
  .modulate(o1, 1)
  // .modulateScale(o1, () => time / 2)
  .brightness(-0.25)
  .luma(0.6)
  .sub(o0)
  .color(1,0,[2,1,0.5])
  .modulate(o0)
  .out(o0)


/*
scene 2
*/

osc(0.5,1.25)
  // .mult(shape(10,0.09)
  .rotate(1.5)
  .diff(gradient())
  // .modulate(noise())
  // .modulate(voronoi().scrollX(1, 0.0625)))
  .color([1, 0.2, 0.5],[-0.5, 1], [1,-0.75, 0.5])
   .modulateRepeatX(osc(10, [2, 1, 5], 10), 0.6)
  .modulateKaleid(noise(), 0.8)
  // .pixelate(100, 100)
  // .rotate(() => time / 2)
  // .hue(0.2, 0.5)
  // .diff(o1)
  .mult(voronoi(10))
  .pixelate(100, 50)
  .modulate(o0, 0.75)
  // .thresh(0.2)
  // .rotate(() => time /5)
  // .scale(() => Math.sin(time / 2 + 0.5) *0.5 )
  .out(o0)

/*
scene 3
*/

bpm = 130
speed = 1
speed = 0.5
speed = 0.1

osc(20, 2,1)
.scale(0.5, () => Math.sin(time))
.color(1, () => a.fft[0] * 10, [1,0.10, 0.45, 0.76])
.repeat(1, 2)
.modulateScale(noise(50, 0.1, 0.2), 0.2)
.modulateRotate(voronoi(10, 0.5, 1), 0.6)
.rotate(() => time * 1)
.pixelate(25, [5, 50, 100])
.color([1, 0.2, 0.5],[-0.5, 1], [1,-0.75, 0.5])
.scale([0.5, 0.75, 1.5, 1.25, 1, 0.75])
.modulate(o0)
// .scale(() => a.fft[0] * 2)
.out(o0)

voronoi(5, 10, 3)
.modulate(osc(2, 2, 1), 1)
.modulateRotate(o0 , 1)
.rotate(() => time * 0.5)
.out(o0)

/*
scene 3
*/
noise(6,.25)
.modulateRepeatY(shape(100, 10, ()=>Math.sin(time)), 20)
.mult(
    noise(15,.04).brightness(.2).contrast(1.3)
    .mult( osc(9,0, ()=>Math.sin(time/5)+13 ) )
    .rotate( ()=>time/33 )
)
.mult(
    noise(9,.03).brightness(1.2).contrast(2)
    .mult( osc(9,0, ()=>Math.sin(time/3)+13 ) )
)
.scale( ()=>Math.sin(time /10 ) )
.modulateScale(
    osc(20, () => a.fft[0], 5).mult( osc(3,0,0).rotate(3.14/2) ).scale(0.5).scale(.39).scale(1,.6,1).invert()
 	,3
)
.rotate( ()=>time/22 )
// .mult(o1)
.color(10, 0, 1)
.out(o0)

/*
scene 4
*/
// Wiggle
s0.initVideo("https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.mp4")

//Fairy
s0.initVideo("https://media.giphy.com/media/qiUd76TpepjZS/giphy.mp4")
s0.initVideo("https://media.giphy.com/media/v467lTy81ixwY/giphy.mp4")
s0.initVideo("https://media.giphy.com/media/QHwf11y2ZfFSM/giphy.mp4")

src(osc(10, 2, 10))
  .scale(1)
  .diff(osc(5, 0.4, 0.5))
  .modulate(o0, [0,0.2,0.4])
  // .diff(osc(10).rotate(() => time/2), 1)
  .luma(0.8)
  .modulate(o0, [0.5, 0.2, 0.5, 0.7])
  .modulateRotate(o1, 0.5)
  .luma(0.7)
  .color(0.8, 0.4, 0.5)
  .add(gradient(10))
  .out(o0)

/*
scene 5
*/

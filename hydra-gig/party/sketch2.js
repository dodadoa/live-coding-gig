bpm = 90
speed = 1

hush()

osc(3, 0.5, 2)
  .modulateRotate(o0, 1)
  .sub(shape(1).scale(10), () => a.fft[0] * 0.5)
  .luma(0.3)
  .modulateRotate(osc(3, 0.1, 5), 1)
  .modulate(o0, 1)
  .diff(o1)
  .sub(
    gradient(1)
      .scale(() => Math.sin(time) * 0.5 + 1.5)
      .rotate(() => time / 2)
  )
  // .pixelate([1, 2, 10, 100], 500)
  .color([10, 0, 0, 5],0, [0, 6.5, 3, 0])
  .luma(0.6)
  .out(o0)

osc(5, 3, 1)
  .modulate(noise(1), 0.1)
  .modulate(o0, 1)
  .modulateScale(o1, () => time / 2)
  .brightness(0.8)
  .diff(o0)
  .out(o1)


/*
scene 2
*/

osc(0.5,1.25).mult(shape(10,0.09).rotate(1.5))
  .diff(gradient())
  .modulate(noise().scrollY(1,0.0625))
  .color(1,-0.5,-0.75)
  .pixelate(100, 5)
  .rotate(() => time / 2)
  .hue(0.2, 0.5)
  .mult(osc(10))
  // .modulate(o0, 0.5)
  .out(o0)

/*
scene 3
*/

osc(5,0.4,10)
.scale(0.5, Math.sin(time))
.color(0.5, () => a.fft[0] * 10, [1,0.10].smooth())
.repeat(1, 2)
.modulateScale(osc(50, 0.1, 0.2), 0.2)
.modulateRotate(osc(10, 0.5, 1), 0.6)
.rotate(() => time * 1)
.modulate(o1)
.out(o0)

voronoi(10, 1, 0.1)
.modulate(noise(2, 2), 1)
.modulateRotate(o0 , 1)
.rotate(() => time * 0.5)
.out(o1)

/*
scene 3
*/
noise(6,.05)
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
.scale( ()=>Math.sin(time/6.2) )
.modulateScale(
    osc(20, () => a.fft[0], 5).mult( osc(3,0,0).rotate(3.14/2) ).scale(0.5).scale(.39).scale(1,.6,1).invert()
 	,3
)
.rotate( ()=>time/22 )
.color(20, 0, 1)
.out()

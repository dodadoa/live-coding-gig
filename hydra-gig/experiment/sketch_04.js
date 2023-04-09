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

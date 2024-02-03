
await loadScript("https://unpkg.com/hydra-p5")

p5src(s0)
  .setup((p) => {
  })
  .draw((p) => {
    p.clear()
    p.circle(p.mouseX, p.mouseY, Math.sin(time) * 250 + 100)
    p.rotate(time)
  })
  .modulate(osc(10), 0.5)
  .out(o1)

p5src(s1)
  .setup((p) => {
  	p.textSize(width / 10);
  	p.textAlign(CENTER, CENTER);
  })
  .draw((p) => {
	p.text('Synap', p.mouseX, p.mouseY);
    p.fill(200, 200, 200);
  })
  .out(o2)



osc(0.5,1.25).mult(shape(10,0.09).rotate(1.5))
  .diff(gradient())
  .modulate(noise()
  .modulate(noise().scrollY(1,0.0625)))
  .color(1,-0.5,-0.75)
   .modulateRotate(osc(10, 2, 10), 0.6)
  .modulateScale(noise(), 0.8)
  .pixelate(100, 5)
  .rotate(() => time / 2)
  .hue(0.2, 0.5)
  .mult(osc(10))
  .modulate(o0, 0.5)
  .out(o0)

osc(100,0.15)
  	.modulateScale(noise(10, 0.1).scale(Math.sin(time)),.5)
  	.thresh(0.6)
	.modulateRotate(voronoi(7, 10),.4)
  .modulateRepeat(osc(20), 0.2)
  .thresh(0.6)
  .diff(osc(13, 4), 0.3)
  .scale(3.5)
  .rotate(() => time / 2)
  .scale(() => Math.sin(time) * 5)
  .thresh(0.8)
  .out()
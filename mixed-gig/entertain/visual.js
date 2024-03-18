bpm = 130
speed = 1

hush()

src(s0)
  .modulateRotate(o0, 1)
  .sub(shape(1).scale(10), () => a.fft[0] * 0.3)
  .modulateRotate(o0, [0, 0.2, 0.3, 1])
  .luma(0.7)
  .color([5,2, 1], [0.3, 0.2,0.1], [1,4])
  .brightness([-0.2, -0.3, -0.3, -0.2].smooth())
  .modulate(o1, 1)
  // .add(o0)
  .out(o1)

osc(10, 1, 10)
  .luma(0.5)
  .rotate(() => time / 2)
  .modulateRotate(osc(20, 2))
  .scale(() => a.fft[0] * 7)
  .modulate(o0)
  .pixelate([100, 20, 1], 40)
  // .modulate(osc(10))
  // .diff(o1)
  .modulate(o0)
  .out(o0)

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
  .pixelate([3, 5, 10, 100, 1000], [5, 100])
  // .sub(o2)
  // .diff(o0)
  // .mult(o0)
  .rotate(() => time / 2)
  .scale(() => Math.sin(time/ 4))
  // .scale(1.4)
  // .pixelate([1, 2, 10, 100], 100)
  // .modulate(o0)
  // .modulate(src(s0).scale(0.5).rotate(() => time / 10), 0.5)
  // .sub(o1)
  .out(o0)

// Wiggle
s0.initVideo("https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.mp4")

// tv
s0.initVideo("https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExejZweXNraGhoMTQxaHNyYWpoZzE4eXI0dzFrMzM1NTlqOGt6MjV6diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/10DnwPMOWFxn7G/giphy.mp4")

//hacker
s0.initVideo("https://media.giphy.com/media/12W5Sg2koWYnwA/giphy.mp4")

// forest
s0.initVideo("https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHZodWE2eGxseGlkcmRqcXg3MDlibjJuZ2VkMnYyaDM2aDF0eG05ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pR7odqFEzs9B2gtYyg/giphy.mp4")

// elephant
s0.initVideo("https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXY4azE2ZWczZ3c4ejJnMjM5dGQ5Y29ka3dvdXFxejMwa3NhZGlmeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dNCZp9aaDHPi0/giphy.mp4")

src(s0)
  .out(o0)

src(s0)
  .scale(1)
  .diff(osc(5, 0.4, 0.5))
  .modulate(o0, [0,0.2,0.4])
  .diff(osc(10).rotate(() => time/2), 1)
  .luma(0.8)
  .modulate(o0, [0.5, 0.2, 0.5, 0.7])
  .modulateRotate(o1, 0.5)
  // .luma(0.7)
  .color(0.8, 0.4, 0.5)
  .out(o1)

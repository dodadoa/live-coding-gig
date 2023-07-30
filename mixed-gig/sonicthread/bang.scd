SuperDirt.start;

(
SynthDef(\spec_pad, {
	| out, sustain=1, freq=440, speed=1, begin=0, end=1, pan, accelerate, offset|
	var snd;
	var env = Env.asr(1, 0.8, 0.6).ar(Done.freeSelf, \gate.kr(1));

	snd = Saw.ar(freq * (LFNoise2.kr(3 ! 2) * 16).midiratio);
	snd = RLPF.ar(snd, LFNoise2.kr(3 ! 8).linexp(-1, 1, 100, 4000), 0.1);
	snd = Splay.ar(snd);

	snd = snd * env;

	OffsetOut.ar(out,DirtPan.ar(snd, ~dirt.numChannels, pan, env));
}).add;
)

(
SynthDef(\laser, {
	|out, freq = 440, att = 0.01, rel = 0.6, speed=1, begin=0, end=1, pan, accelerate, offset|
    var gliss = XLine.kr(freq.midiratio*100, freq.midiratio*0.01, rel);
    var snd = SinOsc.ar(gliss);
    var env = EnvGen.kr(Env.perc(att, rel), doneAction: 2);
    snd = snd * env;
	OffsetOut.ar(out,DirtPan.ar(snd, ~dirt.numChannels, pan, env));
}).add;
)

(
SynthDef(\bubble_laser, {
	|out, freq = 440, speed=1, begin=0, end=1, pan, accelerate, offset|
	var frequency = (freq/ 100).midicps ;
	var amp = 2;
	var wave = VarSaw.ar(
		frequency / 2,
		width: XLine.ar(0.2,2.0, 0.4)
	).range(0, XLine.ar(0.5,1/300, 0.4));

	var env = EnvGen.ar(Env([1, 0.5, 0.25, 0],[0.4]), doneAction: 2);
	var tone = SinOsc.ar(frequency).fold(0.7 * wave, wave) * env * amp;

	Out.ar([0,1], tone);OffsetOut.ar(out,DirtPan.ar(tone, ~dirt.numChannels, pan, env));
}).add;
)

~dirt.orbits[3].set(\fadeTime, 0.01);
~dirt.orbits[4].set(\fadeTime, 0.1);

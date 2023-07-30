SuperDirt.start;

Ndef(\pad).play;
Ndef(\pad).fadeTime = 10;
Ndef(\pad).free;

Ndef(\key).play;
Ndef(\key).free;
(
Ndef(\key, { |amp=0.05, cut=0.7, trigReset=0.3, lfFreq=0.2, seq|
	var a, trig, basefreq, snd, cutoffmod, rqmod;
	trig = Impulse.kr(1);
	basefreq = Demand.kr(trig, trigReset, seq) + 50;
	basefreq = basefreq.midicps;
	cutoffmod = LFNoise2.ar(cut).range(100,1500);
	rqmod = LFNoise2.ar(lfFreq).range(1,0.05);

	snd = (Pulse.ar(basefreq + 1 * SinOsc.kr(0.1.rand).range(0.99,1.010)) * amp)
	+ (Pulse.ar(basefreq + 2 * SinOsc.kr(0.1.rand).range(0.99,1.010)) * amp);

	snd = LeakDC.ar(snd);
	snd = RLPF.ar(snd, cutoffmod, rqmod);
	snd = Limiter.ar(in: snd, level: 0.8, dur:0.01);
	snd.dup;

}).add;
)
(
Ndef(\key)[999] = \xset -> Pbind(
	\time, 2,
	\dur, 4,
	\seq, Pseq([1, 1, 2, 3], inf),
	\amp, 0.03
);
)

(
Ndef(\pad, {
	arg freq, amp = 0.0;
	var snd;
	snd = Saw.ar(freq * (LFNoise2.kr(3 ! 8) * 2).midiratio);
	snd = RLPF.ar(snd, LFNoise2.kr(3 ! 8).linexp(-1, 1, 10, 8000), 0.1);
	snd = Splay.ar(snd);
	snd = snd * Env.asr(1, 1, 1).ar(Done.freeSelf, \gate.kr(1));
	snd = snd * -16.dbamp * amp;
	Out.ar(\out.kr(0), snd);
}).add;
)

(
Ndef(\pad_high, {
	arg freq, amp = 0.0;
	var snd;
	snd = Saw.ar(freq * (LFNoise2.kr(3 ! 8) * 2).midiratio);
	snd = RLPF.ar(snd, LFNoise2.kr(3 ! 8).linexp(-1, 1, 10, 8000), 0.1);
	snd = Splay.ar(snd);
	snd = snd * Env.asr(1, 1, 1).ar(Done.freeSelf, \gate.kr(1));
	snd = snd * -16.dbamp * amp;
	Out.ar(\out.kr(0), snd);
}).add;
)

Ndef(\pad).play;
Ndef(\pad).copy(\pad_high);

(
Ndef(\pad)[999] = \xset -> Pbind(
	\time, 2,
	\dur, 4,
	\freq, Pseq([0.75,0.5, 0.5, 0.5] * 10, inf),
	\amp, 0.4
);
)

Ndef(\pad_high).play;
Ndef(\pad_high).fadeTime = 10;
Ndef(\pad_high).free;

(
Ndef(\pad_high)[999] = \xset -> Pbind(
	\time, 2,
	\dur, 2,
	\freq, Pseq([0.75,0.5, 0.5, 0.5] * 800, inf),
	\amp, 1.2
);
)


a = {({SinOsc.ar(100.0.rand, 10, 0.01)}!100).sum}.play;
a.free;

b = {({SinOsc.ar(300.0.rand, 10, 0.01)}!100).sum}.play;
b.free;

c = {({SinOsc.ar(500.0.rand, 10, 0.01)}!100).sum}.play;
c.free;

d = {({SinOsc.ar(600.0.rand, 10, 0.01)}!200).sum}.play;
d.free;
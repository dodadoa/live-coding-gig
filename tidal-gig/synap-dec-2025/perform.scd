Ndef(\firework).play;
Ndef(\firework).fadeTime = 1;

(
Ndef(\firework, { |time = 1, freq = 5, env0=1, env1=0, gain=1|
	var comb, snd;
	var frequency = freq.midicps;
	var saw = VarSaw.ar(
		frequency/1.2,
		width: XLine.ar(
			MouseY.kr(0.01, 5, 1),
			2.0,
			time
		)
	).range(0,XLine.ar(0.5,1/300,time));
	var osc = SinOsc
	.ar(frequency)
	.fold(
		MouseX.kr(0.01, 2, 1)*saw,
		saw
	) * EnvGen.ar(Env([env0, env1], [time]));
	var verb = JPverb.ar(
		osc,
		\t60.kr(1,           0.05),
		\damp.kr(0,          0.05),
		\size.kr(1,          0.05),
		\earlydiff.kr(0.707, 0.05),
		\mdepth.kr(5,        0.05),
		\mfreq.kr(2,         0),
		\lowx.kr(1,          0.05),
		\midx.kr(1,          0.05),
		\highx.kr(1,         0.05),
		\lowband.kr(500,     0.05),
		\highband.kr(2000,   0.05)
	);
	snd = Mix([osc, verb]) * 0.4;
	comb = CombL.ar(snd, MouseX.kr(0.01, 10, 1), XLine.kr(0.0001, 0.01, 20), -0.2);
	snd = Mix([snd, comb]);
	snd = HPF.ar(snd, 10);
	snd = snd.tanh;
	snd = snd * gain;
	Out.ar([0,1], snd);
}).add;
)

(
Ndef(\firework)[999] = \xset -> Pbind(
	\dur, Pseq([2, 3, 5, 8] * 1, inf),
	\freq, 15,
	\gain, 1,
	\time, 5,
);
)
Ndef(\firework).free;



(
Ndef(\bb_and_laser, { |time = 1, freq = 10, env0=1, env1=0, width = 1.2, gain=1.0|
	var frequency = freq.midicps;
	var wave = VarSaw.ar(
		frequency / width,
		width: XLine.ar(0.2,2.0,time)).range(0,XLine.ar(0.5,1/300,time)
	);

	var env = EnvGen.ar(Env([env0, 0.5, 0.25, env1],[time]), doneAction: 2);
	var snd = VarSaw.ar(frequency).fold(0.7 * wave, wave) * env;
	snd = HPF.ar(snd, 10);
	snd = snd.tanh;
	snd = snd * gain;
	Out.ar([0,1], snd);
}
).add;
)
(
Ndef(\bb_and_laser)[999] = \xset -> Pbind(
	\time, Pseq([0.2, 1, 0.5, 0.2, 4], inf),
	\freq, Pseq(([1, 3, 4, 4, 1, 5, 5]), inf),
	\dur, Pseq([0.25, 0.5, 0.25, 0.5, 0.5] * 0.1, inf)
);
)

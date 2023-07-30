SuperDirt.start;
SuperDirt.stop;

MainHPF.new();

MainHPF.set(\freq, 20);

Ndef(\bubble_laser).play;
Ndef(\bubble_laser).fadeTime = 5;
Ndef(\bubble_laser).free;

Ndef(\big_bubble_laser).play;
Ndef(\big_bubble_laser).fadeTime = 5;
Ndef(\big_bubble_laser).free;

Ndef(\laser).play;
Ndef(\laser).fadeTime = 10;
Ndef(\laser).free;

(
Ndef(\bubble_laser, { |time = 0.4, freq = 10, env0=1, env1=0, width = 1.2|
	var frequency = freq.midicps;
	var wave = VarSaw.ar(
		frequency / 2,
		width: XLine.ar(0.2,2.0,time)
	).range(0, XLine.ar(0.5,1/300, time));

	var env = EnvGen.ar(Env([env0, 0.5, 0.25, env1],[time]), doneAction: 2);
	var tone = SinOsc.ar(frequency).fold(0.7 * wave, wave) * env;

	Out.ar([0,1], tone);
}).add;
)

(
Ndef(\laser, { |amp = 0.2, sinfreq = 1000, glissf = 0.001, att = 0.01, rel = 0.6, effect = 1000|
    var gliss = XLine.kr(sinfreq*effect, sinfreq*glissf, rel);
    var snd = SinOsc.ar(gliss);
    var env = EnvGen.kr(Env.perc(att, rel), doneAction: 2);
    snd = snd * env * amp;
	Out.ar([0,1], snd);
}).add;
)

(
Ndef(\big_bubble_laser,
	 { |time = 1, freq = 10, env0=1, env1=0, width = 1.2|
		var frequency = freq.midicps;
		var wave = VarSaw.ar(
			frequency / width,
			width: XLine.ar(0.2,2.0,time)).range(0,XLine.ar(0.5,1/300,time)
		);

		var env = EnvGen.ar(Env([env0, 0.5, 0.25, env1],[time]), doneAction: 2);
		var tone = VarSaw.ar(frequency).fold(0.7 * wave, wave) * env;

		Out.ar([0,1], tone);
	}
).add;
)


(
Ndef(\laser)[999] = \xset -> Pbind(
	\dur, Pseq([0.75,0.5, 0.5, 0.5] * 2, inf),
	\effect, Pfunc({rrand(100, 2000)}),
	\att, 0.5,
	\rel, 2,
	\amp, 0.08
);
)

Ndef(\laser).free;

(
Ndef(\bubble_laser)[999] = \xset -> Pbind(
	\time, Pseq([2, 4, 0.5, 0.2, 5, 5, 3].scramble, inf),
	\freq, Pseq(([10, 5, 12, 20, 1, 8, 5]), inf),
	\dur, Pseq([0.25, 0.5, 0.25, 0.5, 0.5]*0.1, inf)
);
)

Ndef(\bubble_laser).free;

(
Ndef(\big_bubble_laser)[999] = \xset -> Pbind(
	\time, Pseq([0.2, 1, 0.5, 0.2, 4], inf),
	\freq, Pseq(([1, 3, 4, 4, 1, 5, 5]), inf),
	\dur, Pseq([0.25, 0.5, 0.25, 0.5, 0.5] * 0.1, inf)
);
)

Ndef(\big_bubble_laser).free;

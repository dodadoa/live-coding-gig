//////////////////////
//    laser         //
//////////////////////

Ndef(\small_laser).play;
Ndef(\small_laser).fadeTime = 1;

// modified from Modanung's code
(
Ndef(\small_laser, { |time = 1, freq = 5, env0=1, env1=0|
		var frequency = freq.midicps;
		var a = VarSaw.ar(frequency/1.2, width: XLine.ar(0.2,2.0,time)).range(0,XLine.ar(0.5,1/300,time));
		var tone = SinOsc.ar(frequency).fold(0.2*a,a) * EnvGen.ar(Env([env0, env1],[time]));
		Out.ar([0,1], tone);
	}
).add;
)


(
Ndef(\small_laser)[999] = \xset -> Pbind(
	\dur, Pseq([0.75,0.75, 0.5, 0.25] * 1, inf),
	\freq, 15,
	\time, 3,
);
)
Ndef(\small_laser).free;


Ndef(\laser).play;
Ndef(\laser).fadeTime =5;
Ndef(\laser).free;

// copy/paste and modified from dcall's code
// more effect means more laser's distortation
(
Ndef(\laser, { |amp = 0.5, sinfreq = 1000, glissf = 0.001, att = 0.01, rel = 0.9, effect = 1|
    var gliss = XLine.kr(sinfreq*effect, sinfreq*glissf, rel);
    var snd = SinOsc.ar(gliss);
    var env = EnvGen.kr(Env.perc(att, rel), doneAction: 2);
    snd = snd * env * amp;
	Out.ar([0,1], snd);
}).add;
)

(
Ndef(\laser)[999] = \xset -> Pbind(
	\dur, Pseq([0.75,0.5]*0.5, inf),
	\effect, 100,
	\att, 0.9,
	\rel, 10,
	\amp, 0.005
);
)
Ndef(\laser).free;


////////////////////
//      OSC       //
////////////////////
Ndef(\osc).play;
Ndef(\osc).fadeTime = 1;
Ndef(\lfo, { LFNoise1.kr(0.5, 1000, 999) });
Ndef(\osc).map(\freq, Ndef(\lfo));
Ndef(\osc, { |freq| SinOsc.ar([600, 300] + freq, 0, SinOsc.kr(10).max(0) * 0.2) });
Ndef(\osc).free;







///////////////////
//  FADE OUT     //
///////////////////
Ndef.clear(3);

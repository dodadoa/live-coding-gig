//////////
// key  //
//////////


Ndef(\key).play;
Ndef(\key).fadeTime = 1;

// modified from Luka P.
// https://sccode.org/1-5e9
(
Ndef(\key, { |amp=0.05, cut=0.7, trigReset=0.3, lfFreq=0.2|
	var a, trig, basefreq, snd, cutoffmod, rqmod;
	a = Dseq([0, 2, 3, 2, 7, 8, 7, 10], inf);
	trig = Impulse.kr(1);
	basefreq = Demand.kr(trig, trigReset, a) + 50;
	basefreq = basefreq.midicps;
	cutoffmod = LFNoise2.ar(cut).range(100,1500);
	rqmod = LFNoise2.ar(lfFreq).range(1,0.05);

	snd = (Pulse.ar(basefreq + 1 * SinOsc.kr(0.1.rand).range(0.99,1.010)) * amp)
	+ (Pulse.ar(basefreq + 2 * SinOsc.kr(0.1.rand).range(0.99,1.010)) * amp);

	snd = LeakDC.ar(snd);
	snd = RLPF.ar(snd, cutoffmod, rqmod);
	snd = Limiter.ar(in: snd, level: 0.8, dur:0.001);
	snd.dup;

}).add;
)

Ndef(\key).xset(\cut, 1);
Ndef(\key).copy(\key1);
Ndef(\key).copy(\key2);

Ndef(\key1).play;
Ndef(\key2).play;
Ndef(\key2).xset(\amp, 0.1);
Ndef(\key1).xset(\amp, 0.01);
Ndef(\key).xset(\amp, 0.05);
Ndef(\key).xset(\trigReset, 10);
Ndef(\key2).xset(\lfFreq, 0.01);




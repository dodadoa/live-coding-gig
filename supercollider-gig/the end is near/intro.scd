(
s.options.memSize = 8192 * 16;
s.options.numBuffers = 1024 * 16;
s.options.maxNodes = 1024 * 32;
s.options.inDevice_("ASIO : JackRouter");
s.options.outDevice_("ASIO : JackRouter");
)

s.start;

MainHPF.new();

MainHPF.set(\freq, 20);

/////////
// PAD //
/////////


Ndef(\pad).play;
Ndef(\pad).fadeTime = 10;
Ndef(\pad).free;

(
Ndef(\pad, {
	arg freq, amp = 0.0;
	var snd;
	snd = Saw.ar(freq * (LFNoise2.kr(3 ! 8) * 2).midiratio);
	snd = RLPF.ar(snd, LFNoise2.kr(3 ! 8).linexp(-1, 1, 5, 7000), 3);
	snd = Splay.ar(snd);
	snd = snd * Env.asr(1, 1, 1).ar(Done.freeSelf, \gate.kr(1));
	snd = snd * amp;
	Out.ar(\out.kr(0), snd);
}).add;
)

(
Ndef(\pad)[999] = \xset -> Pbind(
	\time, 1,
	\dur, 0.1,
	\freq, Pseq([100, 80, 70, 60, 75, 85, 220], inf),
	\amp, 0.7
);
)

Ndef(\pad).copy(\pad2);
Ndef(\pad2).free;
Ndef(\pad2).play;
Ndef(\pad2).xset(\freq, 200.midicps);
(
Ndef(\pad2)[999] = \xset -> Pbind(
	\time, Pseq([0.75,0.5, 0.5, 0.5] * 1, inf),
	\dur, Pseq([0.75,0.5, 0.5, 0.5] * 1, inf),
	\freq, Pseq([60.midicps, 53.midicps, 60.midicps], inf),
	\amp, 0.1
);
)

Ndef(\pad).copy(\pad3);
Ndef(\pad3).free;
Ndef(\pad3).play;
(
Ndef(\pad3)[999] = \xset -> Pbind(
	\time, Pseq([0.75,0.5, 0.5, 0.5] * 0.2, inf),
	\dur, Pseq([0.75,0.5, 0.5, 0.5] * 0.2, inf),
	\freq, Pseq([200.midicps, 10, 250.midicps, 220.midicps, 50], inf),
	\amp, 0.3
);
)

(
Ndef(\modpad, {
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
Ndef(\modpad).play;
Ndef(\modpad).free;
(
Ndef(\modpad)[999] = \xset -> Pbind(
	\time, Pseq([0.75,0.5, 0.5, 0.5] * 10, inf),
	\dur, Pseq([0.75,0.5, 0.5, 0.5] * 4, inf),
	\freq, Pseq([100, 50, 25, 12.5], inf),
	\amp, 1
);
)

//////////
// key  //
//////////


Ndef(\key).play;
Ndef(\key).fadeTime = 5;

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
Ndef(\key).free;

Ndef(\key).copy(\key1);
Ndef(\key).copy(\key2);

Ndef(\key1).play;
Ndef(\key2).play;
Ndef(\key2).xset(\amp, 1);
Ndef(\key1).xset(\amp, 0.01);
Ndef(\key).xset(\amp, 0.05);
Ndef(\key).xset(\trigReset, 10);
Ndef(\key2).xset(\lfFreq, 0.01);

///////////
///////////
///////////

Ndef(\osc3_key).play;
Ndef(\osc3_key).fadeTime = 10;
Ndef(\osc3_key).free;

(
Ndef(\osc3_key,{| gate=1 vel=0.7 |

	var f,ff0,ff1,ff2,a,b,c,d,e, modInd,t, aa;
	var osc,signal;

	f = \freq.kr(100);
	f = f.clip(20,900);

	e = EnvGen.kr(Env.perc(
		Rand(0.8,1.2)* \att.kr(0.015),
		\rel.kr(4.02),
		curve: \curve.kr(-4)
	),
		gate: gate,
		doneAction:2
	) * vel;

	e = e * LFNoise2.ar(1!2).range( 0.1, 1 ).lag(0.01);

	ff0= f * \f0ratio.kr(2)
	+ { Rand(-3,3) }.dup
	;
	ff1= f * \f1ratio.kr(2)
	+ { Rand(-3,3) }.dup
	;
	ff2= f * \f2ratio.kr(4)
	+ { Rand(-3,3) }.dup
	;


	b = SinOsc.ar(ff0) * f * \modInd0.kr(1) * e.pow(0.8);
	c = SinOsc.ar(ff1) * f * \modInd1.kr(0.6) * e.pow(1.4);
	d = SinOsc.ar(ff2) * f * \modInd2.kr(0.3) * e.pow(2.5);
	a = SinOsc.ar(
		f
		+ LFTri.ar(e.pow(0.5) * LFNoise1.kr(0.3).range(1,5), Rand(0.0,2pi), mul: e.pow(0.2) *  f * 0.005)
		+ [b,c,d].sum
		+ WhiteNoise.ar(f/8!2).lag(0.001)
	);

	a = HPF.ar(a*e.pow(0.5), f);
	a = MidEQ.ar(a, f*\midEQratio.kr(5), rq:e.pow(0.5)* \rq.kr(3.5) + 0.1, db: \boostAtten.kr(-32));



	osc = a * \pgain.kr(0.1);
	osc = OnePole.ar(osc, \onepole.kr(0.8));
	Out.ar(0,osc);

}).add
)


(
Ndef(\osc3_key)[999] = \xset -> Pbind(
	\dur, Pseq([1, 1, rrand(0.5, 1), 2].scramble, inf ),
	\legato, Pfunc({rrand(0.5,1)}),
	\degree, Pseq([0,2,5,6,8,11].scramble, inf),
	\octave, Pstutter(2, Pseq([1,2,5], inf) ),
	\vel, Pstutter(6, Pseq([ 0.2, 1, 1.2 ].scramble, inf)),
	\f0ratio, Pseq( (1..5).scramble, inf ),
	\f1ratio, Pseq( (1..3).scramble, inf ),
	\f2ratio, Pseq( (3..5) / (1..3).scramble, inf ),
	\modInd0, Pfunc{rrand(0,2.0)},
	\modInd1, Pfunc{rrand(0,1.0)},
	\modInd2, Pfunc{rrand(0,0.5)},
)
)

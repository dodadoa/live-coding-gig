(
s.options.memSize = 65536 * 4;
s.options.numBuffers = 1024 * 16;
s.options.maxNodes = 1024 * 32;
)


(
s.waitForBoot {
    ~dirt = SuperDirt(2, s);
    ~dirt.start(57120, 0 ! 14);

	load("C:\\Users\\maddo\\AppData\\Local\\SuperCollider\\synthdefs\\mi-ugens.scd");
	~dirt.loadSoundFiles("C:\\Users\\maddo\\AppData\\Local\\SuperCollider\\downloaded-quarks\\Dirt-Samples\\*");
	~dirt.loadSoundFiles("C:\\Users\\maddo\\AppData\\Local\\SuperCollider\\samples\\*");
}
)

(
~dirt.orbits.do { |x|

	var clouds = GlobalDirtEffect(
		\global_mi_clouds,
		[
			\cloudspitch,
			\cloudspos,
			\cloudssize,
			\cloudsdens,
			\cloudstex,
			\cloudswet,
			\cloudsgain,
			\cloudsspread,
			\cloudsrvb,
			\cloudsfb,
			\cloudsfreeze,
			\cloudsmode,
			\cloudslofi,
			\elementspitch,
			\elementsstrength,
			\elementscontour,
			\elementsbowlevel,
			\elementsblowlevel,
			\elementsstrikelevel,
			\elementsflow,
			\elementsmallet,
			\elementsbowtimb,
			\elementsblowtimb,
			\elementsstriketimb,
			\elementsgeom,
			\elementsbright,
			\elementsdamp,
			\elementspos,
			\elementsspace,
			\elementsmodel,
			\elementseasteregg
		]
	);

	var verb = GlobalDirtEffect(
		\global_mi_verb,
		[
			\verbwet,
			\verbtime,
			\verbdamp,
			\verbhp,
			\verbfreeze,
			\verbdiff,
			\verbgain
	    ]
	);

	x.globalEffects = x.globalEffects.addFirst(clouds).addFirst(verb);
	x.initNodeTree;
};
)

s.boot;
s.quit;


(
SynthDef(\electronic_fly, {
	arg freq = 440, amp = 1.0;
	var snd;
	snd = Saw.ar(freq * (LFNoise2.kr(3 ! 8) * 2));
	snd = RLPF.ar(snd, LFNoise2.kr(3 ! 8).linexp(-1, 1, 10, 8000), 0.1);
	snd = snd * Env([0, 1, 0.6, 0]).ar(Done.freeSelf);
	snd = snd + PitchShift.ar(snd, 0.2, 2);
	snd = snd + PitchShift.ar(snd, 0.5, 5);
	snd = BPF.ar(snd, [400, 500, 600, 1200]);
	snd = GVerb.ar(snd, 6, 2);
	snd = snd * -14.dbamp;
	snd = snd ! 2;
	snd = snd * amp;
	Out.ar(\out.kr(0), snd);
}).add
)



(
a = Pdef(\seq_electronic_fly, {
	Pbind(
		\instrument, \electronic_fly,
		\note, Pseq([12, 10, 7, 8, 7, 9, 10], inf),
		\dur, 1,
		\gain, 1
	)
}
).play;
)

a.stop;


(
OSCdef(\eefly_osc, {
	|msg, time, addr, recvPort| (
		Synth(\electronic_fly).set(\note, msg[0])
	)
}, '/r');
)



(
SynthDef(\hinote, {
	arg freq, gain = 1;
	var snd;
	snd = SinOsc.ar([2465, 2470 + freq, 2430, 2450 + freq], 0, 1);
	snd = snd + PitchShift.ar(snd, 0.1, 0.2);
	snd = snd + PitchShift.ar(snd, 0.4, 1.4);
	snd = snd * Env.perc(0, 0.8).ar(Done.freeSelf);
	snd = snd * -14.dbamp;
	snd = HPF.ar(snd, 2500);
	snd = snd.sum;
	snd = snd * gain;
	snd = snd ! 2;
	Out.ar(\out.kr(0), snd);
}).add;
)

(
SynthDef(\bb, {
	arg freq = 440, gain = 1;
	var snd;
	snd = SinOsc.ar([freq, 300, freq + 200]);
	snd = snd * Env.perc(0, 1).ar(Done.freeSelf);
	snd = snd + PitchShift.ar(snd, 0.1, 1.1);
	snd = snd + PitchShift.ar(snd, 0.3, 1.2);
	snd = snd + PitchShift.ar(snd, 0.2, 1.3);
	snd = snd + PitchShift.ar(snd, 0.1, 2);
	snd = snd * FBSineC.ar(SampleRate.ir, 1, 1, XLine.kr(1, 2, 10), 1, 1.005, 0.7);
	snd = snd * -18.dbamp;
	snd = snd * gain;
	snd = snd.sum;
	snd = snd ! 2;
	Out.ar(\out.kr(0), snd);
}).add;
)

(
b = Pdef(\seq_bb, {
	Pbind(
		\instrument, \bb,
		\freq, Prand([600, 200, 430, 790], inf),
		\dur, Prand([0.1, 0.25, 1, 0.25, 0.5], inf),
		\gain, 1
	)
}
).play;
)

(
OSCdef(\move_osc, {
	|msg, time, addr, recvPort| (
		Synth(\hinote)
	)
}, '/move');
)

(
SynthDef(\mod_freq, {
	var snd, ctls, mods, chans, freq, freqSaw;
    freq = SinOsc.kr(1).exprange(200, 310);
	freqSaw = Saw.kr(2);
    ctls = [
        // freq, phase, amp
        [freq, 0, 1],
        [freqSaw, 0, 1],
        [LFNoise2.kr(0.5).exprange(3, 80), 0, 1],
        [LFNoise2.kr(0.5).exprange(3, 800), 0, 1],
        [LFNoise2.kr(0.5).exprange(3, 800), 0, 1],
        [LFNoise2.kr(0.5).exprange(0.3, 10), 0, 1]
    ];
    mods = [
        { LFNoise1.kr(0.5).max(0) } ! 6 * MouseX.kr(0, 3),
        { LFNoise1.kr(0.5).max(0) } ! 6 * MouseY.kr(0, 3),
        { LFNoise1.kr(0.5).max(0) } ! 6 * MouseY.kr(0, 3),
        { LFNoise1.kr(0.5).max(0) } ! 6 * MouseX.kr(0, 3),
        { LFNoise1.kr(0.5).max(0) } ! 6 * MouseY.kr(0, 3),
        { freq } ! 6 * MouseY.kr(0, 3)
    ];
    chans = FM7.ar(ctls, mods).slice([0, 1]);
	snd = MiVerb.ar(chans, 0.8, 0.7, 0.3, freeze: TRand.kr(-1, 1, Dust.kr(0.6)));
	snd = snd * -10.dbamp;
	Out.ar(\out.kr(0), snd);
}).add;
)

c = Synth(\mod_freq);

(
SynthDef(\percussion, {
	arg freq = 100;
	var snd, noise;
	snd = SinOsc.ar(XLine.kr(freq, freq - 20, 0.2));
	noise = WhiteNoise.ar() * -5.dbamp * EnvGen.ar(Env.perc(0, 0.005));
	snd = snd + GVerb.ar(noise, 2.5, 4) + noise;
	snd = snd + PitchShift.ar(snd, 0.1, 1.5);
	snd = snd + PitchShift.ar(snd, 0.15, 2.4);
	snd = snd * SinOsc.ar(XLine.kr(freq, ExpRand(freq, freq * 10), ExpRand(0.01, 0.2)));
	snd = snd * EnvGen.ar(Env.perc(0, 0.25), doneAction: Done.freeSelf);
	snd = snd * -10.dbamp;
	snd = snd ! 2;
	Out.ar(\out.kr(0), snd);
}).add;
)

(
Pdef(\seq_perc, {
	Pbind(
		\instrument, \percussion,
		\freq, Pseq([100, 120, 180, 210], inf),
		// \dur, Prand([0.25, 0.15, 0.5, 0.35, 0.1, 0.25, 0.2], inf),
		\dur, 0.1,
		\gain, 1
	)
}
).play;
)

Synth(\percussion);

p.play;
// Copy this for rand snippet
// \dur, Prand([1, 0.5, 0.25, 0.2, 0.15, 0.1, 0.05, 0.01], inf),

(
Pdef(\seq_hinote, {
	Pbind(
		\instrument, \hinote,
		\freq, Pseq([600, 200, 430, 790], inf),
		\dur, 1,
		\gain, 0.9
	)
}
).play;
)

Pdef.clear;
// 127.0.0.1:57110
(
OSCdef(\move_osc, {
	|msg, time, addr, recvPort| (
		Synth(\hinote)
	)
}, '/move');
)

(
Synth(\hinote)
)

(
SynthDef(\glitch, {
	arg freq, gain = 1;
	var snd;
	snd = SinOsc.ar(freq, 0, 1);
	snd = snd * Env.perc(0, 0.6).ar(Done.freeSelf);
	// snd = GVerb.ar(snd, 12, 2, 0, spread: 5, drylevel: 0.2);
	snd = snd * -20.dbamp;
	snd = snd * gain;

	snd = snd ! 2;
	Out.ar(\out.kr(0), snd);
}).add;
)


(
Synth(\glitch);
)


(
SynthDef(\melody, {
	arg freq, companderClampTime, companderRelaxTime, gain = 1;
	var snd, env;
	snd = SinOsc.ar([200, 150.rand + 150, freq + 130, freq + 100]);
	snd = snd + PitchShift.ar(snd, 0.1, 1.5);
	snd = snd + PitchShift.ar(snd, 0.2, 2);
	env =  Env([0.0, 0.5, 0.0, 1.0, 0.9, 0.0], [0.05, 0.1, 0.01, 1.0, 1.5], -4);
	snd = snd * EnvGen.ar(env, doneAction: Done.freeSelf);
	snd = GVerb.ar(snd, 15);
	snd = snd.sum;
	snd = snd ! 2;
	snd = snd * -31.dbamp;
	snd = snd * gain;
	Compander.ar(snd, snd,
        thresh: 0.2,
        slopeBelow: 10,
        slopeAbove: 1,
        clampTime: companderClampTime,
        relaxTime: companderRelaxTime
    );
	Out.ar(\out.kr(0), snd);
}).add;
)

(
Synth(\melody)
)

(
Pdef(\seq_melody, {
	Pbind(
		\instrument, \melody,
		\note, Prand([15, 14, 7, 5, 7, 5, 10, 2], inf),
		\companderRelaxTime, Prand([0.01, 1, 0.5, 0.1], inf),
		\compaanderClampTime, Prand([0.01, 1, 0.5, 0.1].reverse(), inf),
		\dur, Prand([0.2, 2, 1, 0.5, 0.1], inf),
		\gain, 0.5
	)
}
).play;
)

(
Pdef(\seq_melody).pause;
)

Pdef.clear;




(
Pdef.clear;
)

(
Pdef(\seq_glitch, {
	Pbind(
		\instrument, \glitch,
		\freq, Pseq([14000, 13500, 11000, 12000, 5000, 3000, 10000], inf),
		\dur, Prand([2, 1, 0.5, 0.25, 0.01, 0.1, 0.05], inf),
		\gain, 1
	)
}
).play;
)


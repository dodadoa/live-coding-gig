(
s.options.memSize = 65536 * 4;
s.options.numBuffers = 1024 * 16;
s.options.maxNodes = 1024 * 32;
// s.options.inDevice_("ASIO : JackRouter");
// s.options.outDevice_("ASIO : JackRouter");
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

s.quit;


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


(
n = NetAddr.new("127.0.0.1", 5008);
)
n.sendMsg(\hello, 1);

OSCdef.freeAll;

t = TempoClock.new(90/60).permanent_(true);
t.tempo;
t.beatDur;


(
// Recompile the class library by restarting SCIDE or Cmd/Ctrl + Shift + L
s.waitForBoot({
    FluidDataSet.version;
})
)


s.boot;
s.quit;

MainHPF.new();

MainHPF.set(\freq, 20);

////////////
// Rhythm //
////////////


Ndef(\bass).play;
Ndef(\bass).free;

(
Ndef(\bass, {
	arg freq, amp = 1.0;
	var noise, out, bass, env;
	env = EnvGen.ar(Env.perc(0.02, 1), doneAction: 2);
	noise = PinkNoise.ar(1);
	noise = noise * env;
	noise = noise * amp * 0.1;

	bass = SinOsc.ar(freq);
	bass = bass * env;
	bass = bass * amp;
	out = bass + (noise * 1);
	out = JPverb.ar(out, 2, 0, 2);
	out = Splay.ar(out);

	Out.ar(\out.kr(0), out);
}).add;
)
Ndef(\bass).clock_(t);

(
Ndef(\bass)[999] = \xset -> Pbind(
	\time, 1,
	\dur, 0.5,
	\freq, Pseq([70, 90, 80, 75], inf),
	\amp, 1,
/*	\tbeat, Pfunc({thisThread.clock.beats}),
	\tempo, Pfunc({thisThread.clock.tempo}),*/
);
)

Ndef(\blast_bass).play;
Ndef(\blast_bass).fadeTime = 5;
Ndef(\blast_bass).free;

(
Ndef(\blast_bass,{ |time = 1, freq = 10, env0 = 1.2, env1 = -0.1, width = 1.2|
	var frequency = freq.midicps;
	var wave = VarSaw.ar(
		frequency / width,
		width: XLine.ar(0.2,2.0,time)).range(0,XLine.ar(0.5,1/300,time)
	);

	var env = EnvGen.ar(Env([env0, 0.5, 0.25, env1],[time]), doneAction: 2);
	var tone = SinOscFB.ar(frequency, 2).fold(0.7 * wave, wave) * env;

	Out.ar([0,1], tone);
}).add;
)

(
Ndef(\blast_bass)[999] = \xset -> Pbind(
	\time, Pseq([0.2, 1, 0.5, 0.2, 5], inf),
	\freq, Pseq(([10, 30, 40, 45, 10, 20, 5]), inf),
	\dur, Pseq([0.25, 0.5, 0.25, 0.25, 0.25], inf)
);
)

/////////
// PAD //
/////////


Ndef(\sin).play;
Ndef(\sin).fadeTime = 10;
Ndef(\sin).free;

(
Ndef(\sin, {
	arg freq, amp = 1.0, outGate;
	var snd, env;
	snd =  SinOsc.ar(freq * (LFNoise2.kr(3000, 2000)), 0, 1);
	env = EnvGen.ar(Env.asr(0.1, 0.7, 0.1), gate: outGate);
	snd = snd * env;
	snd = Splay.ar(snd);
	snd = snd * amp * 0.1;

	SendReply.kr(outGate, '/sinosc', freq);

	Out.ar(\out.kr(0), snd);

}).add;
)

(
OSCdef(\receive_sin, {
	| msg, time, addr, recvPort |
	msg.debug("msg");
	n.sendMsg(\sin, msg[3]);
}, '/sinosc');
)

(
~sin = Ndef(\sin)[999] = \xset -> Pbind(
	\time, 1,
	\dur, 0.1,
	\outGate, Pseq([1, 0, 1, 0], inf),
	\freq, Pseq([50, 200, 30, 400], inf),
	\amp, 0.2,
);
)
~sin.clock_(t);
~sin.clock.tempo;


(
Ndef(\modpad, {
	arg freq, amp = 1.0;
	var snd;
	snd = Saw.ar(freq * (LFNoise2.kr(3 ! 8) * 2).midiratio);
	snd = RLPF.ar(snd, LFNoise2.kr(3 ! 8).linexp(-1, 1, 10, 8000), 0.1);
	snd = JPverb.ar(snd, 5, 0, 0.5);
	snd = Splay.ar(snd);
	snd = snd * amp * 0.4;
	Out.ar(\out.kr(0), snd);
}).add;
)
Ndef(\modpad).play;
Ndef(\modpad).free;

(
Ndef(\modpad)[999] = \xset -> Pbind(
	\time, 1,
	\dur, 5,
	\freq, Pseq([5, 20, 30, 40], inf),
	\amp, 0.3,
);
)

//////////
// key  //
//////////


Ndef(\key).play;
Ndef(\key).fadeTime = 5;

(
Ndef(\key, {
	arg freq, amp = 1.0;
	var osc, env, grainModCarrier, grainModFreq;
	osc = SinOsc.ar(freq, 0, 1);
	env = EnvGen.ar(Env.adsr(0.01, 0.1, 1, 1), gate: LFPulse.kr(0.6));

	osc = osc * env;
	// osc = JPverb.ar(osc, 0.5, 0, 0.8);
	grainModCarrier =  MouseY.kr(100, 200, 1);
	grainModFreq = MouseX.kr(100, 300, 1);
	osc = osc * FMGrain.ar(LFPulse.kr(20), 2, grainModCarrier, grainModFreq);

	osc = osc * amp * 0.1;
	osc = Splay.ar(osc);
	Out.ar(\out.kr(0), osc)
}).add
)

(
Ndef(\key)[999] = \xset -> Pbind(
	\time, 1,
	\dur, 5,
	\freq, Pseq([50, 200, 30, 400], inf),
	\amp, 1,
);
)

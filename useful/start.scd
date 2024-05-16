(
s.options.memSize = 8192 * 16;
s.options.numBuffers = 1024 * 16;
s.options.maxNodes = 1024 * 32;
)

(
s.waitForBoot {
    ~dirt = SuperDirt(2, s);
    ~dirt.start(57120, 0 ! 14);

	load("C:\\Users\\asus\\AppData\\Local\\SuperCollider\\synthdefs\\mi-ugens.scd");
	~dirt.loadSoundFiles("C:\\Users\\asus\\AppData\\Local\\SuperCollider\\downloaded-quarks\\Dirt-Samples\\*");
	~dirt.loadSoundFiles("C:\\Users\\asus\\AppData\\Local\\SuperCollider\\samples\\*");
}
)

//"C:\Users\asus\AppData\Local\SuperCollider\synthdefs\mi-ugens.scd.txt"

~mixer.gui;

s.quit;


(
~dirt.orbits.do { |x|
            var clouds = GlobalDirtEffect(\global_mi_clouds, [\cloudspitch, \cloudspos, \cloudssize, \cloudsdens, \cloudstex, \cloudswet, \cloudsgain, \cloudsspread, \cloudsrvb, \cloudsfb, \cloudsfreeze, \cloudsmode, \cloudslofi,
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
]);
            var verb = GlobalDirtEffect(\global_mi_verb, [\verbwet, \verbtime, \verbdamp, \verbhp, \verbfreeze, \verbdiff, \verbgain]);
            x.globalEffects = x.globalEffects
              .addFirst(clouds)
              .addFirst(verb);
            x.initNodeTree;
};
)

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

SynthDef(\bubble_laser, {
	|out, freq = 440, speed=1, begin=0, end=1, pan, accelerate, offset|
	var frequency = (freq/ 100).midicps ;
	var amp = 2;
	var wave = VarSaw.ar(
		frequency / 10,
		width: XLine.ar(0.2,2.0, 0.4)
	).range(0, XLine.ar(0.5,1/300, 0.4));

	var env = EnvGen.ar(Env([1, 0.5, 0.25, 0],[0.4]), doneAction: 2);
	var tone = SinOsc.ar(frequency).fold(0.7 * wave, wave) * env * amp;

	Out.ar([0,1], tone);OffsetOut.ar(out,DirtPan.ar(tone, ~dirt.numChannels, pan, env));
}).add;
)


(
s.options.memSize = 65536 * 4;
s.options.numBuffers = 1024 * 16;
s.options.maxNodes = 1024 * 32;
)

(
s.waitForBoot {
    "server booted".postln;
};
)

(
var lastPingTime = 0.0, minPingInterval = 0.1; // seconds between synth triggers

OSCdef(\ping57120,
    { |msg, time|
        var freq, amp, shift;
        if ((time - lastPingTime) > minPingInterval) {
            lastPingTime = time;
			freq = rrand(200.0, 700.0);
			shift = rrand(1, 8);
            Synth(\blip, [\freq, freq, \amp, 1, \ps, shift]);
        };
    },
    '/redacted-dm/trigger',
    nil,      // srcID
    57120     // recvPort
);
)


(
SynthDef(\bass, {
	arg freq = 440, amp = 1.0, ps = 1;
	var wave = VarSaw.ar(
		freq / 10,
		width: XLine.ar(0.2,2.0, 2)).range(0,XLine.ar(0.5,1/300,2)
	);
	var snd;
	snd = SinOsc.ar(freq) * Saw.ar(freq);
	snd = RLPF.ar(snd, LFNoise2.kr(3 ! 8).linexp(-1, 1, 10, 8000), 1);
	snd = snd * EnvGen.ar(Env.perc(0.01, 0.8, 1), doneAction: 2);
	snd = TwoTube.ar(snd, 0, 0.95, 200, 100)*EnvGen.ar(Env.perc(0.01, 1, 1),doneAction:2);
	snd = snd * wave * 2;
	snd = snd.tanh * -2.dbamp;
	snd = HPF.ar(snd, 100);
	snd = snd ! 2;
	snd = snd * amp;
	Out.ar(\out.kr(0), snd);
}).add
)

(
SynthDef(\blip, {
	arg freq = 440, amp = 1.0;
	var snd;
	snd = Saw.ar(freq);
	snd = RLPF.ar(snd, LFNoise2.kr(3 ! 8).linexp(-1, 1, 10, 8000), 0.1);
	snd = snd * EnvGen.ar(Env.perc(0.01, 0.75, 1), doneAction: 2);
	snd = snd + PitchShift.ar(snd, 0.2, 2);
	snd = snd + PitchShift.ar(snd, 0.5, 5);
	snd = snd.tanh;
	snd = snd * -12.dbamp;
	snd = snd ! 2;
	snd = snd * amp;
	Out.ar(\out.kr(0), snd);
}).add
)
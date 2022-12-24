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

// when the night got no sample
// it feels like we let the villain put the strap on and go(t) to the temple
// fuck trap, I’m a doomer, mother fuck, I’m a big fan, when those cry I’ll chop’ them and put on the chamber,
// I’m with that power. I’m manipulator, living in villain town
// put your clothes down, this night we’ll dance like it’s calculated
// I’m magician, so when I cast spell, u folks please listen, otherwise you won’t hear it
// u said, I’m a monkey but you folks like the leeches that I have to feed it from July to the January

// Walk out from the street, eat noodle and find job from the starfleet.
// Folk said I’m a nerd, but I think I’m the ill and the wick
// when they hear my rhyme I hope they’re cursed with the bazilik
// they will be stone, but oh oh, they’re already stoner
// oh, please skip this song and enjoy your corner, browsing on the browser
// smoke the joint on the water, when it’s over, let sleep over the ivory tower




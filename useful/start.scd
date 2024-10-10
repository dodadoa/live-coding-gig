//  ASIO : JackRouter

include("SuperDirt");

(
s.options.memSize = 8192 * 16;
s.options.numBuffers = 1024 * 16;
s.options.maxNodes = 1024 * 32;
// s.options.inDevice_("ASIO : JackRouter");
// s.options.outDevice_("ASIO : JackRouter");
)


(
s.waitForBoot {
    ~dirt = SuperDirt(2, s);
    ~dirt.start(57120, 0 ! 14);
	~dirt.loadSoundFiles("/Users/wasawat.som.adm/Library/Application Support/SuperCollider/downloaded-quarks/Dirt-Samples/*")

	// load("C:\\Users\\maddo\\AppData\\Local\\SuperCollider\\synthdefs\\mi-ugens.scd");
	// ~dirt.loadSoundFiles("C:\\Users\\maddo\\AppData\\Local\\SuperCollider\\downloaded-quarks\\Dirt-Samples\\*");
	// ~dirt.loadSoundFiles("C:\\Users\\maddo\\AppData\\Local\\SuperCollider\\samples\\*");
}
)

StageMaster.activate(numChannels: 2, compThreshold: 0.7, limiterLevel: 1.0, highEndDb: 3.0);

StageMaster.deactivate;

~mixer.gui;

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


s.quit;
s.options.memSize = 32*8192;

(
s.waitForBoot {
    ~dirt = SuperDirt(2, s); // two output channels
	 // <!--T:20-->
	~dirt.loadSoundFiles("C:\\Users\\asus\\AppData\\Local\\SuperCollider\\downloaded-quarks\\Dirt-Samples\\*");
    ~dirt.loadSoundFiles("C:\\Users\\asus\\AppData\\Local\\SuperCollider\\samples\\*"); // specify sample folder to load
	// <!--T:21-->
    s.sync; // wait for supercollider to finish booting up
    ~dirt.start(57120, 0 ! 12); // start superdirt, listening on port 57120, create twelve orbits each sending audio to channel 0
};
);

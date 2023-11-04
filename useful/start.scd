SuperDirt.start;
s.quit;
s.options.memSize = 32*8192;

//"C:\Users\asus\AppData\Local\SuperCollider\synthdefs\mi-ugens.scd.txt"
load("C:\\Users\\asus\\AppData\\Local\\SuperCollider\\synthdefs\\mi-ugens.scd");

~dirt.loadSoundFiles("C:\\Users\\asus\\AppData\\Local\\SuperCollider\\downloaded-quarks\\Dirt-Samples\\*");

~dirt.loadSoundFiles("C:\\Users\\asus\\AppData\\Local\\SuperCollider\\samples\\*");

(
~dirt.orbits.do { |x|
            var clouds = GlobalDirtEffect(\global_mi_clouds, [\cloudspitch, \cloudspos, \cloudssize, \cloudsdens, \cloudstex, \cloudswet, \cloudsgain, \cloudsspread, \cloudsrvb, \cloudsfb, \cloudsfreeze, \cloudsmode, \cloudslofi]);
            var verb = GlobalDirtEffect(\global_mi_verb, [\verbwet, \verbtime, \verbdamp, \verbhp, \verbfreeze, \verbdiff, \verbgain]);
            x.globalEffects = x.globalEffects
              .addFirst(clouds)
              .addFirst(verb);
            x.initNodeTree;
};
)

Platform.userExtensionDir;
Platform.systemExtensionDir;

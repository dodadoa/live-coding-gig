// the folder containing the cop
// ~folder = FluidFilesPath();
~folder = "C:\\Users\\maddo\\AppData\\Local\\SuperCollider\\fluidforplay\\";

// load into a buffer
~loader = FluidLoadFolder(~folder).play(s,{"done loading folder".postln;});

// sum to mono (if not mono)
(
if(~loader.buffer.numChannels > 1){
	~src = Buffer(s);
	~loader.buffer.numChannels.do{
		arg chan_i;
		FluidBufCompose.processBlocking(s,
			~loader.buffer,
			startChan:chan_i,
			numChans:1,
			gain:~loader.buffer.numChannels.reciprocal,
			destination:~src,
			destGain:1,
			action:{"copied channel: %".format(chan_i).postln}
		);
	};
}{
	"loader buffer is already mono".postln;
	~src = ~loader.buffer;
};
)

// slice the buffer in non real-time
(
~indices = Buffer(s);
FluidBufOnsetSlice.processBlocking(s,~src,metric:9,threshold:0.05,indices:~indices,action:{
	"found % slice points".format(~indices.numFrames).postln;
	"average duration per slice: %".format(~src.duration / (~indices.numFrames+1)).postln;
});
)

// analysis
(
~analyses = FluidDataSet(s);
~indices.loadToFloatArray(action:{
	arg fa;
	var mfccs = Buffer(s);
	var stats = Buffer(s);
	var flat = Buffer(s);

	fa.doAdjacentPairs{
		arg start, end, i;
		var num = end - start;

		FluidBufMFCC.processBlocking(s,~src,start,num,features:mfccs,numCoeffs:13,startCoeff:1);
		FluidBufStats.processBlocking(s,mfccs,stats:stats,select:[\mean]);
		FluidBufFlatten.processBlocking(s,stats,destination:flat);

		~analyses.addPoint(i,flat);

		"analyzing slice % / %".format(i+1,fa.size-1).postln;

		if((i%100) == 99){s.sync;}
	};

	s.sync;

	~analyses.print;
});
)

(
~umapped = FluidDataSet(s);
FluidUMAP(s,numNeighbours:15,minDist:0.9).fitTransform(~analyses,~umapped,action:{"umap done".postln});
)


// normalize
(
~normed = FluidDataSet(s);
FluidNormalize(s).fitTransform(~umapped,~normed);
)


// fit a kdtree
(
~tree = FluidKDTree(s).fit(~normed);
)

// a function to play back and individual slice point
(
~play_slice = {
	arg index;
	{
		var startsamp = Index.kr(~indices,index);
		var stopsamp = Index.kr(~indices,index+1);
		var phs = Phasor.ar(0,BufRateScale.ir(~src),startsamp,stopsamp);
		var sig = BufRd.ar(1,~src,phs);
		var dursecs = (stopsamp - startsamp) / BufSampleRate.ir(~src);
		var env, out;

		dursecs = min(dursecs,1);

		env = EnvGen.kr(Env([0,1,1,0],[0.03,dursecs-0.06,0.03]),doneAction:2);
		out = sig.dup * env * 0.3;
		// JPverb.ar(out, 5, 0, 0.015);
	}.play;
};
)

// plot
(
~normed.dump({
	arg dict;
	var point = Buffer.alloc(s,2);
	var previous = nil;
	dict.postln;
	defer{
		FluidPlotter(dict:dict, mouseMoveAction:{
			arg view, x, y;
			[x,y].postln;
			point.setn(0,[x,y]);
			~tree.kNearest(point,1,{
				arg nearest;
				if(nearest != previous){
					nearest.postln;
					view.highlight_(nearest);
					~play_slice.(nearest.asInteger);
					~play_slice.(nearest.asInteger + 1);
					~play_slice.(nearest.asInteger - 1);
					previous = nearest;
				}
			});
		});
	}
});
)
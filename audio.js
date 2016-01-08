var audioCtx = new AudioContext(),
    analyser = audioCtx.createAnalyser();
    draw = new Draw('audioAnalyzer', analyser, 'rgb(200, 0, 200)');
draw.start();
navigator.getUserMedia({audio: true},
  function(stream) {
    var source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
  }, function() {debugger;}
);

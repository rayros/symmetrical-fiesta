function Draw(id, analyser, bgcolor) {
  var c = document.getElementById("audioAnalyzer");
  this.bgcolor = bgcolor;
  this.ctx = c.getContext("2d");
  this.WIDTH = c.width;
  this.HEIGHT = c.height;
  this.analyser = analyser;
  this.lenght = analyser.frequencyBinCount,
  this.data = new Uint8Array(this.lenght);
}
Draw.prototype.start = function() {
  var ctx = this.ctx,
      w = this.WIDTH,
      h = this.HEIGHT,
      lenght = this.lenght,
      sliceWidth = w * 1.0 / lenght,
      data = this.data,
      x = 0;
  requestAnimationFrame(this.start.bind(this));
  this.analyser.getByteTimeDomainData(data);
  ctx.fillStyle = this.bgcolor;
  ctx.fillRect(0, 0, w, h);
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = 'rgb(0, 0, 0)';
  ctx.beginPath();
  for(var i = 0; i < lenght; i++) {
    var v = data[i] / 128.0,
        y = v * h/2;
    if(i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    x += sliceWidth;
  }
  ctx.lineTo(w, h/2);
  ctx.stroke();
}

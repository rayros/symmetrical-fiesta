function Draw(id, analyser, bgcolor) {
  var c = document.getElementById(id);
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
      half_h = h / 2,
      lenght = this.lenght,
      sliceWidth = w * 1.0 / lenght,
      data = this.data,
      x = 0, y, index;
  requestAnimationFrame(this.start.bind(this));
  this.analyser.getByteTimeDomainData(data);
  ctx.fillStyle = this.bgcolor;
  ctx.fillRect(0, 0, w, h);
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = 'rgb(0, 0, 0)';
  ctx.beginPath();
  y = (data[0] / 128.0) * half_h;
  ctx.moveTo(x, y);
  for(index = 1; index < lenght; ++index) {
    y = (data[index] / 128.0) * half_h;
    ctx.lineTo(x, y);
    x += sliceWidth;
  }
  ctx.lineTo(w, half_h);
  ctx.stroke();
}

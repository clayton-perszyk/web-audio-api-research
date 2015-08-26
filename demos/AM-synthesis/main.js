var canvas = document.getElementById('canvas');
var canvasContext = canvas.getContext('2d');
var context = new AudioContext();
var carrier = context.createOscillator();
var modulator1 = context.createOscillator();
var modulator2 = context.createOscillator();
var gain = context.createGain();
var analyser = context.createAnalyser();
var filter = context.createBiquadFilter();



carrier.connect(filter);
filter.connect(gain);
gain.connect(analyser);
analyser.connect(context.destination);
modulator1.connect(gain.gain);
modulator2.connect(gain.gain);


carrier.start(0);
modulator1.start(0);
modulator2.start(0);

drawFreqData();

function drawFreqData() {
  var freqBinCountArray;
  var numOfBars;
  var offsetX;
  var barWidth;
  var barHeight;
  var randColorNum;

  window.requestAnimationFrame(drawFreqData);
  freqBinCountArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(freqBinCountArray);
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  numOfBars = 1000;
  for (var i = 0; i < numOfBars; i++) {
    canvasContext.fillStyle = rgbaMaker(i);
    offsetX = i * 10;
    barWidth = 4;
    barHeight = -(freqBinCountArray[i]);
    canvasContext.fillRect(offsetX, canvas.height, barWidth, barHeight);
  }
}

function  rgbaMaker(num1) {
  var nums = [];
  for (var i = 0; i < 4; i++) {
    nums.push(Math.floor(Math.random() * 255 + 1));
  }
  return "rgba(" + nums[0] + "," + nums[1] + "," + nums[2] + "," + nums[3] + ")";
}

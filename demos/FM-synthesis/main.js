var canvas = document.getElementById('canvas');
var canvasContext = canvas.getContext('2d');
var context = new AudioContext();
var carrier = context.createOscillator();
var gain = context.createGain();
var modulator = context.createOscillator();
var analyser = context.createAnalyser();
gain.gain.value = 10;

modulator.connect(gain);
gain.connect(carrier.frequency);
carrier.connect(analyser);
analyser.connect(context.destination);

drawFreqData();

modulator.start(0);
carrier.start(0);

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
  // randColorNum = Math.floor(Math.random() + 1);
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

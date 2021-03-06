var chars = {
  97: "C",
  115: "C#",
  100: "D",
  102: "D#",
  103: "E",
  104: "F",
  106: "F#",
  107: "G",
  108: "G#",
  59: "A",
  39: "A#",
  13: "B"
};
var key;
var pitches = {
  "C": 261.626,
  "C#": 277.183,
  "D": 293.665,
  "D#": 311.127,
  "E": 329.628,
  "F": 349.228,
  "F#": 369.994,
  "G": 391.995,
  "G#": 415.305,
  "A": 440.000,
  "A#": 466.164,
  "B": 493.883
};
var canvas = document.getElementById('canvas');
var canvasContext = canvas.getContext('2d');

function setFreq(pianoKey, pitches) {
  var freq;
  for (var pitch in pitches) {
    if (pitch === pianoKey) {
      freq = pitches[pitch];
    }
  }
  return freq;
}

var context = new AudioContext();
var analyser = context.createAnalyser();
var gain = context.createGain();
var osc = context.createOscillator();

osc.connect(gain);
gain.connect(analyser);
analyser.connect(context.destination);
gain.gain.value = 0;

$('body').on('keypress', function(e){
  var charCd = e.charCode;
  var pitch = chars[charCd];
  var freq = pitches[pitch];
  if (freq) {
    key = document.getElementById(pitch);
    osc.frequency.value = freq;
    gain.gain.value = 2;
    key.style.backgroundColor = "#bbb";
  }
});

$('body').on('keyup', function(e){
    gain.gain.value = 0;
    if ($(key).hasClass("white") && key.style !== "undefined") {
      key.style.backgroundColor = "#ddd";
    } else {
      key.style.backgroundColor = "black";
    }

});

setInterval(function(){
  var whites = $('.white');
  var blacks = $('.black');

  for (var i = 0; i < blacks.length; i++) {
    blacks[i].style.backgroundColor = "black";
  }

  for (var j = 0; j < whites.length; j++) {
    whites[j].style.backgroundColor = "#ddd";
  }
}, 1000);

$('button').on('click', function(e){
  e.preventDefault();

  osc.type = this.id;
});


$('#keys').on('mousedown', function(e){
  var key = e.target.id;
  var freq = setFreq(key, pitches);
  osc.frequency.value = freq;
  gain.gain.value = 2;
});

$('#keys').on('mouseup', function(e){
  var key = e.target.id;
  gain.gain.value = 0;
});

osc.start();
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
    barHeight = -((freqBinCountArray[i] + 10));
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

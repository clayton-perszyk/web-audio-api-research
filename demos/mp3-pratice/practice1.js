var context;
var sound = null;

window.addEventListener('load', init, false);
function init() {
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}

window.AudioContext = window.AudioContext || window.webkitAudioContext;
context = new AudioContext();

function wav(url){
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    console.log(context);
    context.decodeAudioData(request.response, function(buffer){
      console.log(buffer);
      sound = buffer;
    }, null);
  };
  request.send();
}

wav('sound1.mp3');

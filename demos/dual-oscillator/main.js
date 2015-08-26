var context = new AudioContext();
var oscillator1 = context.createOscillator();
var oscillator2 = context.createOscillator();
var gain = context.createGain();
var body = $('body');
var h1 = $('h1');

oscillator1.connect(gain);
oscillator2.connect(gain.gain);
oscillator2.type = "sine";
gain.connect(context.destination);

oscillator1.start(0);
oscillator2.start(0);


$('html').on('mousemove', function(e){
  var x = e.pageX;
  var y = e.pageY;
  oscillator1.frequency.value = x;
  oscillator2.frequency.value = y;
  gain.gain.value = y / 110;
  body.css("background", rgbaMaker(x));
  h1.css("color", rgbaMaker(y));
});


function  rgbaMaker(num1) {
  var nums = [];
  for (var i = 0; i < 4; i++) {
    nums.push(Math.floor(Math.random() * 255 + 1));
  }
  return "rgba(" + nums[0] + "," + nums[1] + "," + nums[2] + "," + nums[3] + ")";
}

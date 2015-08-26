var context = new AudioContext();
var oscillator = context.createOscillator();
var filter = context.createBiquadFilter();
oscillator.type = 'sawtooth';
filter.type = 'lowpass';
filter.frequency.value = 100;


oscillator.connect(filter);
filter.connect(context.destination);


oscillator.start(0);
// oscillator.stop(3);

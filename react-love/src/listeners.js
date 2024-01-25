import play from './utils/play.js'
import State from './State.js';
import * as Tone from 'tone';

const setTimes = (numTimes) => {
  State.loopTimes = numTimes;
}

export const toggleSynth = () => {
  let synthOption = document.getElementById('synth-option');
  if (State.synth) {
    State.synth.releaseAll();
    State.synth = null
    synthOption.style.backgroundColor = 'black'
    synthOption.style.color = 'white'
    synthOption.textContent = `Turn ToneJS On`
  } else {
    State.synth = new Tone.PolySynth();
    const gain = new Tone.Gain(State.defMaxVolume);
    const autoPanner = new Tone.AutoPanner("4n").toDestination();
    const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
    State.synth.chain(gain, autoPanner, chorus);
    synthOption.style.backgroundColor = 'white';
    synthOption.style.color = 'black';
    synthOption.textContent = `Turn ToneJS Off`;
  }
}

export const loopPlay = async () => {
  const playButton = document.getElementById('play');
  playButton.innerHTML = `Stop`;
  playButton.style.backgroundColor = "red";
  State.stopped = false;
  for (let i = 0; i < State.loopTimes; i++) {
    State.currentLoop += 1;
    await play();
    if (State.stopped) { break; }
  }
  State.currentLoop = 0;
  State.stopped = true;
  playButton.innerHTML = `Play`;
  playButton.style.backgroundColor = "green";
}
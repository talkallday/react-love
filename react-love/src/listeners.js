import play from './utils/play.js'
import State from './State.js';

const setTimes = (numTimes) => {
  State.loopTimes = numTimes;
}

export const loopPlay = async (setLoopCallback) => {
  const playButton = document.getElementById('play');
  playButton.innerHTML = `Stop`;
  playButton.style.backgroundColor = "red";
  State.stopped = false;
  for (let i = 0; i < State.loopTimes; i++) {
    setLoopCallback(i + 1);
    await play();
    if (State.stopped) { break; }
  }
  State.currentLoop = 0;
  State.stopped = true;
  playButton.innerHTML = `Play`;
  playButton.style.backgroundColor = "green";
}

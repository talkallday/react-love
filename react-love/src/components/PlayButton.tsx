import { useState } from 'react';
import * as Tone from 'tone';

import getNoteName from '../utils/getNoteName';
import playNoteKey from '../utils/playNoteKey';
import { ChordInfo, getAllNotes } from './Chord';


const getRandomNotes = (chordNotes: string[]) => {
  var notes = getAllNotes(chordNotes);
  var randomChordNotes = [];
  var keyIndices = Array(notes.length).fill().map((x,i)=>i);
  for (let i = 0; i < 4; i++) {
    var randomKeyIndex = Math.floor(Math.random() * keyIndices.length);
    var keyIndex = keyIndices[randomKeyIndex];
    var randomNote = notes[keyIndex];
    randomChordNotes.push(randomNote);
  }
  return randomChordNotes;
}


type PlayButtonProps = {
  chords: ChordInfo[],
  setLoopCallback: Function,
  playingChordCallback: Function,
  synth: Tone.PolySynth,
  disabled: boolean,
  enableCallback: Function,
  totalLoops: number
}

const PlayButton = ({
  chords,
  setLoopCallback,
  playingChordCallback,
  synth,
  disabled,
  enableCallback,
  totalLoops}: PlayButtonProps) => {
  const [playing, setPlaying] = useState(false);

  const playChord = (chord: ChordInfo, timeToPlay, loop, index) => {
    if (chord === null) {
      playingChordCallback(null);
      setPlaying(false);
      setLoopCallback(0);
      return;
    }
    playingChordCallback(index);
    setLoopCallback(loop);
    synth.triggerAttackRelease(getRandomNotes(chord.notes), 0.7, timeToPlay);
  }

  const playLoop = () => {
    setPlaying(true);
    var scheduledTime = 0;
    var addressedTime = 0;
    for (var j = 0; j < totalLoops; j++) {
      const loop = j + 1;
      chords.forEach((chord, index) => {
        scheduledTime += chord.duration;
        for (var i = 0; i < Math.floor(chord.duration / 0.7); i++) {
          while (addressedTime <= scheduledTime) {
            Tone.Transport.scheduleOnce(time => {
              playChord(chord, time, loop, index)
            }, addressedTime);
            addressedTime += 0.7;
          }
        }
      });
    }
    Tone.Transport.scheduleOnce(time => {
      playChord(null, time, 0, null)
    }, addressedTime);
  }

  const stop = () =>
  {
    Tone.Transport.stop();
    playingChordCallback(null);
    setPlaying(false);
    setLoopCallback(0);
  }

  const loopPlay = () => {
    Tone.Transport.start();
    if (!playing)
    {
      playLoop();
    } else {
      stop();
    }
  }

  return (
    <div
      style={{ backgroundColor: disabled ? "black" : playing ? "red" : "green" }}
      className="cell"
      id="play-button"
      onClick={ disabled ? () => enableCallback() : () => loopPlay() }>
      { disabled ? "Click to enable" : playing ? "Stop" : "Play" }
    </div>
  )
}

export default PlayButton;

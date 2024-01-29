import { useState } from 'react';
import * as Tone from 'tone';

import { ChordInfo, getAllNotes } from '../board/Chord';


const getRandomNotes = (chordNotes: string[]) => {
  var notes = getAllNotes(chordNotes);
  var randomChordNotes = [];
  var keyIndices = notes.map((x,i)=>i);
  for (let i = 0; i < 4; i++) {
    var randomKeyIndex = Math.floor(Math.random() * keyIndices.length);
    var keyIndex = keyIndices[randomKeyIndex];
    var randomNote = notes[keyIndex];
    randomChordNotes.push(randomNote);
  }
  return randomChordNotes;
}


type PlayProps = {
  chords: ChordInfo[] | null,
  setLoopCallback: Function,
  playingChordCallback: Function,
  synth: Tone.PolySynth | null,
  disabled: boolean,
  enableCallback: Function,
  totalLoops: number
}

const Play = ({
  chords,
  setLoopCallback,
  playingChordCallback,
  synth,
  disabled,
  enableCallback,
  totalLoops}: PlayProps) => {
  const [playing, setPlaying] = useState(false);

  const playChord = (chord: ChordInfo | null, timeToPlay: number, loop: number, index: number | null) => {
    if (chord === null) {
      playingChordCallback(null);
      setPlaying(false);
      setLoopCallback(0);
      return;
    }
    playingChordCallback(index);
    setLoopCallback(loop);
    if (synth !== null) {
      synth.triggerAttackRelease(getRandomNotes(chord.notes), '4n', timeToPlay);
    }
  }

  const playLoop = () => {
    setPlaying(true);
    var scheduledTime = 0;
    var addressedTime = 0;
    for (var j = 0; j < totalLoops; j++) {
      const loop = j + 1;
      if (chords === null) {
        return;
      } else {
        chords.forEach((chord, index) => {
          scheduledTime += chord.duration;
          for (var i = 0; i < chord.duration; i++) {
            while (addressedTime <= scheduledTime) {
              const measure = Math.floor(addressedTime / 4);
              const beat = (addressedTime) % 4;
              Tone.Transport.scheduleOnce(time => {
                playChord(chord, time, loop, index)
              }, measure + ":" + beat + ":0");
              addressedTime++;
            }
          }
        });
      }
    }
    Tone.Transport.scheduleOnce(time => {
      playChord(null, time, 0, null)
    }, addressedTime);
  }

  const stop = () =>
  {
    Tone.Transport.stop();
    if (synth !== null) {
      synth.releaseAll();
    }
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

export default Play;

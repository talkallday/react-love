import { useState } from 'react';
import * as Tone from 'tone';
import Button from '@mui/material/Button';

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
  chords: ChordInfo[],
  setLoopCallback: Function,
  setPlayingChordIndex: Function,
  synth: Tone.PolySynth | null,
  disabled: boolean,
  enablePlay: Function,
  playing: boolean,
  setPlaying: Function,
  totalLoops: number
}

const Play = ({
  chords,
  setLoopCallback,
  setPlayingChordIndex,
  synth,
  disabled,
  enablePlay,
  playing,
  setPlaying,
  totalLoops}: PlayProps) => {

  const playChord = (chord: ChordInfo | null, timeToPlay: number, loop: number, index: number | null) => {
    if (chord === null) {
      setPlayingChordIndex(null);
      setPlaying(false);
      setLoopCallback(0);
      Tone.Transport.stop();
      if (synth) {
        synth.releaseAll();
      }
      return;
    }
    setPlayingChordIndex(index);
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
            while (addressedTime < scheduledTime) {
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
    const measure = Math.floor(addressedTime / 4);
    const beat = (addressedTime) % 4;
    Tone.Transport.scheduleOnce(time => {
      playChord(null, time, 0, null)
    }, measure + ":" + beat + ":0");
  }

  const stop = () =>
  {
    Tone.Transport.stop();
    if (synth !== null) {
      synth.releaseAll();
    }
    setPlayingChordIndex(null);
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
    <Button
      sx={{
        backgroundColor: disabled ? 'blue' : playing ? 'red' : 'green',
        '&.MuiButton-root:hover': {
          backgroundColor: disabled ? 'blue' : playing ? 'red' : 'green',
        },
        color: 'white'
      }}
      className="cell"
      id="play-button"
      onClick={ disabled ? () => enablePlay() : () => loopPlay() }>
      { disabled ? "Enable Play" : playing ? "Stop" : "Play" }
    </Button>
  )
}

export default Play;

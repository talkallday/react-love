import React from 'react';
import { useState } from 'react';
import Board from './components/Board';
import BottomBar from './components/BottomBar';
import * as Tone from 'tone';
import './style.css';

const boardChords = [
  {
    "notes": ['Eb', 'G', 'Bb'], // Eb
    "duration": 2.5
  },
  {
    "notes": ['C', 'Eb', 'G', 'Bb'], // Cm7
    "duration": 2.5
  },
  {
    "notes": ['G', 'Bb', 'D'], // Gm
    "duration": 5
  },
  {
    "notes": ['F', 'Ab', 'C'], // Fm
    "duration": 5
  },
  {
    "notes": ['C', 'Eb', 'G'], // Cm
    "duration": 5
  }
];

function App() {
  const [volume, setVolume] = useState(0);
  const [synth, setSynth] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [playingChordIndex, setPlayingChordIndex] = useState(null);

  const createSynth = () => {
    const newSynth = new Tone.PolySynth().toDestination();
    const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
    const toneVolume = new Tone.Volume(0);
    newSynth.chain(chorus, toneVolume);
    newSynth.volume.value = -Infinity;
    return newSynth
  }

  const enable = async () => {
    await Tone.start();
    const newSynth = createSynth();
    setSynth(newSynth);
    setDisabled(false);
  }

  const convertRange = (value, r1, r2) => {
    if (value === 0) {
      return -Infinity;
    }
    return (((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0])) + r2[0];
  }

  const setOnVolume = (desiredVolume) => {
    console.log(desiredVolume);
    var actualVolume = convertRange(desiredVolume, [0, 10], [-20, 0]);
    setVolume(desiredVolume);
    if (synth) {
      synth.volume.value = actualVolume;
    }
  }

  const playingChord = playingChordIndex === null ? null : playingChordIndex + 1;

  return (
    <div className="app">
      <Board chords={boardChords} playingChord={playingChordIndex} />
      <BottomBar
        chords={boardChords}
        volumeCallback={setOnVolume}
        disabled={disabled}
        enableCallback={enable}
        playingChordCallback={setPlayingChordIndex}
        playingChord={playingChord}
        volume={volume}
        synth={synth}
        />
    </div>
  );
}

export default App;

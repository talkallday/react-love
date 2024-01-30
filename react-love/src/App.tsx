import React from 'react';
import { useState } from 'react';
import * as Tone from 'tone';

import Button from '@mui/material/Button';
import { FormControl } from '@mui/base/FormControl';


import './style.css';
import Board from './components/board/Board';
import { ChordInfo } from './components/board/Chord'
import Menu from './components/menu/Menu';

const lovesInNeed = [
  {
    "notes": ["Eb", "G", "Bb"],
    "duration": 4
  },
  {
    "notes": ["C", "Eb", "G", "Bb"],
    "duration": 4
  },
  {
    "notes": ["G", "Bb", "D"],
    "duration": 8
  },
  {
    "notes": ["F", "Ab", "C"],
    "duration": 8
  },
  {
    "notes": ["C", "Eb", "G"],
    "duration": 8
  }
];

const dChords = [{"notes":["D","F#","A"],"duration":4},{"notes":["A","C#","E"],"duration":4},{"notes":["B","D","F#"],"duration":4},{"notes":["C#","F#","A"],"duration":4},{"notes":["G","B","D"],"duration":4},{"notes":["D","F#","A"],"duration":4},{"notes":["C#","E","A"],"duration":8},{"notes":["D","F#","A"],"duration":4},{"notes":["A","C#","E"],"duration":4},{"notes":["B","D","F#"],"duration":4},{"notes":["C#","F#","A"],"duration":4},{"notes":["G","B","D"],"duration":4},{"notes":["D","F#","A"],"duration":4},{"notes":["C#","E","A"],"duration":8},
{"notes":["G","B","D"],"duration":4},{"notes":["A","C#","E"],"duration":4},{"notes":["D","F#","A"],"duration":8},{"notes":["G","B","D"],"duration":4},{"notes":["A","C#","E"],"duration":4},{"notes":["D","F#","A"],"duration":8},
{"notes":["G","B","D"],"duration":4},{"notes":["A","C#","E"],"duration":4},{"notes":["D","F#","A"],"duration":2},{"notes":["C","E","G"],"duration":2},{"notes":["B","D","F#"],"duration":4},{"notes":["G","D","B"],"duration":4},{"notes":["C#","E","A"],"duration":4},
{"notes":["D","F#","A"],"duration":2},{"notes":["A","C#","E"],"duration":2},{"notes":["B","D","F#"],"duration":2},{"notes":["A","C#","E"],"duration":2},{"notes":["D","F#","A"],"duration":2},{"notes":["A","C#","E"],"duration":2},{"notes":["B","D","F#"],"duration":2},{"notes":["A","C#","E"],"duration":2}]

function App() {
  const [synth, setSynth] = useState<Tone.PolySynth<Tone.Synth<Tone.SynthOptions>> | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [chords, setChords] = useState<ChordInfo[]>(lovesInNeed);
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

  const playingChord = playingChordIndex === null ? null : playingChordIndex + 1;

  return (
    <div className="app">
    {
      <>
      <Menu
        chords={chords}
        disabled={disabled}
        enableCallback={enable}
        playingChordCallback={setPlayingChordIndex}
        playingChord={playingChord}
        setChordsCallback={setChords}
        synth={synth}
        />
      <Board chords={chords} playingChord={playingChordIndex} />
      </>
    }
    </div>
  );
}

export default App;

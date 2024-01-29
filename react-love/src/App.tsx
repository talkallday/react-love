import React from 'react';
import { useState } from 'react';
import * as Tone from 'tone';

import Button from '@mui/material/Button';
import { FormControl } from '@mui/base/FormControl';
import { Input } from '@mui/base/Input';


import './style.css';
import Board from './components/board/Board';
import { ChordInfo } from './components/board/Chord'
import Menu from './components/menu/Menu';

const rChords = [
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

const boardChords = [
  {
    "notes": ['Eb', 'G', 'Bb'], // Eb
    "duration": 4
  },
  {
    "notes": ['C', 'Eb', 'G', 'Bb'], // Cm7
    "duration": 4
  },
  {
    "notes": ['G', 'Bb', 'D'], // Gm
    "duration": 8
  },
  {
    "notes": ['F', 'Ab', 'C'], // Fm
    "duration": 8
  },
  {
    "notes": ['C', 'Eb', 'G'], // Cm
    "duration": 8
  }
];

function App() {
  const [synth, setSynth] = useState<Tone.PolySynth<Tone.Synth<Tone.SynthOptions>> | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [chords, setChords] = useState<ChordInfo[] | null>(null);
  const [errors, setErrors] = useState("");
  const [isValidInput, setIsValidInput] = useState(false);
  const [playingChordIndex, setPlayingChordIndex] = useState(null);

  const createSynth = () => {
    const newSynth = new Tone.PolySynth().toDestination();
    const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
    const toneVolume = new Tone.Volume(0);
    newSynth.chain(chorus, toneVolume);
    newSynth.volume.value = -Infinity;
    return newSynth
  }

  const handleSubmitTune = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const tunes = userInput.replace(/(\r\n|\n|\r|\s)/gm, "");
      const jsonTune: ChordInfo[] = JSON.parse(tunes);
      setChords(jsonTune);
      setIsValidInput(true);
    }
    catch(error) {
      if (error instanceof Error) {
        setErrors(error.message);
      }
    }
  }

  const populateUserInput = (e: React.FormEvent<HTMLDivElement>) => {
    setUserInput((e.target as HTMLTextAreaElement).value);
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
      isValidInput
      ?
      <>
      <Menu
        chords={chords}
        disabled={disabled}
        enableCallback={enable}
        playingChordCallback={setPlayingChordIndex}
        playingChord={playingChord}
        synth={synth}
        />
      <Board chords={chords} playingChord={playingChordIndex} />
      </>
      :
      <div style={{ padding: "0px 0px 0px 200px" }}>
      <form onSubmit={(e) => handleSubmitTune(e)}>
        <div style={{ color: "white" }}>{errors}</div>
        <>
        <Button type="submit" variant="contained">Click to enter tune</Button>
        </>
        <Input
          multiline
          rows={20}
          value={chords}
          onInput={populateUserInput}
          />
      </form>
      </div>
    }
    </div>
  );
}

export default App;

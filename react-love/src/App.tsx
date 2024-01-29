import React from 'react';
import { useState } from 'react';
import * as Tone from 'tone';

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
  const [chords, setChords] = useState(null);
  const [playingChordIndex, setPlayingChordIndex] = useState(null);

  const createSynth = () => {
    const newSynth = new Tone.PolySynth().toDestination();
    const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
    const toneVolume = new Tone.Volume(0);
    newSynth.chain(chorus, toneVolume);
    newSynth.volume.value = -Infinity;
    return newSynth
  }

  const handleSubmitTune = (e) => {
    e.preventDefault();
    const tuneData = Object.fromEntries(new FormData(e.target).entries());
    const tunes = tuneData.songContent.replace(/(\r\n|\n|\r|\s)/gm, "");
    const tune = JSON.parse(tunes);
    setChords(tune);
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
      chords
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
      <>
      <form onSubmit={(e) => handleSubmitTune(e)}>
        <button type="submit">Submit your tune</button>
        <textarea
          name="songContent"
          rows={16}
          cols={120}
          />
      </form>
      </>
    }
    </div>
  );
}

export default App;

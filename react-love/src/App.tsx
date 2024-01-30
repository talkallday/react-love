import React from 'react';
import { useState } from 'react';
import * as Tone from 'tone';
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from '@mui/material/styles';
import { Box, ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/base/FormControl';

import Board from './components/board/Board';
import { ChordInfo } from './components/board/Chord'
import Menu from './components/menu/Menu';
import { convertVolume } from './utils';

const defaultChords = [
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

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "black",
          backgroundSize: "cover",
          margin: 0,
          padding: 0,
          fontFamily: "sans-serif",
          textTransform: "uppercase"
        },
        '.row': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.index': {
          border: '.1rem solid black',
          borderRadius: '.15rem',
          margin: '0.25rem',
          padding: '.25rem .125rem',
          transition: 'all .07s ease',
          width: '4rem',
          maxWidth: '4rem',
          minWidth: '4rem',
          textAlign: 'center',
          textShadow: '0 0 .5rem black',
          display: 'inline-block',
          minHeight: '3rem',
          color: 'white',
        },
        '.cell': {
          borderRadius: '.15rem',
          margin: '0.25rem',
          padding: '.25rem .125rem',
          transition: 'all .07s ease',
          width: '15rem',
          textAlign: 'center',
          textShadow: '0 0 .5rem black',
          display: 'inline-block',
          minHeight: '3rem',
          color: 'white',
        },
        '.playing': {
          transform: 'scale(1.1)',
          borderColor: '#ffc600',
          boxShadow: '0 0 .25rem #ffc600',
        }
      }
    }
  }
});

const dChords = [{"notes":["D","F#","A"],"duration":4},{"notes":["A","C#","E"],"duration":4},{"notes":["B","D","F#"],"duration":4},{"notes":["C#","F#","A"],"duration":4},{"notes":["G","B","D"],"duration":4},{"notes":["D","F#","A"],"duration":4},{"notes":["C#","E","A"],"duration":8},{"notes":["D","F#","A"],"duration":4},{"notes":["A","C#","E"],"duration":4},{"notes":["B","D","F#"],"duration":4},{"notes":["C#","F#","A"],"duration":4},{"notes":["G","B","D"],"duration":4},{"notes":["D","F#","A"],"duration":4},{"notes":["C#","E","A"],"duration":8},
{"notes":["G","B","D"],"duration":4},{"notes":["A","C#","E"],"duration":4},{"notes":["D","F#","A"],"duration":8},{"notes":["G","B","D"],"duration":4},{"notes":["A","C#","E"],"duration":4},{"notes":["D","F#","A"],"duration":8},
{"notes":["G","B","D"],"duration":4},{"notes":["A","C#","E"],"duration":4},{"notes":["D","F#","A"],"duration":2},{"notes":["C","E","G"],"duration":2},{"notes":["B","D","F#"],"duration":4},{"notes":["G","D","B"],"duration":4},{"notes":["C#","E","A"],"duration":4},
{"notes":["D","F#","A"],"duration":2},{"notes":["A","C#","E"],"duration":2},{"notes":["B","D","F#"],"duration":2},{"notes":["A","C#","E"],"duration":2},{"notes":["D","F#","A"],"duration":2},{"notes":["A","C#","E"],"duration":2},{"notes":["B","D","F#"],"duration":2},{"notes":["A","C#","E"],"duration":2}]

function App() {
  const [synth, setSynth] = useState<Tone.PolySynth<Tone.Synth<Tone.SynthOptions>> | null>(null);
  const [userSynth, setUserSynth] = useState<Tone.Synth<Tone.SynthOptions> | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [chords, setChords] = useState<ChordInfo[]>(defaultChords);
  const [volume, setVolume] = useState(3);
  const [playingChordIndex, setPlayingChordIndex] = useState(null);

  const createSynth = () => {
    const newSynth = new Tone.PolySynth().toDestination();
    const chorus = new Tone.Chorus(2, 2.5, 0.5).toDestination().start();
    const actualVolume = convertVolume(volume) - 1;
    const toneVolume = new Tone.Volume(actualVolume);
    newSynth.chain(chorus, toneVolume);
    newSynth.volume.value = actualVolume;
    return newSynth
  }

  const enablePlay = async () => {
    await Tone.start();
    const newSynth = createSynth();
    setSynth(newSynth);
    setDisabled(false);
  }

  const playingChord = playingChordIndex === null ? null : playingChordIndex + 1;

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box className="app">
    {
      <>
      <Menu
        chords={chords}
        disabled={disabled}
        enablePlay={enablePlay}
        setPlayingChordIndex={setPlayingChordIndex}
        playingChord={playingChord}
        setChords={setChords}
        volume={volume}
        setVolume={setVolume}
        synth={synth}
        userSynth={userSynth}
        />
      <Board
        chords={chords}
        volume={volume}
        userSynth={userSynth}
        setUserSynth={setUserSynth}
        playingChord={playingChordIndex}
        />
      </>
    }
    </Box>
    </ThemeProvider>
  );
}

export default App;

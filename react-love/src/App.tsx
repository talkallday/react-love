import React from 'react';
import { useState } from 'react';
import * as Tone from 'tone';
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from '@mui/material/styles';
import { Box, ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/base/FormControl';

import Examples from './songs'
import Board from './components/board/Board';
import ChordInfo from './types/ChordInfo';
import Menu from './components/menu/Menu';
import { convertVolume } from './utils/conversions';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "black",
          backgroundSize: "cover",
          fontFamily: "sans-serif",
          textTransform: "uppercase"
        },
        textarea: {
          resize: "both",
        },
        button: {
          maxHeight: '3rem',
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
          height: '3rem',
          minHeight: '2rem',
          color: 'white',
        },
        '.cell': {
          borderRadius: '.15rem',
          padding: '.25rem .125rem',
          transition: 'all .07s ease',
          width: '15rem',
          textAlign: 'center',
          display: 'inline-block',
          height: '3rem',
          minHeight: '2rem',
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

function App() {
  const [synth, setSynth] = useState<Tone.PolySynth<Tone.Synth<Tone.SynthOptions>> | null>(null);
  const [userSynth, setUserSynth] = useState<Tone.Synth<Tone.SynthOptions> | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [chords, setChords] = useState<ChordInfo[]>(Examples[0]["chords"]);
  const [volume, setVolume] = useState(3);
  const [playingChordIndex, setPlayingChordIndex] = useState(null);

  const createSynth = () => {
    const newSynth = new Tone.PolySynth(Tone.AMSynth).toDestination();

    const actualVolume = convertVolume(volume) - 5;
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
        disabled={disabled}
        chords={chords}
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
        disabled={disabled}
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

import { useState } from 'react';
import Button from '@mui/material/Button';
import * as Tone from 'tone';

import { convertVolume } from '../../utils';

type NoteProps = {
  note: string,
  volume: number,
  userSynth: Tone.Synth | null,
  setUserSynth: Function,
  isPlaying: boolean
}

const Note = ({note, volume, userSynth, setUserSynth, isPlaying}: NoteProps) => {
  const [isStruck, setIsStruck] = useState(false);

  const createUserSynth = () => {
    const newSynth = new Tone.Synth().toDestination();
    const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
    const actualVolume = convertVolume(volume);
    const toneVolume = new Tone.Volume(actualVolume);
    newSynth.chain(chorus, toneVolume);
    newSynth.volume.value = actualVolume;
    return newSynth
  }

  const playNote = () => {
    setIsStruck(true);
    var synth = userSynth;
    if (synth === null) {
      synth = createUserSynth();
      setUserSynth(synth);
    }
    synth.triggerAttack(note)
  };

  const stopNote = () => {
    if (userSynth !== null) {
      userSynth.triggerRelease();
    }
    setIsStruck(false);
  };

  return (
  <Button
    className={"cell "  + (isPlaying ? "playing" : "")}
    sx={{
      backgroundColor: isPlaying ? 'yellow' : 'blue',
      textTransform: 'none',
      margin: '0.2rem',
      minWidth: '1rem',
      '&.MuiButton-root:hover': {backgroundColor: 'orange'},
      color: isPlaying ? 'black' : 'white'
    }}
    onPointerDown={playNote}
    onPointerUp={stopNote}
    >
    {note}
  </Button>
  );
}

export default Note;

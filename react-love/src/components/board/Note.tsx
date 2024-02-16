import { useState } from 'react';
import Button from '@mui/material/Button';
import * as Tone from 'tone';

import { convertVolume } from '../../utils/conversions';

type NoteProps = {
  disabled: boolean,
  note: string,
  volume: number,
  userSynth: Tone.Synth | null,
  setUserSynth: Function,
  isPlaying: boolean
}

const Note = ({disabled, note, volume, userSynth, setUserSynth, isPlaying}: NoteProps) => {
  const [isStruck, setIsStruck] = useState(false);

  const createUserSynth = () => {
    const newSynth = new Tone.Synth().toDestination();
    const actualVolume = convertVolume(volume);
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
    synth.triggerAttackRelease(note, "8n");
  };

  const stopNote = () => {
    if (userSynth !== null) {
      userSynth.triggerRelease();
    }
    setIsStruck(false);
  };

  return (
  <Button
    disabled={disabled}
    className={"cell "  + (isPlaying ? "playing" : "")}
    sx={{
      backgroundColor: isPlaying ? 'yellow' : 'blue',
      textTransform: 'none',
      margin: '0.2rem',
      minWidth: '1rem',
      height: '3rem',
      maxHeight: '3rem',
      minHeight: '1rem',
      '&.MuiButton-root:hover': {backgroundColor: 'orange'},
      '&.MuiButton-root.Mui-disabled': {backgroundColor: 'gray'},
      color: disabled ? 'gray' : isPlaying ? 'black' : 'white'
    }}
    onPointerDown={playNote}
    onPointerUp={stopNote}
    >
    {note}
  </Button>
  );
}

export default Note;

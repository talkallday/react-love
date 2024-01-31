import { useState } from 'react';
import * as Tone from 'tone';
import Box from '@mui/system/Box';

import { convertVolume } from '../../utils/conversions';

type VolumeProps = {
  synth: Tone.PolySynth | null,
  userSynth: Tone.Synth | null,
  volume: number,
  setVolume: Function,
}

const Volume = ({synth, userSynth, volume, setVolume}: VolumeProps) => {

  const setOnVolume = (desiredVolume: number) => {
    const actualVolume = convertVolume(desiredVolume);
    setVolume(desiredVolume);
    if (synth) {
      synth.volume.value = actualVolume - 1;
    }
    if (userSynth) {
      userSynth.volume.value = actualVolume;
    }
  }

  return (
    <Box sx={{ paddingLeft: '0.5rem'}}>
      <Box style={{ color: "white", width: "3rem", fontSize: "0.7rem" }}>Vol: {volume}</Box>
      <input
        type="range"
        min={0}
        max={10}
        step={0.2}
        value={volume}
        onChange={(event) => setOnVolume(event.target.valueAsNumber)}
      />
    </Box>
  )
}

export default Volume;

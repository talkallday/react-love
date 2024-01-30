import { useState } from 'react';
import * as Tone from 'tone';
import Box from '@mui/system/Box';

type VolumeProps = {
  synth: Tone.PolySynth | null
}

const Volume = ({synth}: VolumeProps) => {
  const [volume, setVolume] = useState(0);

  const convertRange = (value: number, r1: number[], r2: number[]) => {
    if (value === 0) {
      return -Infinity;
    }
    return (((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0])) + r2[0];
  }

  const setOnVolume = (desiredVolume: number) => {
    const actualVolume = convertRange(desiredVolume, [0, 10], [-20, 0]);
    setVolume(desiredVolume);
    if (synth) {
      synth.volume.value = actualVolume;
    }
  }

  return (
    <>
    <input
      type="range"
      min={0}
      max={10}
      step={0.2}
      value={volume}
      onChange={(event) => setOnVolume(event.target.valueAsNumber)}
    />
    <p style={{ color: "white", width: "2rem" }}>Vol: {volume}</p>
    </>
  )
}

export default Volume;

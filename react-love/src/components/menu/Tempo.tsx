import { useState } from 'react';
import * as Tone from 'tone';
import Box from '@mui/system/Box';

type TempoProps = {
  synth: Tone.PolySynth | null
}

const Tempo = ({synth}: TempoProps) => {
  const [tempo, setTempo] = useState(60);

  const setOnTempo = async (desiredTempo: number) => {
    if (synth) {
      setTempo(desiredTempo);
      Tone.Transport.bpm.value = desiredTempo;
    }
  }

  return (
    <>
    <input
      type="range"
      min={40}
      max={400}
      step={10}
      value={tempo}
      onChange={async (event) => await setOnTempo(event.target.valueAsNumber)}
    />
    <p style={{ color: "white", width: "2rem" }}>BPM: {tempo}</p>
    </>
  )
}

export default Tempo;

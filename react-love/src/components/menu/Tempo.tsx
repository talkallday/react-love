import { useState } from 'react';
import * as Tone from 'tone';
import Box from '@mui/system/Box';

type TempoProps = {
  synth: Tone.PolySynth | null
}

const Tempo = ({synth}: TempoProps) => {
  const [tempo, setTempo] = useState(60);

  const setOnTempo = (desiredTempo: number) => {
    if (synth) {
      setTempo(desiredTempo);
      Tone.Transport.bpm.value = desiredTempo;
    }
  }

  return (
    <Box sx={{ paddingLeft: '0.5rem'}}>
      <Box sx={{ color: "white", width: "3rem", fontSize: "0.7rem" }}>
        BPM: {tempo}
      </Box>
      <input
        disabled={synth === null}
        type="range"
        min={40}
        max={400}
        step={10}
        value={tempo}
        onChange={(event) => setOnTempo(event.target.valueAsNumber)}
      />
    </Box>
  )
}

export default Tempo;
